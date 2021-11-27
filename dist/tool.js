/*!
 * 💡 tool.js - 💡 前端常用的工具类方法汇总。
 * git+https://github.com/hai2007/tool.js.git
 *
 * author 你好2007 < https://hai2007.gitee.io/sweethome >
 *
 * version 1.0.0
 *
 * Copyright (c) 2020-present hai2007 走一步，再走一步。
 * Released under the MIT license
 *
 * Date:Sat Nov 27 2021 13:25:15 GMT+0800 (GMT+08:00)
 */
(function () {
    'use strict';

    //当前正在运动的动画的tick函数堆栈
    var $timers = [];
    //唯一定时器的定时间隔
    var $interval = 13;
    //指定了动画时长duration默认值
    var $speeds = 400;
    //定时器ID
    var $timerId = null;

    /*!
     * 💡 - 动画轮播
     * https://github.com/hai2007/tool.js/blob/master/animation.js
     *
     * author hai2007 < https://hai2007.gitee.io/sweethome >
     *
     * Copyright (c) 2020-present hai2007 走一步，再走一步。
     * Released under the MIT license
     */

    /**
     * @param {function} doback 轮询函数，有一个形参deep，0-1，表示执行进度
     * @param {number} duration 动画时长，可选
     * @param {function} callback 动画结束回调，可选，有一个形参deep，0-1，表示执行进度
     *
     * @returns {function} 返回一个函数，调用该函数，可以提前结束动画
     */
    function animation (doback, duration, callback) {

        // 如果没有传递时间，使用内置默认值
        if (arguments.length < 2) duration = $speeds;

        var clock = {
            //把tick函数推入堆栈
            "timer": function (tick, duration, callback) {
                if (!tick) {
                    throw new Error('Tick is required!');
                }
                var id = new Date().valueOf() + "_" + (Math.random() * 1000).toFixed(0);
                $timers.push({
                    "id": id,
                    "createTime": new Date(),
                    "tick": tick,
                    "duration": duration,
                    "callback": callback
                });
                clock.start();
                return id;
            },

            //开启唯一的定时器timerId
            "start": function () {
                if (!$timerId) {
                    $timerId = setInterval(clock.tick, $interval);
                }
            },

            //被定时器调用，遍历timers堆栈
            "tick": function () {
                var createTime, flag, tick, callback, timer, duration, passTime, timers = $timers;
                $timers = [];
                $timers.length = 0;
                for (flag = 0; flag < timers.length; flag++) {
                    //初始化数据
                    timer = timers[flag];
                    createTime = timer.createTime;
                    tick = timer.tick;
                    duration = timer.duration;
                    callback = timer.callback;

                    //执行
                    passTime = (+new Date() - createTime) / duration;
                    passTime = passTime > 1 ? 1 : passTime;
                    tick(passTime);
                    if (passTime < 1 && timer.id) {
                        //动画没有结束再添加
                        $timers.push(timer);
                    } else if (callback) {
                        callback(passTime);
                    }
                }
                if ($timers.length <= 0) {
                    clock.stop();
                }
            },

            //停止定时器，重置timerId=null
            "stop": function () {
                if ($timerId) {
                    clearInterval($timerId);
                    $timerId = null;
                }
            }
        };

        var id = clock.timer(function (deep) {
            //其中deep为0-1，表示改变的程度
            doback(deep);
        }, duration, callback);

        // 返回一个函数
        // 用于在动画结束前结束动画
        return function () {
            var i;
            for (i in $timers) {
                if ($timers[i].id == id) {
                    $timers[i].id = undefined;
                    return;
                }
            }
        };

    }

    /**
     * 在(a,b,c)方向位移d
     */
    function _move (d, a, b, c) {
        c = c || 0;
        var sqrt = Math.sqrt(a * a + b * b + c * c);
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            a * d / sqrt, b * d / sqrt, c * d / sqrt, 1
        ];
    }

    /**
     * 围绕0Z轴旋转
     * 其它的旋转可以借助transform实现
     * 旋转角度单位采用弧度制
     */
    function _rotate (deg) {
        var sin = Math.sin(deg),
            cos = Math.cos(deg);
        return [
            cos, sin, 0, 0,
            -sin, cos, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }

    /**
     * 围绕圆心x、y和z分别缩放xTimes, yTimes和zTimes倍
     */
    function _scale (xTimes, yTimes, zTimes, cx, cy, cz) {
        cx = cx || 0; cy = cy || 0; cz = cz || 0;
        return [
            xTimes, 0, 0, 0,
            0, yTimes, 0, 0,
            0, 0, zTimes, 0,
            cx - cx * xTimes, cy - cy * yTimes, cz - cz * zTimes, 1
        ];
    }

    /**
     * 针对任意射线(a1,b1,c1)->(a2,b2,c2)
     * 计算出二个变换矩阵
     * 分别为：任意射线变成OZ轴变换矩阵 + OZ轴变回原来的射线的变换矩阵
     */
    function _transform (a1, b1, c1, a2, b2, c2) {

        if (typeof a1 === 'number' && typeof b1 === 'number') {

            // 如果设置二个点
            // 表示二维上围绕某个点旋转
            if (typeof c1 !== 'number') {
                c1 = 0; a2 = a1; b2 = b1; c2 = 1;
            }
            // 只设置三个点(设置不足六个点都认为只设置了三个点)
            // 表示围绕从原点出发的射线旋转
            else if (typeof a2 !== 'number' || typeof b2 !== 'number' || typeof c2 !== 'number') {
                a2 = a1; b2 = b1; c2 = c1; a1 = 0; b1 = 0; c1 = 0;
            }

            if (a1 == a2 && b1 == b2 && c1 == c2) throw new Error('It\'s not a legitimate ray!');

            var sqrt1 = Math.sqrt((a2 - a1) * (a2 - a1) + (b2 - b1) * (b2 - b1)),
                cos1 = sqrt1 != 0 ? (b2 - b1) / sqrt1 : 1,
                sin1 = sqrt1 != 0 ? (a2 - a1) / sqrt1 : 0,

                b = (a2 - a1) * sin1 + (b2 - b1) * cos1,
                c = c2 - c1,

                sqrt2 = Math.sqrt(b * b + c * c),
                cos2 = sqrt2 != 0 ? c / sqrt2 : 1,
                sin2 = sqrt2 != 0 ? b / sqrt2 : 0;

            return [

                // 任意射线变成OZ轴变换矩阵
                [
                    cos1, cos2 * sin1, sin1 * sin2, 0,
                    -sin1, cos1 * cos2, cos1 * sin2, 0,
                    0, -sin2, cos2, 0,
                    b1 * sin1 - a1 * cos1, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2, 1
                ],

                // OZ轴变回原来的射线的变换矩阵
                [
                    cos1, -sin1, 0, 0,
                    cos2 * sin1, cos2 * cos1, -sin2, 0,
                    sin1 * sin2, cos1 * sin2, cos2, 0,
                    a1, b1, c1, 1
                ]

            ];
        } else {
            throw new Error('a1 and b1 is required!');
        }
    }

    // 二个4x4矩阵相乘
    // 或矩阵和齐次坐标相乘
    var _multiply = function (matrix4, param) {
        var newParam = [];
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < param.length / 4; j++)
                newParam[j * 4 + i] =
                    matrix4[i] * param[j * 4] +
                    matrix4[i + 4] * param[j * 4 + 1] +
                    matrix4[i + 8] * param[j * 4 + 2] +
                    matrix4[i + 12] * param[j * 4 + 3];
        return newParam;
    };

    /*!
     * 💡 - 列主序存储的4x4矩阵
     * https://github.com/hai2007/tool.js/blob/master/Matrix4.js
     *
     * author hai2007 < https://hai2007.gitee.io/sweethome >
     *
     * Copyright (c) 2020-present hai2007 走一步，再走一步。
     * Released under the MIT license
     */


    function Matrix4 (initMatrix4) {

        var matrix4 = initMatrix4 || [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        var matrix4Obj = {

            // 移动
            "move": function (dis, a, b, c) {
                matrix4 = _multiply(_move(dis, a, b, c), matrix4);
                return matrix4Obj;
            },

            // 旋转
            "rotate": function (deg, a1, b1, c1, a2, b2, c2) {
                var matrix4s = _transform(a1, b1, c1, a2, b2, c2);
                matrix4 = _multiply(_multiply(_multiply(matrix4s[1], _rotate(deg)), matrix4s[0]), matrix4);
                return matrix4Obj;
            },

            // 缩放
            "scale": function (xTimes, yTimes, zTimes, cx, cy, cz) {
                matrix4 = _multiply(_scale(xTimes, yTimes, zTimes, cx, cy, cz), matrix4);
                return matrix4Obj;
            },

            // 乘法
            // 可以传入一个矩阵(matrix4,flag)
            "multiply": function (newMatrix4, flag) {
                matrix4 = flag ? _multiply(matrix4, newMatrix4) : _multiply(newMatrix4, matrix4);
                return matrix4Obj;
            },

            // 对一个坐标应用变换
            // 齐次坐标(x,y,z,w)
            "use": function (x, y, z, w) {
                // w为0表示点位于无穷远处，忽略
                z = z || 0; w = w || 1;
                var temp = _multiply(matrix4, [x, y, z, w]);
                temp[0] = +temp[0].toFixed(7);
                temp[1] = +temp[1].toFixed(7);
                temp[2] = +temp[2].toFixed(7);
                temp[3] = +temp[3].toFixed(7);
                return temp;
            },

            // 矩阵的值
            "value": function () {
                return matrix4;
            }

        };

        return matrix4Obj;

    }

    /**
     * 初始化配置文件
     *
     * @param {Json} init 默认值
     * @param {Json} data
     * @return {Json}
     */
    function initConfig (init, data) {
        for (var key in data)
            try {
                init[key] = data[key];
            } catch (e) {
                throw new Error("Illegal property value！");
            }
        return init;
    }

    /*!
     * 💡 - Hermite三次插值
     * https://github.com/hai2007/tool.js/blob/master/Hermite.js
     *
     * author hai2007 < https://hai2007.gitee.io/sweethome >
     *
     * Copyright (c) 2020-present hai2007 走一步，再走一步。
     * Released under the MIT license
     */

    function Hermite (config) {

        config = initConfig({
            // 张弛系数
            "u": 0.5
        }, config);

        var MR, a, b;

        /**
         * 根据x值返回y值
         * @param {Number} x
         */
        var hermite = function (x) {
            if (MR) {
                var sx = (x - a) / (b - a),
                    sx2 = sx * sx,
                    sx3 = sx * sx2;
                var sResult = sx3 * MR[0] + sx2 * MR[1] + sx * MR[2] + MR[3];
                return sResult * (b - a);
            } else throw new Error('You shoud first set the position!');
        };

        /**
         * 设置点的位置
         * @param {Number} x1 左边点的位置
         * @param {Number} y1
         * @param {Number} x2 右边点的位置
         * @param {Number} y2
         * @param {Number} s1 二个点的斜率
         * @param {Number} s2
         */
        hermite.setP = function (x1, y1, x2, y2, s1, s2) {
            if (x1 < x2) {
                // 记录原始尺寸
                a = x1; b = x2;
                var p3 = config.u * s1,
                    p4 = config.u * s2;
                // 缩放到[0,1]定义域
                y1 /= (x2 - x1);
                y2 /= (x2 - x1);
                // MR是提前计算好的多项式通解矩阵
                // 为了加速计算
                // 如上面说的
                // 统一在[0,1]上计算后再通过缩放和移动恢复
                // 避免了动态求解矩阵的麻烦
                MR = [
                    2 * y1 - 2 * y2 + p3 + p4,
                    3 * y2 - 3 * y1 - 2 * p3 - p4,
                    p3,
                    y1
                ];
            } else throw new Error('The point x-position should be increamented!');
            return hermite;
        };

        return hermite;
    }

    /**
     * 判断一个值是不是Object。
     *
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是Object返回true，否则返回false
     */
    function _isObject (value) {
        var type = typeof value;
        return value != null && (type === 'object' || type === 'function');
    }

    var toString = Object.prototype.toString;

    /**
     * 获取一个值的类型字符串[object type]
     *
     * @param {*} value 需要返回类型的值
     * @returns {string} 返回类型字符串
     */
    function getType (value) {
        if (value == null) {
            return value === undefined ? '[object Undefined]' : '[object Null]';
        }
        return toString.call(value);
    }

    /**
     * 判断一个值是不是Boolean。
     *
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是Boolean返回true，否则返回false
     */
    function _isBoolean (value) {
        return value === true || value === false ||
            (value !== null && typeof value === 'object' && getType(value) === '[object Boolean]');
    }

    /**
     * 判断一个值是不是number。
     *
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是number返回true，否则返回false
     */
    function _isNumber (value) {
        return typeof value === 'number' || (
            value !== null && typeof value === 'object' &&
            getType(value) === '[object Number]'
        );
    }

    /**
     * 判断一个值是不是String。
     *
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是String返回true，否则返回false
     */
    function _isString (value) {
        var type = typeof value;
        return type === 'string' || (type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]');
    }

    /**
     * 判断一个值是不是symbol。
     *
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是symbol返回true，否则返回false
     */
    function _isSymbol (value) {
        var type = typeof value;
        return type === 'symbol' || (type === 'object' && value !== null && getType(value) === '[object Symbol]');
    }

    /**
     * 判断一个值是不是Function。
     *
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是Function返回true，否则返回false
     */
    function _isFunction (value) {
        if (!_isObject(value)) {
            return false;
        }

        var type = getType(value);
        return type === '[object Function]' || type === '[object AsyncFunction]' ||
            type === '[object GeneratorFunction]' || type === '[object Proxy]';
    }

    /**
     * 判断一个值是不是一个朴素的'对象'
     * 所谓"纯粹的对象"，就是该对象是通过"{}"或"new Object"创建的
     *
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是朴素的'对象'返回true，否则返回false
     */

    function _isPlainObject (value) {
        if (value === null || typeof value !== 'object' || getType(value) != '[object Object]') {
            return false;
        }

        // 如果原型为null
        if (Object.getPrototypeOf(value) === null) {
            return true;
        }

        var proto = value;
        while (Object.getPrototypeOf(proto) !== null) {
            proto = Object.getPrototypeOf(proto);
        }
        return Object.getPrototypeOf(value) === proto;
    }

    /**
     * 判断一个值是不是错误对象。
     * `Error`, `EvalError`, `RangeError`, `ReferenceError`,`SyntaxError`, `TypeError`, or `URIError`
     *
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是错误对象返回true，否则返回false
     */
    function _isError (value) {
        if (value === null || typeof value !== 'object') {
            return false;
        }

        var type = getType(value);
        return type === '[object Error]' || type === '[object DOMException]' ||
            (typeof value.message === 'string' && typeof value.name === 'string' && !_isPlainObject(value));
    }

    /*!
     * 💡 - 获取值的类型
     * https://github.com/hai2007/tool.js/blob/master/getType.js
     *
     * author hai2007 < https://hai2007.gitee.io/sweethome >
     *
     * Copyright (c) 2020-present hai2007 走一步，再走一步。
     * Released under the MIT license
     */

    /**
     * [
     *  种类：Basic|Object
     *  类型:
     *      // 基本数据类型
     *      Undefined|Null|Boolean|Number|String|Symbol
     *
     *      // 引用类型
     *      Function|Array|Error|Plain
     *
     *      // 结点类型
     *      Element|Attribute|Text|Comment
     *
     *      // 未识别类型(这种类型请不要使用，这是为了未来扩展类型的时候使用的)
     *      *
     * ]
     */

    function getType$1 (input) {

        // 首先，判断是不是对象（朴素对象plain也是对象），具体类型设置为，未定义
        var result = [_isObject(input) ? "Object" : "Basic", "*"];

        // 基本类型
        if (input === undefined) result[1] = 'Undefined';
        else if (input === null) result[1] = 'Null';
        else if (_isBoolean(input)) result[1] = 'Boolean';
        else if (_isNumber(input)) result[1] = 'Number';
        else if (_isString(input)) result[1] = 'String';
        else if (_isSymbol(input)) result[1] = 'Symbol';

        // 引用类型
        else if (_isFunction(input)) result[1] = 'Function';
        else if (Array.isArray(input)) result[1] = 'Array'; // 一个类似数组的类型没有被统计进来
        else if (_isError(input)) result[1] = 'Error';
        else if (_isPlainObject(input)) result[1] = 'Plain';

        else {

            if (typeof input === 'object') {

                // 结点类型
                // 这首先不能是一个Plain或null，需要特别注意一下
                if (input.nodeType === 3) result[1] = 'Text'; // 文本
                else if (input.nodeType === 1 || input.nodeType === 9 || input.nodeType === 11) result[1] = 'Element'; // 结点
                else if (input.nodeType === 2) result[1] = 'Attribute'; // 属性
                else if (input.nodeType === 8) result[1] = 'Comment'; // 注释

            }

        }

        return result;
    }

    var domTypeHelp = function (types, value) {
        return value !== null && typeof value === 'object' &&
            types.indexOf(value.nodeType) > -1 &&
            !_isPlainObject(value);
    };

    /*!
     * 💡 - 值类型判断方法
     * https://github.com/hai2007/tool.js/blob/master/type.js
     *
     * author hai2007 < https://hai2007.gitee.io/sweethome >
     *
     * Copyright (c) 2020-present hai2007 走一步，再走一步。
     * Released under the MIT license
     */

    var isObject = _isObject;

    // 基本类型
    var isUndefined = function (input) { return input === undefined };
    var isNull = function (input) { return input === null };
    var isBoolean = _isBoolean;
    var isNumber = _isNumber;
    var isString = _isString;
    var isSymbol = _isSymbol;

    // 引用类型
    var isFunction = _isFunction;
    var isArray = function (input) { return Array.isArray(input) };
    var isError = _isError;
    var isPlainObject = _isPlainObject;

    // 结点类型
    var isElement = function (input) { return domTypeHelp([1, 9, 11], input) };
    var isAttribute = function (input) { return domTypeHelp([2], input) };
    var isText = function (input) { return domTypeHelp([3], input) };
    var isComment = function (input) { return domTypeHelp([8], input) };

    /*!
     * 💡 - 刻度尺刻度求解
     * https://github.com/hai2007/tool.js/blob/master/ruler.js
     *
     * author hai2007 < https://hai2007.gitee.io/sweethome >
     *
     * Copyright (c) 2021-present hai2007 走一步，再走一步。
     * Released under the MIT license
     */

    // 需要注意的是，实际的间距个数可能是 num-1 或 num 或 num+1 或 1
    function ruler (maxValue, minValue, num) {

        // 如果最大值最小值反了
        if (maxValue < minValue) {
            var temp = minValue;
            minValue = maxValue;
            maxValue = temp;
        }

        // 如果相等
        else if (maxValue == minValue) {
            return [maxValue];
        }

        // 计算最终小数点应该保留的位数
        var dotMaxNum = (maxValue + ".").split('.')[1].length;
        var dotMinNum = (minValue + ".").split('.')[1].length;
        var dotNum = dotMaxNum > dotMinNum ? dotMaxNum : dotMinNum;

        // 为了变成 -100 ~ 100 需要放大或者缩小的倍数
        var times100 =

            (function (_value) {

                // 先确定基调，是放大还是缩小
                var _times100_base = (_value < 100 && _value > -100) ? 10 : 0.1;

                // 记录当前缩放倍数
                var _times100 = 1, _tiemsValue = _value;

                while (_times100_base == 10 ?
                    // 如果是放大，超过 -100 ~ 100 就应该停止
                    (_tiemsValue >= -100 && _tiemsValue <= 100)
                    :
                    // 如果是缩小，进入 -100 ~ 100 就应该停止
                    (_tiemsValue <= -100 || _tiemsValue >= 100)
                ) {

                    _times100 *= _times100_base;
                    _tiemsValue *= _times100_base;

                }

                return _times100;
            })

                // 根据差值来缩放
                (maxValue - minValue);


        // 求解出 -100 ~ 100 的最佳间距值 后直接转换原来的倍数
        var distance = +(Math.ceil((maxValue - minValue) * times100 / num) / times100).toFixed(dotNum);

        if (distance <= 0) return [minValue, maxValue];

        // 最小值，也就是起点
        var begin = Math.floor(minValue / distance) * distance;

        var rulerArray = [], index;
        // 获取最终的刻度尺数组
        rulerArray.push(begin);
        for (index = 1; rulerArray[rulerArray.length - 1] < maxValue; index++) {
            rulerArray.push(+(begin + distance * index).toFixed(dotNum));
        }
        rulerArray[0] = +(begin).toFixed(dotNum);

        // 最后，进行校对
        var _rulerArray = [rulerArray[0]];
        for (var i = 1; i < rulerArray.length; i++) {
            if (_rulerArray[_rulerArray.length - 1] != rulerArray[i]) {
                _rulerArray.push(rulerArray[i]);
            }
        }
        return _rulerArray;
    }

    function _ReadString (express) {

        var reader = {
            index: -1,
            currentChar: null
        };

        // 读取下一个字符
        reader.readNext = function () {
            reader.currentChar = reader.index++ < express.length - 1 ? express[reader.index] : null;
            return reader.currentChar;
        };

        // 获取往后num个值
        reader.getNextN = function (num) {
            return express.substring(reader.index, num + reader.index > express.length ? express.length : num + reader.index);
        };

        return reader;
    }

    /*!
     * 💡 - 字符串操作
     * https://github.com/hai2007/tool.js/blob/master/string.js
     *
     * author hai2007 < https://hai2007.gitee.io/sweethome >
     *
     * Copyright (c) 2021-present hai2007 走一步，再走一步。
     * Released under the MIT license
     */

    // 字符串分析
    var ReadString = _ReadString;

    function _inner_CSS_shader (textString, colors) {
        var shaderArray = [];

        // 当前面对的
        var i = 0;

        // 获取往后n个值
        var nextNValue = function (n) {
            return textString.substring(i, n + i > textString.length ? textString.length : n + i);
        };

        var template = "";

        // 1:选择器 tag
        // 2:属性名 attr
        // 3:属性值 string
        var state = "tag";

        // 初始化模板，开始文本捕获
        var initTemplate = function () {
            if (template != "") {
                shaderArray.push({
                    color: {
                        tag: colors.selector,
                        attr: colors.attrKey,
                        string: colors.attrValue
                    }[state],
                    content: template
                });
            }

            template = "";
        };

        while (true) {

            /* 1.注释 */

            if (nextNValue(2) == '/*') {

                initTemplate();
                while (nextNValue(2) !== '*/' && i < textString.length) {
                    template += textString[i++];
                }

                shaderArray.push({
                    color: colors.annotation,
                    content: template + nextNValue(2)
                });
                i += 2;
                template = "";

            }

            /* 2.字符串 */

            else if (["'", '"'].indexOf(nextNValue(1)) > -1) {

                var strBorder = nextNValue(1);
                initTemplate();

                do {
                    template += textString[i++];
                } while (nextNValue(1) != strBorder && i < textString.length)

                // 因为可能是没有字符导致的结束
                if (nextNValue(1) != strBorder) {
                    strBorder = "";
                } else {
                    i += 1;
                }

                shaderArray.push({
                    color: colors.attrValue,
                    content: template + strBorder
                });
                template = "";

            }

            /* 3.边界 */

            else if ([":", '{', '}', ";"].indexOf(nextNValue(1)) > -1) {

                initTemplate();
                shaderArray.push({
                    color: colors.insign,
                    content: nextNValue(1)
                });
                template = "";

                if (nextNValue(1) == '{' || nextNValue(1) == ';') {
                    state = 'attr';
                } else if (nextNValue(1) == '}') {
                    state = 'tag';
                } else {
                    state = 'string';
                }

                i += 1;
            }

            /* 追加字符 */

            else {
                if (i >= textString.length) {
                    initTemplate();
                    break;
                } else {
                    template += textString[i++];
                }
            }

        }
        return shaderArray;
    }

    // JS关键字
    var keyWords = [
        "abstract", "arguments", "boolean", "break", "byte",
        "case", "catch", "char", "class", "const",
        "continue", "debugger", "default", "delete", "do",
        "double", "else", "enum", "eval", "export",
        "extends", "false", "final", "finally", "float",
        "for", "function", "goto", "if", "implements",
        "import", "in", "instanceof", "int", "interface",
        "let", "long", "native", "new", "null",
        "package", "private", "protected", "public", "return",
        "short", "static", "super", "switch", "synchronized",
        "this", "throw", "throws", "transient", "true",
        "try", "typeof", "var", "void", "volatile",
        "while", "with", "yield"
    ];

    function _inner_ES_shader (textString, colors) {
        var shaderArray = [];

        // 当前面对的
        var i = 0;

        // 获取往后n个值
        var nextNValue = function (n) {
            return textString.substring(i, n + i > textString.length ? textString.length : n + i);
        };

        var template = "";

        // 初始化模板，开始文本捕获
        var initTemplate = function () {
            if (template != "") {

                // 考虑开始的(
                if (template[0] == '(') {
                    shaderArray.push({
                        color: colors.insign,
                        content: "("
                    });
                    template = template.substr(1);
                }

                shaderArray.push({
                    color: colors.text,
                    content: template
                });
            }

            template = "";
        };

        while (true) {

            /* 1.注释1 */

            if (nextNValue(2) == '/*') {

                initTemplate();
                while (nextNValue(2) !== '*/' && i < textString.length) {
                    template += textString[i++];
                }

                shaderArray.push({
                    color: colors.annotation,
                    content: template + nextNValue(2)
                });
                i += 2;
                template = "";

            }

            /* 2.注释2 */

            else if (nextNValue(2) == '//') {
                initTemplate();
                while (nextNValue(1) !== '\n' && i < textString.length) {
                    template += textString[i++];
                }
                shaderArray.push({
                    color: colors.annotation,
                    content: template
                });
                template = "";
            }

            /* 3.字符串 */

            else if (["'", '"', '`'].indexOf(nextNValue(1)) > -1) {

                var strBorder = nextNValue(1);
                initTemplate();

                do {
                    template += textString[i++];
                } while (nextNValue(1) != strBorder && i < textString.length)

                // 因为可能是没有字符导致的结束
                if (nextNValue(1) != strBorder) {
                    strBorder = "";
                } else {
                    i += 1;
                }

                shaderArray.push({
                    color: colors.string,
                    content: template + strBorder
                });
                template = "";

            }


            /* 4.函数定义 */

            else if (nextNValue(1) == '(' && (template[0] == ' ' || (i - template.length - 1 >= 0 && textString[i - template.length - 1] == " "))) {
                shaderArray.push({
                    color: colors.funName,
                    content: template
                });
                i += 1;
                template = "(";

            }

            /* 5.方法调用 */

            else if (nextNValue(1) == '(') {

                shaderArray.push({
                    color: colors.execName,
                    content: template
                });
                i += 1;
                template = "(";
            }

            /* 6.边界 */

            else if ([";", '{', '}', '(', ')', '.', '\n', '=', '+', '>', '<', '[', ']', '-', '*', '/', '^', '*', '!'].indexOf(nextNValue(1)) > -1) {

                initTemplate();
                shaderArray.push({
                    color: colors.insign,
                    content: nextNValue(1)
                });
                template = "";
                i += 1;
            }

            /* 7.关键字 */

            else if (nextNValue(1) == ' ' && keyWords.indexOf(template.trim()) > -1) {

                shaderArray.push({
                    color: colors.key,
                    content: template + " "
                });
                template = "";
                i += 1;

            }

            /* 追加字符 */

            else {
                if (i >= textString.length) {
                    initTemplate();
                    break;
                } else {
                    template += textString[i++];
                }
            }

        }

        return shaderArray;
    }

    function _inner_HTML_shader (textString, colors) {

        var shaderArray = [];

        // 当前面对的
        var i = 0;

        // 获取往后n个值
        var nextNValue = function (n) {
            return textString.substring(i, n + i > textString.length ? textString.length : n + i);
        };

        var template = "";

        // 初始化模板，开始文本捕获
        var initTemplate = function () {
            if (template != "") {
                shaderArray.push({
                    color: colors.text,
                    content: template
                });
            }

            template = "";
        };

        // 匹配属性值模板
        var getAttrValueTemplate = function () {
            var endStr = " ";
            // 寻找属性值边界
            if (nextNValue(1) == '"') endStr = '"';
            if (nextNValue(1) == "'") endStr = "'";

            // 到达边界前一直寻找下一个
            do {
                template += textString[i++];
            } while (nextNValue(1) != endStr && i < textString.length);

            // 如果是匹配成功而不是匹配到末尾
            if (endStr != " " && i < textString.length) {
                template += endStr;
                i += 1;
            }

            shaderArray.push({
                color: colors.attrValue,
                content: template
            });
            template = "";
        };

        while (true) {

            /* 1.注释 */

            if (nextNValue(4) == '<!--') {

                initTemplate();
                while (nextNValue(3) !== '-->' && i < textString.length) {
                    template += textString[i++];
                }

                shaderArray.push({
                    color: colors.annotation,
                    content: template + nextNValue(3)
                });
                i += 3;
                template = "";

            }

            /* 2.</ */

            else if (nextNValue(2) == '</') {

                initTemplate();
                shaderArray.push({
                    color: colors.insign,
                    content: "</"
                });
                i += 2;

                while (nextNValue(1) !== '>' && i < textString.length) {
                    template += textString[i++];
                }

                if (template != "") {
                    shaderArray.push({
                        color: colors.node,
                        content: template
                    });
                    template = "";

                    if (i < textString.length) {
                        shaderArray.push({
                            color: colors.insign,
                            content: ">"
                        });
                        i += 1;
                    }

                }
            }

            /* 3.< */

            else if (nextNValue(1) == '<' && nextNValue(2) != '< ') {

                var specialTag = "";

                initTemplate();
                shaderArray.push({
                    color: colors.insign,
                    content: "<"
                });
                i += 1;

                // 寻找标签名称
                while (nextNValue(1) != '>' && nextNValue(1) != ' ' && i < textString.length) {
                    template += textString[i++];
                }
                if (template != '') {

                    // 针对style和script这样特殊的标签，内部需要调用对应的着色器着色
                    if (template == "style" || template == 'script') {
                        specialTag = "</" + template + ">";
                    }

                    shaderArray.push({
                        color: colors.node,
                        content: template
                    });

                    template = '';
                    if (i < textString.length) {

                        // 寻找标签属性
                        while (i < textString.length) {

                            // 遇到这个表示标签结束了
                            // 也就意味着标签匹配结束
                            if (nextNValue(1) == ">") {

                                initTemplate();
                                shaderArray.push({
                                    color: colors.insign,
                                    content: ">"
                                });
                                i += 1;
                                break;
                            }

                            // 如果是空格，表示是属性之间，接着查看下一个即可
                            else if (nextNValue(1) != ' ') {

                                initTemplate();

                                // 匹配属性名称
                                if (nextNValue(1) != '"' && nextNValue(1) != "'") {

                                    // 如果不是=或>和空格就继续
                                    while (nextNValue(1) != "=" && nextNValue(1) != '>' && i < textString.length && nextNValue(1) != " ") {
                                        template += textString[i++];
                                    }
                                    if (template != "") {
                                        shaderArray.push({
                                            color: colors.attrKey,
                                            content: template
                                        });
                                        template = "";

                                        // 如果下一个是=，就接着找属性值
                                        if (nextNValue(1) == '=') {
                                            shaderArray.push({
                                                color: colors.insign,
                                                content: "="
                                            });
                                            i += 1;


                                            if (i < textString.length && nextNValue(1) != " " && nextNValue(1) != '>') {
                                                // 寻找属性值
                                                getAttrValueTemplate();

                                            }
                                        }
                                    } else {
                                        template += textString[i++];
                                    }
                                } else if (nextNValue(1) == '=') {
                                    shaderArray.push({
                                        color: colors.insign,
                                        content: "="
                                    });
                                    i += 1;
                                } else {
                                    if (i < textString.length && nextNValue(1) != " " && nextNValue(1) != '>') {

                                        getAttrValueTemplate();

                                    }
                                }

                            } else {
                                template += textString[i++];
                            }

                        }

                    }

                }

                if (specialTag != "") {

                    var oldI = i, oldTemplate = template, langHelp, innerShaderArray;
                    while (nextNValue(specialTag.length) != specialTag && i < textString.length) {
                        template += textString[i++];
                    }

                    if (i < textString.length) {

                        langHelp = specialTag.replace(/<\//, '');

                        innerShaderArray = {
                            "style>": _inner_CSS_shader,
                            "script>": _inner_ES_shader
                        }[langHelp](template, {
                            "style>": colors._css,
                            "script>": colors._javascript
                        }[langHelp]);

                        innerShaderArray.forEach(function (innerShader) {
                            shaderArray.push(innerShader);
                        });

                        template = "";
                    } else {
                        template = oldTemplate;
                        i = oldI;
                    }

                }

            }

            /* 追加字符 */

            else {
                if (i >= textString.length) {
                    initTemplate();
                    break;
                } else {
                    template += textString[i++];
                }
            }

        }

        return shaderArray;

    }

    // 合并内容

    var toShaderReult = function (words) {

        var resultData = [[]], lineNum = 0;

        words.forEach(function (word) {

            var codeArray = word.content.split(/\n/), index;

            resultData[lineNum].push({
                color: word.color,
                content: codeArray[0]
            });

            for (index = 1; index < codeArray.length; index++) {
                lineNum += 1;
                resultData.push([]);

                resultData[lineNum].push({
                    color: word.color,
                    content: codeArray[index]
                });

            }

        });

        return resultData;
    };

    // 初始化配置文件

    var initConfig$1 = function (init, data) {
        var key;
        for (key in data)
            try {
                init[key] = data[key];
            } catch (e) {
                throw new Error("Illegal property value！");
            }
        return init;
    };

    var _deafultColors_html = {
        "text": "#000000",/*文本颜色*/
        "annotation": "#6a9955",/*注释颜色*/
        "insign": "#ffffff",/*符号颜色*/
        "node": "#1e50b3",/*结点颜色*/
        "attrKey": "#1e83b1",/*属性名称颜色*/
        "attrValue": "#ac4c1e"/*属性值颜色*/
    };
    var _deafultColors_css = {
        "annotation": "#6a9955",/*注释颜色*/
        "insign": "#ffffff",/*符号颜色*/
        "selector": "#1e50b3",/*选择器*/
        "attrKey": "#1e83b1",/*属性名称颜色*/
        "attrValue": "#ac4c1e"/*属性值颜色*/
    };
    var _deafultColors_javascript = {
        "text": "#000000",/*文本颜色*/
        "annotation": "#6a9955",/*注释颜色*/
        "insign": "#ffffff",/*符号颜色*/
        "key": "#ff0000",/*关键字颜色*/
        "string": "#ac4c1e",/*字符串颜色*/
        "funName": "#1e50b3",/*函数名称颜色*/
        "execName": "#1e83b1"/*执行方法颜色*/
    };

    function Shader (lang, colors) {
        colors = colors || {};

        var _inner_shader, _inner_colors;

        if (lang == 'html') {

            colors._css = initConfig$1(_deafultColors_css, colors.css);
            colors._javascript = initConfig$1(_deafultColors_javascript, colors.javascript);
            _inner_colors = initConfig$1(_deafultColors_html, colors);

            _inner_shader = _inner_HTML_shader;

        } else if (lang == 'css') {

            _inner_colors = initConfig$1(_deafultColors_css, colors);

            _inner_shader = _inner_CSS_shader;

        } else if (lang == 'javascript') {

            _inner_colors = initConfig$1(_deafultColors_javascript, colors);

            _inner_shader = _inner_ES_shader;

        } else {
            throw new Error('Language not supported:' + lang + ",The languages available include: html、css、javascript!");
        }

        return function (textString) {

            return toShaderReult(_inner_shader(textString, _inner_colors));

        };

    }

    // 导出
    var tool = {

        // 动画
        animation: animation,

        // 矩阵
        Matrix4: Matrix4,

        // 函数插值
        Hermite: Hermite,

        // 获取类型
        getType: getType$1,

        // 类型判断
        isUndefined: isUndefined, isNull: isNull, isBoolean: isBoolean, isNumber: isNumber, isString: isString, isSymbol: isSymbol,
        isFunction: isFunction, isArray: isArray, isError: isError, isPlainObject: isPlainObject, isObject: isObject,
        isElement: isElement, isAttribute: isAttribute, isText: isText, isComment: isComment,

        // 刻度
        ruler: ruler,

        // 字符串
        ReadString: ReadString,

        // 着色
        Shader: Shader

    };

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = tool;
    } else {
        window.tool = tool;
    }

}());

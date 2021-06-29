/*!
 * 💡 tool.js - 💡 前端常用的工具类方法汇总。
 * git+https://github.com/hai2007/tool.js.git
 *
 * author 你好2007 < https://hai2007.gitee.io/sweethome >
 *
 * version 0.8.0
 *
 * Copyright (c) 2020-present hai2007 走一步，再走一步。
 * Released under the MIT license
 *
 * Date:Tue Jun 29 2021 10:09:29 GMT+0800 (中国标准时间)
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
     * 💡 - 提供常用的DOM操作方法
     * https://github.com/hai2007/tool.js/blob/master/xhtml.js
     *
     * author hai2007 < https://hai2007.gitee.io/sweethome >
     *
     * Copyright (c) 2021-present hai2007 走一步，再走一步。
     * Released under the MIT license
     */

    // 命名空间路径
    var namespace = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };

    /**
     * 结点操作补充
     */

    var xhtml = {

        // 阻止冒泡
        "stopPropagation": function (event) {
            event = event || window.event;
            if (event.stopPropagation) { //这是其他非IE浏览器
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },

        // 阻止默认事件
        "preventDefault": function (event) {
            event = event || window.event;
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },

        // 判断是否是结点
        "isNode": function (param) {
            return param && (param.nodeType === 1 || param.nodeType === 9 || param.nodeType === 11);
        },

        // 绑定事件
        "bind": function (dom, eventType, callback) {

            if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
                for (var i = 0; i < dom.length; i++) {
                    this.bind(dom[i], eventType, callback);
                }
                return;
            }

            if (window.attachEvent)
                dom.attachEvent("on" + eventType, callback);
            else
                dom.addEventListener(eventType, callback, false);
        },
        // 去掉绑定事件
        "unbind": function (dom, eventType, handler) {

            if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
                for (var i = 0; i < dom.length; i++) {
                    this.unbind(dom[i], eventType, handler);
                }
                return;
            }

            if (window.detachEvent)
                dom.detachEvent('on' + eventType, handler);
            else
                dom.removeEventListener(eventType, handler, false);

        },

        // 在当前上下文context上查找结点
        // selectFun可选，返回boolean用以判断当前面对的结点是否保留
        "find": function (context, selectFun, tagName) {
            if (!this.isNode(context)) return [];
            var nodes = context.getElementsByTagName(tagName || '*');
            var result = [];
            for (var i = 0; i < nodes.length; i++) {
                if (this.isNode(nodes[i]) && (typeof selectFun != "function" || selectFun(nodes[i])))
                    result.push(nodes[i]);
            }
            return result;
        },

        // 寻找当前结点的孩子结点
        // selectFun可选，返回boolean用以判断当前面对的结点是否保留
        "children": function (dom, selectFun) {
            var nodes = dom.childNodes;
            var result = [];
            for (var i = 0; i < nodes.length; i++) {
                if (this.isNode(nodes[i]) && (typeof selectFun != "function" || selectFun(nodes[i])))
                    result.push(nodes[i]);
            }
            return result;
        },

        // 判断结点是否有指定class
        // clazzs可以是字符串或数组字符串
        // notStrict可选，boolean值，默认false表示结点必须包含全部class,true表示至少包含一个即可
        "hasClass": function (dom, clazzs, notStrict) {
            if (clazzs.constructor !== Array) clazzs = [clazzs];

            var class_str = " " + (dom.getAttribute('class') || "") + " ";
            for (var i = 0; i < clazzs.length; i++) {
                if (class_str.indexOf(" " + clazzs[i] + " ") >= 0) {
                    if (notStrict) return true;
                } else {
                    if (!notStrict) return false;
                }
            }
            return true;
        },

        // 删除指定class
        "removeClass": function (dom, clazz) {
            var oldClazz = " " + (dom.getAttribute('class') || "") + " ";
            var newClazz = oldClazz.replace(" " + clazz.trim() + " ", " ");
            dom.setAttribute('class', newClazz.trim());
        },

        // 添加指定class
        "addClass": function (dom, clazz) {
            if (this.hasClass(dom, clazz)) return;
            var oldClazz = dom.getAttribute('class') || "";
            dom.setAttribute('class', oldClazz + " " + clazz);
        },

        // 字符串变成结点
        // isSvg可选，boolean值，默认false表示结点是html，为true表示svg类型
        "toNode": function (template, isSvg) {
            var frame;

            // html和svg上下文不一样
            if (isSvg) frame = document.createElementNS(namespace.svg, 'svg');
            else {

                var frameTagName = 'div';

                // 大部分的标签可以直接使用div作为容器
                // 部分特殊的需要特殊的容器标签

                if (/^<tr[> ]/.test(template)) {

                    frameTagName = "tbody";

                } else if (/^<th[> ]/.test(template) || /^<td[> ]/.test(template)) {

                    frameTagName = "tr";

                } else if (/^<thead[> ]/.test(template) || /^<tbody[> ]/.test(template)) {

                    frameTagName = "table";

                }

                frame = document.createElement(frameTagName);
            }

            // 低版本浏览器svg没有innerHTML，考虑是vue框架中，没有补充
            frame.innerHTML = template;

            var childNodes = frame.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                if (this.isNode(childNodes[i])) return childNodes[i];
            }
        },

        // 主动触发事件
        "trigger": function (dom, eventType) {

            //创建event的对象实例。
            if (document.createEventObject) {
                // IE浏览器支持fireEvent方法
                dom.fireEvent('on' + eventType, document.createEventObject());
            }

            // 其他标准浏览器使用dispatchEvent方法
            else {
                var _event = document.createEvent('HTMLEvents');
                // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
                _event.initEvent(eventType, true, false);
                dom.dispatchEvent(_event);
            }

        },

        // 获取样式
        "getStyle": function (dom, name) {
            // 获取结点的全部样式
            var allStyle = document.defaultView && document.defaultView.getComputedStyle ?
                document.defaultView.getComputedStyle(dom, null) :
                dom.currentStyle;

            // 如果没有指定属性名称，返回全部样式
            return typeof name === 'string' ?
                allStyle.getPropertyValue(name) :
                allStyle;
        },

        // 获取元素位置
        "offsetPosition": function (dom) {
            var left = 0;
            var top = 0;
            top = dom.offsetTop;
            left = dom.offsetLeft;
            dom = dom.offsetParent;
            while (dom) {
                top += dom.offsetTop;
                left += dom.offsetLeft;
                dom = dom.offsetParent;
            }
            return {
                "left": left,
                "top": top
            };
        },

        // 获取鼠标相对元素位置
        "mousePosition": function (dom, event) {
            var bounding = dom.getBoundingClientRect();
            if (!event || !event.clientX)
                throw new Error('Event is necessary!');
            return {
                "x": event.clientX - bounding.left,
                "y": event.clientY - bounding.top
            };
        },

        // 删除结点
        "remove": function (dom) {
            dom.parentNode.removeChild(dom);
        },

        // 设置多个样式
        "setStyles": function (dom, styles) {
            for (var key in styles)
                dom.style[key] = styles[key];
        },

        // 获取元素大小
        "size": function (dom, type) {
            var elemHeight, elemWidth;
            if (type == 'content') { //内容
                elemWidth = dom.clientWidth - ((this.getStyle(dom, 'padding-left') + "").replace('px', '')) - ((this.getStyle(dom, 'padding-right') + "").replace('px', ''));
                elemHeight = dom.clientHeight - ((this.getStyle(dom, 'padding-top') + "").replace('px', '')) - ((this.getStyle(dom, 'padding-bottom') + "").replace('px', ''));
            } else if (type == 'padding') { //内容+内边距
                elemWidth = dom.clientWidth;
                elemHeight = dom.clientHeight;
            } else if (type == 'border') { //内容+内边距+边框
                elemWidth = dom.offsetWidth;
                elemHeight = dom.offsetHeight;
            } else if (type == 'scroll') { //滚动的宽（不包括border）
                elemWidth = dom.scrollWidth;
                elemHeight = dom.scrollHeight;
            } else {
                elemWidth = dom.offsetWidth;
                elemHeight = dom.offsetHeight;
            }
            return {
                width: elemWidth,
                height: elemHeight
            };
        },

        // 在被选元素内部的结尾插入内容
        "append": function (el, template) {
            var node = this.isNode(template) ? template : this.toNode(template);
            el.appendChild(node);
            return node;
        },

        // 在被选元素内部的开头插入内容
        "prepend": function (el, template) {
            var node = this.isNode(template) ? template : this.toNode(template);
            el.insertBefore(node, el.childNodes[0]);
            return node;
        },

        // 在被选元素之后插入内容
        "after": function (el, template) {
            var node = this.isNode(template) ? template : this.toNode(template);
            el.parentNode.insertBefore(node, el.nextSibling);
            return node;
        },

        // 在被选元素之前插入内容
        "before": function (el, template) {
            var node = this.isNode(template) ? template : this.toNode(template);
            el.parentNode.insertBefore(node, el);
            return node;
        }

    };

    /*!
     * 💡 - 获取键盘此时按下的键的组合结果
     * https://github.com/hai2007/tool.js/blob/master/getKeyString.js
     *
     * author hai2007 < https://hai2007.gitee.io/sweethome >
     *
     * Copyright (c) 2021-present hai2007 走一步，再走一步。
     * Released under the MIT license
     */
    // 字典表
    var dictionary = {

        // 数字
        48: [0, ')'], 49: [1, '!'], 50: [2, '@'], 51: [3, '#'], 52: [4, '$'], 53: [5, '%'], 54: [6, '^'], 55: [7, '&'], 56: [8, '*'], 57: [9, '('],
        96: [0, 0], 97: 1, 98: 2, 99: 3, 100: 4, 101: 5, 102: 6, 103: 7, 104: 8, 105: 9,
        106: "*", 107: "+", 109: "-", 110: ".", 111: "/",

        // 字母
        65: ["a", "A"], 66: ["b", "B"], 67: ["c", "C"], 68: ["d", "D"], 69: ["e", "E"], 70: ["f", "F"], 71: ["g", "G"],
        72: ["h", "H"], 73: ["i", "I"], 74: ["j", "J"], 75: ["k", "K"], 76: ["l", "L"], 77: ["m", "M"], 78: ["n", "N"],
        79: ["o", "O"], 80: ["p", "P"], 81: ["q", "Q"], 82: ["r", "R"], 83: ["s", "S"], 84: ["t", "T"],
        85: ["u", "U"], 86: ["v", "V"], 87: ["w", "W"], 88: ["x", "X"], 89: ["y", "Y"], 90: ["z", "Z"],

        // 方向
        37: "left", 38: "up", 39: "right", 40: "down",
        33: "page up", 34: "page down", 35: "end", 36: "home",

        // 控制键
        16: "shift", 17: "ctrl", 18: "alt", 91: "command", 92: "command", 93: "command", 9: "tab", 20: "caps lock", 32: "spacebar", 8: "backspace", 13: "enter", 27: "esc",
        46: "delete", 45: "insert", 144: "number lock", 145: "scroll lock", 12: "clear",
        19: "pause",

        // 功能键
        112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 120: "f9", 121: "f10", 122: "f11", 123: "f12",

        // 余下键
        189: ["-", "_"], 187: ["=", "+"], 219: ["[", "{"], 221: ["]", "}"], 220: ["\\", "|"], 186: [";", ":"], 222: ["'", '"'], 188: [",", "<"], 190: [".", ">"], 191: ["/", "?"], 192: ["`", "~"]

    };

    // 非独立键字典
    var help_key = ["shift", "ctrl", "alt"];

    /**
     * 键盘按键
     * 返回键盘此时按下的键的组合结果
     */
    function getKeyString (event) {
        event = event || window.event;

        var keycode = event.keyCode || event.which;
        var key = dictionary[keycode] || keycode;
        if (!key) return;
        if (key.constructor !== Array) key = [key, key];

        var _key=key[0];

        var shift = event.shiftKey ? "shift+" : "",
            alt = event.altKey ? "alt+" : "",
            ctrl = event.ctrlKey ? "ctrl+" : "";

        var resultKey = "", preKey = ctrl + shift + alt;

        if (help_key.indexOf(key[0]) >= 0) {
            key[0] = key[1] = "";
        }

        // 判断是否按下了caps lock
        var lockPress = event.code == "Key" + event.key && !shift;

        // 只有字母（且没有按下功能Ctrl、shift或alt）区分大小写
        resultKey = (preKey + ((preKey == '' && lockPress) ? key[1] : key[0]));

        if (key[0] == "") {
            resultKey = resultKey.replace(/\+$/, '');
        }

        return resultKey==''?_key:resultKey;
    }

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
        var distance = Math.ceil((maxValue - minValue) * times100 / num) / times100;

        // 最小值，也就是起点
        var begin = Math.floor(minValue / distance) * distance;

        var rulerArray = [], index;
        // 获取最终的刻度尺数组
        rulerArray.push(begin);
        for (index = 1; rulerArray[rulerArray.length - 1] < maxValue; index++) {
            rulerArray.push(begin + distance * index);
        }

        return rulerArray;
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
        isFunction: isFunction, isArray: isArray, isError: isError, isPlainObject: isPlainObject,
        isElement: isElement, isAttribute: isAttribute, isText: isText, isComment: isComment,

        // DOM操作
        xhtml: xhtml,

        // 键盘按键
        getKeyString: getKeyString,

        // 刻度
        ruler: ruler,

        // 字符串
        ReadString: ReadString

    };

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = tool;
    } else {
        window.tool = tool;
    }

}());

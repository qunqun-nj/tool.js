(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  //当前正在运动的动画的tick函数堆栈
  var $timers = []; //唯一定时器的定时间隔

  var $interval = 13; //指定了动画时长duration默认值

  var $speeds = 400; //定时器ID

  var $timerId = null; // 动画轮播

  /**
   * @param {function} doback 轮询函数，有一个形参deep，0-1，表示执行进度
   * @param {number} duration 动画时长，可选
   * @param {function} callback 动画结束回调，可选，有一个形参deep，0-1，表示执行进度
   *
   * @returns {function} 返回一个函数，调用该函数，可以提前结束动画
   */

  function animation (doback, duration, callback) {
    var clock = {
      //把tick函数推入堆栈
      "timer": function timer(tick, duration, callback) {
        if (!tick) {
          throw new Error('Tick is required!');
        }

        duration = duration || $speeds;
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
      "start": function start() {
        if (!$timerId) {
          $timerId = setInterval(clock.tick, $interval);
        }
      },
      //被定时器调用，遍历timers堆栈
      "tick": function tick() {
        var createTime,
            flag,
            tick,
            callback,
            timer,
            duration,
            passTime,
            timers = $timers;
        $timers = [];
        $timers.length = 0;

        for (flag = 0; flag < timers.length; flag++) {
          //初始化数据
          timer = timers[flag];
          createTime = timer.createTime;
          tick = timer.tick;
          duration = timer.duration;
          callback = timer.callback;

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
      "stop": function stop() {
        if ($timerId) {
          clearInterval($timerId);
          $timerId = null;
        }
      }
    };
    var id = clock.timer(function (deep) {
      //其中deep为0-1，表示改变的程度
      doback(deep);
    }, duration, callback); // 返回一个函数
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
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, a * d / sqrt, b * d / sqrt, c * d / sqrt, 1];
  }

  /**
   * 围绕0Z轴旋转
   * 其它的旋转可以借助transform实现
   * 旋转角度单位采用弧度制
   */
  function _rotate (deg) {
    var sin = Math.sin(deg),
        cos = Math.cos(deg);
    return [cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }

  /**
   * 围绕圆心x、y和z分别缩放xTimes, yTimes和zTimes倍
   */
  function _scale (xTimes, yTimes, zTimes, cx, cy, cz) {
    cx = cx || 0;
    cy = cy || 0;
    cz = cz || 0;
    return [xTimes, 0, 0, 0, 0, yTimes, 0, 0, 0, 0, zTimes, 0, cx - cx * xTimes, cy - cy * yTimes, cz - cz * zTimes, 1];
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
        c1 = 0;
        a2 = a1;
        b2 = b1;
        c2 = 1;
      } // 只设置三个点(设置不足六个点都认为只设置了三个点)
      // 表示围绕从原点出发的射线旋转
      else if (typeof a2 !== 'number' || typeof b2 !== 'number' || typeof c2 !== 'number') {
          a2 = a1;
          b2 = b1;
          c2 = c1;
          a1 = 0;
          b1 = 0;
          c1 = 0;
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
      return [// 任意射线变成OZ轴变换矩阵
      [cos1, cos2 * sin1, sin1 * sin2, 0, -sin1, cos1 * cos2, cos1 * sin2, 0, 0, -sin2, cos2, 0, b1 * sin1 - a1 * cos1, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2, 1], // OZ轴变回原来的射线的变换矩阵
      [cos1, -sin1, 0, 0, cos2 * sin1, cos2 * cos1, -sin2, 0, sin1 * sin2, cos1 * sin2, cos2, 0, a1, b1, c1, 1]];
    } else {
      throw new Error('a1 and b1 is required!');
    }
  }

  // 二个4x4矩阵相乘
  // 或矩阵和齐次坐标相乘
  var _multiply = function _multiply(matrix4, param) {
    var newParam = [];

    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < param.length / 4; j++) {
        newParam[j * 4 + i] = matrix4[i] * param[j * 4] + matrix4[i + 4] * param[j * 4 + 1] + matrix4[i + 8] * param[j * 4 + 2] + matrix4[i + 12] * param[j * 4 + 3];
      }
    }

    return newParam;
  };

  function Matrix4 (initMatrix4) {
    var matrix4 = initMatrix4 || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    var matrix4Obj = {
      // 移动
      "move": function move(dis, a, b, c) {
        matrix4 = _multiply(_move(dis, a, b, c), matrix4);
        return matrix4Obj;
      },
      // 旋转
      "rotate": function rotate(deg, a1, b1, c1, a2, b2, c2) {
        var matrix4s = _transform(a1, b1, c1, a2, b2, c2);

        matrix4 = _multiply(_multiply(_multiply(matrix4s[1], _rotate(deg)), matrix4s[0]), matrix4);
        return matrix4Obj;
      },
      // 缩放
      "scale": function scale(xTimes, yTimes, zTimes, cx, cy, cz) {
        matrix4 = _multiply(_scale(xTimes, yTimes, zTimes, cx, cy, cz), matrix4);
        return matrix4Obj;
      },
      // 乘法
      // 可以传入一个矩阵(matrix4,flag)
      "multiply": function multiply(newMatrix4, flag) {
        matrix4 = flag ? _multiply(matrix4, newMatrix4) : _multiply(newMatrix4, matrix4);
        return matrix4Obj;
      },
      // 对一个坐标应用变换
      // 齐次坐标(x,y,z,w)
      "use": function use(x, y, z, w) {
        // w为0表示点位于无穷远处，忽略
        z = z || 0;
        w = w || 1;

        var temp = _multiply(matrix4, [x, y, z, w]);

        temp[0] = +temp[0].toFixed(7);
        temp[1] = +temp[1].toFixed(7);
        temp[2] = +temp[2].toFixed(7);
        temp[3] = +temp[3].toFixed(7);
        return temp;
      },
      // 矩阵的值
      "value": function value() {
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
    for (var key in data) {
      try {
        init[key] = data[key];
      } catch (e) {
        throw new Error("Illegal property value！");
      }
    }

    return init;
  }

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

    var hermite = function hermite(x) {
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
        a = x1;
        b = x2;
        var p3 = config.u * s1,
            p4 = config.u * s2; // 缩放到[0,1]定义域

        y1 /= x2 - x1;
        y2 /= x2 - x1; // MR是提前计算好的多项式通解矩阵
        // 为了加速计算
        // 如上面说的
        // 统一在[0,1]上计算后再通过缩放和移动恢复
        // 避免了动态求解矩阵的麻烦

        MR = [2 * y1 - 2 * y2 + p3 + p4, 3 * y2 - 3 * y1 - 2 * p3 - p4, p3, y1];
      } else throw new Error('The point x-position should be increamented!');

      return hermite;
    };

    return hermite;
  }

  var tool = {
    animation: animation,
    Matrix4: Matrix4,
    Hermite: Hermite
  };

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = tool;
  } else {
    window.tool = tool;
  }

}());

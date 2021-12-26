
/*************************** [bundle] ****************************/
// Original file:./src/pages/api/index.paper
/*****************************************************************/
window.__etcpack__bundleSrc__['24']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    

    // 导入js
__etcpack__scope_args__=window.__etcpack__getBundle('31');
var script =__etcpack__scope_args__.default;


    // 导入css
__etcpack__scope_args__=window.__etcpack__getBundle('43');


    script.render=function(createElement){

        return createElement('div',{"class":"nav-view","quickpaper":"","data-quickpaper-aa5c6c28":""},[createElement('div',{"class":"menu","data-quickpaper-aa5c6c28":""},[createElement('ul',{":active":"pagename==\"animation\"?\"yes\":\"no\"","data-quickpaper-aa5c6c28":""},[createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h3',{"@click":"openPage(\"animation\",\"top\",\"no\")","data-quickpaper-aa5c6c28":""},["动画轮播"])])]),createElement('ul',{":active":"pagename==\"Matrix4\"?\"yes\":\"no\"","data-quickpaper-aa5c6c28":""},[createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h3',{"@click":"openPage(\"Matrix4\",\"top\",\"no\")","data-quickpaper-aa5c6c28":""},["列主序存储的4x4矩阵"]),createElement('ul',{"data-quickpaper-aa5c6c28":""},[createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h4',{"@click":"doScroll(\"matrix4-basic\")","data-quickpaper-aa5c6c28":""},["基本运算"])]),createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h4',{"@click":"doScroll(\"matrix4-calc\")","data-quickpaper-aa5c6c28":""},["坐标变换"])])])])]),createElement('ul',{":active":"pagename==\"Hermite\"?\"yes\":\"no\"","data-quickpaper-aa5c6c28":""},[createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h3',{"@click":"openPage(\"Hermite\",\"top\",\"no\")","data-quickpaper-aa5c6c28":""},["Hermite三次插值"])])]),createElement('ul',{":active":"pagename==\"getType\"?\"yes\":\"no\"","data-quickpaper-aa5c6c28":""},[createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h3',{"@click":"openPage(\"getType\",\"top\",\"no\")","data-quickpaper-aa5c6c28":""},["获取值的类型"])])]),createElement('ul',{":active":"pagename==\"type\"?\"yes\":\"no\"","data-quickpaper-aa5c6c28":""},[createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h3',{"@click":"openPage(\"type\",\"top\",\"no\")","data-quickpaper-aa5c6c28":""},["值类型判断"])])]),createElement('ul',{":active":"pagename==\"ruler\"?\"yes\":\"no\"","data-quickpaper-aa5c6c28":""},[createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h3',{"@click":"openPage(\"ruler\",\"top\",\"no\")","data-quickpaper-aa5c6c28":""},["刻度尺刻度求解"])])]),createElement('ul',{":active":"pagename==\"string\"?\"yes\":\"no\"","data-quickpaper-aa5c6c28":""},[createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h3',{"@click":"openPage(\"string\",\"top\",\"no\")","data-quickpaper-aa5c6c28":""},["字符串操作"]),createElement('ul',{"data-quickpaper-aa5c6c28":""},[createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h4',{"@click":"doScroll(\"ReadString\")","data-quickpaper-aa5c6c28":""},["字符串分析"])])])])]),createElement('ul',{":active":"pagename==\"Shader\"?\"yes\":\"no\"","data-quickpaper-aa5c6c28":""},[createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h3',{"@click":"openPage(\"Shader\",\"top\",\"no\")","data-quickpaper-aa5c6c28":""},["代码着色计算"]),createElement('ul',{"data-quickpaper-aa5c6c28":""},[createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h4',{"@click":"doScroll(\"Shader-html\")","data-quickpaper-aa5c6c28":""},["html"])]),createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h4',{"@click":"doScroll(\"Shader-css\")","data-quickpaper-aa5c6c28":""},["css"])]),createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h4',{"@click":"doScroll(\"Shader-js\")","data-quickpaper-aa5c6c28":""},["javascript"])])])])]),createElement('ul',{":active":"pagename==\"date\"?\"yes\":\"no\"","data-quickpaper-aa5c6c28":""},[createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h3',{"@click":"openPage(\"date\",\"top\",\"no\")","data-quickpaper-aa5c6c28":""},["日期相关辅助计算"]),createElement('ul',{"data-quickpaper-aa5c6c28":""},[createElement('li',{"data-quickpaper-aa5c6c28":""},[createElement('h4',{"@click":"doScroll(\"calcDays\")","data-quickpaper-aa5c6c28":""},["calcDays"])])])])]),createElement('a',{"class":"need-help","href":"https://github.com/hai2007/tool.js/issues","target":"_blank","data-quickpaper-aa5c6c28":""},["不够用？点击此处告诉我们"])]),createElement('div',{"id":"root-view","class":"view","data-quickpaper-aa5c6c28":""},[createElement('div',{"data-quickpaper-aa5c6c28":""},[createElement('component',{":is":"page","data-quickpaper-aa5c6c28":""},[])])])])

    };

    __etcpack__scope_bundle__.default= script;

  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/api/index.paper?QuickPaper&type=script&lang=js&hash=aa5c6c28
/*****************************************************************/
window.__etcpack__bundleSrc__['31']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    __etcpack__scope_args__=window.__etcpack__getBundle('32');
var fixedScroll =__etcpack__scope_args__.default;


    let pages = {
        animation: () => window.__etcpack__getLazyBundle('./build/main@v0.2.1-bundle3.js','34'),
        Matrix4: () => window.__etcpack__getLazyBundle('./build/main@v0.2.1-bundle4.js','35'),
        Hermite: () => window.__etcpack__getLazyBundle('./build/main@v0.2.1-bundle5.js','36'),
        getType: () => window.__etcpack__getLazyBundle('./build/main@v0.2.1-bundle6.js','37'),
        type: () => window.__etcpack__getLazyBundle('./build/main@v0.2.1-bundle7.js','38'),
        ruler: () => window.__etcpack__getLazyBundle('./build/main@v0.2.1-bundle8.js','39'),
        string: () => window.__etcpack__getLazyBundle('./build/main@v0.2.1-bundle9.js','40'),
        Shader: () => window.__etcpack__getLazyBundle('./build/main@v0.2.1-bundle10.js','41'),
        date: () => window.__etcpack__getLazyBundle('./build/main@v0.2.1-bundle11.js','42')
    };

    __etcpack__scope_bundle__.default= {
        data() {
            return {
                page: null,
                pagename: ""
            };
        },
        mounted() {
            let urlJson = this.urlFormat(window.location.href);
            this.openPage(urlJson.router[1] in pages ? urlJson.router[1] : "Matrix4", urlJson.params.fixed || "top");
        },
        methods: {
            openPage(pagename, fixedName, flag) {
                pages[pagename]().then(data => {
                    this.page = data.default;
                    this.pagename = pagename;
                    if (flag == 'no') window.location.href = "#/api/" + pagename + "?fixed=" + fixedName;
                    fixedScroll(fixedName);
                });
            },
            doScroll(fixedName) {
                window.location.href = "#/api/" + this.pagename + "?fixed=" + fixedName;
                fixedScroll(fixedName);
            }
        }
    };
  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/Service/fixedScroll.js
/*****************************************************************/
window.__etcpack__bundleSrc__['32']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    __etcpack__scope_args__=window.__etcpack__getBundle('33');
var animation =__etcpack__scope_args__.default;

__etcpack__scope_bundle__.default= function (fixed, overValue) {
  overValue = overValue || 60;
  var element = document.getElementById('root-view');

  if (fixed) {
    // 获取滚动调整结点
    var fixedDom = document.getElementById('fixed-' + fixed);

    if (fixedDom) {
      var offsetTop = fixedDom.offsetTop - overValue;
      var currentScrollTop = element.scrollTop || 0;
      animation(function (deep) {
        element.scrollTop = (offsetTop - currentScrollTop) * deep + currentScrollTop;
      }, 500, function () {
        element.scrollTop = offsetTop;
      });
    }
  } else {
    element.scrollTop = 0;
  }
}
;
  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./node_modules/@hai2007/tool/animation.js
/*****************************************************************/
window.__etcpack__bundleSrc__['33']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
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
__etcpack__scope_bundle__.default= function (doback, duration, callback) {

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
            var createTime, flag, tick, callback, timer, duration, passTime, needStop,
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
                needStop = false;

                //执行
                passTime = (+new Date() - createTime) / duration;
                if (passTime >= 1) {
                    needStop = true;
                }
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

};

  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/api/index.paper?QuickPaper&type=style&lang=css&hash=aa5c6c28
/*****************************************************************/
window.__etcpack__bundleSrc__['43']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n .need-help[data-quickpaper-aa5c6c28]{\n\nbackground-color: #799d41;\n\ncolor: white;\n\ntext-align: center;\n\nmargin: 5px;\n\nmargin-top: 20px;\n\ncursor: pointer;\n\nfont-size: 12px;\n\ndisplay: block;\n\npadding: 10px 0;\n\nborder-radius: 7px;\n\n}\n\n .need-help[data-quickpaper-aa5c6c28]:hover{\n\ntext-decoration: underline;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);
  
    return __etcpack__scope_bundle__;
}

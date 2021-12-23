
/*************************** [bundle] ****************************/
// Original file:./src/pages/api/animation.paper
/*****************************************************************/
window.__etcpack__bundleSrc__['36']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    

    // 导入js
__etcpack__scope_args__=window.__etcpack__getBundle('45');
var script =__etcpack__scope_args__.default;


    // 导入css
__etcpack__scope_args__=window.__etcpack__getBundle('46');


    script.render=function(createElement){

        return createElement('div',{"class":"doc-view","quickpaper":"","data-quickpaper-5368d11e":""},[createElement('header',{"id":"fixed-top","data-quickpaper-5368d11e":""},["动画轮播"]),createElement('pre',{"q-code":"","data-quickpaper-5368d11e":""},["import animation from '@hai2007/tool/animation.js';"]),createElement('p',{"data-quickpaper-5368d11e":""},["这里不是真正的动画，只是一个方便你实现动画效果的一个辅助方法："]),createElement('pre',{"q-code":"","data-quickpaper-5368d11e":""},["var stop=animation(function(deep){↵    // deep取值0-1，表示动画进度↵}, speeds, function(deep){↵    // deep和上面一样，提供的原因是有时候结束回调是stop方法触发而不是动画结束了↵});"]),createElement('p',{"data-quickpaper-5368d11e":""},["该方法有三个参数：分别表示画帧方法、动画时长和动画结束回调（动画时长单位毫秒，最后二个均可选）。"]),createElement('p',{"data-quickpaper-5368d11e":""},["如果你希望动画立刻结束，可以调用下面的方法强行提前停止："]),createElement('pre',{"q-code":"","data-quickpaper-5368d11e":""},["stop();"])])

    };

    __etcpack__scope_bundle__.default= script;

  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/api/animation.paper?QuickPaper&type=script&lang=js&hash=5368d11e
/*****************************************************************/
window.__etcpack__bundleSrc__['45']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    __etcpack__scope_bundle__.default= {};
  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/api/animation.paper?QuickPaper&type=style&lang=css&hash=5368d11e
/*****************************************************************/
window.__etcpack__bundleSrc__['46']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);
  
    return __etcpack__scope_bundle__;
}

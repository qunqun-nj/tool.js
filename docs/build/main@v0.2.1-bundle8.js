
/*************************** [bundle] ****************************/
// Original file:./src/pages/api/ruler.paper
/*****************************************************************/
window.__etcpack__bundleSrc__['39']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    

    // 导入js
__etcpack__scope_args__=window.__etcpack__getBundle('54');
var script =__etcpack__scope_args__.default;


    // 导入css
__etcpack__scope_args__=window.__etcpack__getBundle('55');


    script.render=function(createElement){

        return createElement('div',{"class":"doc-view","quickpaper":"","data-quickpaper-0cc781e0":""},[createElement('header',{"id":"fixed-top","data-quickpaper-0cc781e0":""},["刻度尺刻度求解"]),createElement('pre',{"q-code":"","data-quickpaper-0cc781e0":""},["import ruler from '@hai2007/tool/ruler.js';"]),createElement('pre',{"q-code":"","data-quickpaper-0cc781e0":""},["// 需要注意的是，实际的间距个数可能是 num-1 或 num 或 num+1 或 1↵var rulerArray = ruler(maxValue, minValue, num);"]),createElement('p',{"data-quickpaper-0cc781e0":""},["返回的是一个数组，记录着一个个刻度值。"])])

    };

    __etcpack__scope_bundle__.default= script;

  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/api/ruler.paper?QuickPaper&type=script&lang=js&hash=0cc781e0
/*****************************************************************/
window.__etcpack__bundleSrc__['54']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    __etcpack__scope_bundle__.default= {};
  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/api/ruler.paper?QuickPaper&type=style&lang=css&hash=0cc781e0
/*****************************************************************/
window.__etcpack__bundleSrc__['55']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);
  
    return __etcpack__scope_bundle__;
}

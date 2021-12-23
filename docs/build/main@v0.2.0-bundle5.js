
/*************************** [bundle] ****************************/
// Original file:./src/pages/api/Hermite.paper
/*****************************************************************/
window.__etcpack__bundleSrc__['38']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    

    // 导入js
__etcpack__scope_args__=window.__etcpack__getBundle('49');
var script =__etcpack__scope_args__.default;


    // 导入css
__etcpack__scope_args__=window.__etcpack__getBundle('50');


    script.render=function(createElement){

        return createElement('div',{"class":"doc-view","quickpaper":"","data-quickpaper-1ad3eb9c":""},[createElement('header',{"id":"fixed-top","data-quickpaper-1ad3eb9c":""},["Hermite三次插值"]),createElement('pre',{"q-code":"","data-quickpaper-1ad3eb9c":""},["import Hermite from '@hai2007/tool/Hermite.js';"]),createElement('p',{"data-quickpaper-1ad3eb9c":""},["三次插值法，调用该方法就会返回一个插值对象："]),createElement('pre',{"q-code":"","data-quickpaper-1ad3eb9c":""},["var hermite=Hermite(config);"]),createElement('p',{"data-quickpaper-1ad3eb9c":""},["config有一个配置项，config.u，设置张弛系数(应该在点的位置设置前设置)。"]),createElement('p',{"data-quickpaper-1ad3eb9c":""},["该参数用于调整曲线走势，默认数值u=0.5，分水岭u=1，|u-1|的值越大，曲线走势调整的越严重。"]),createElement('p',{"data-quickpaper-1ad3eb9c":""},["设置点的位置:"]),createElement('pre',{"q-code":"","data-quickpaper-1ad3eb9c":""},["hermite.setP(x1, y1, x2, y2, s1, s2);"]),createElement('p',{"data-quickpaper-1ad3eb9c":""},["参数分别表示：左边点的位置(x1, y1)，右边点的位置(x2, y2)和二个点的斜率s1，s2。"]),createElement('p',{"data-quickpaper-1ad3eb9c":""},["经过上面的设置，插值对象就可以求值了。比如x=a，其中a在需要插值的点之间（边界也可以），你可以这样求解出y值："]),createElement('pre',{"q-code":"","data-quickpaper-1ad3eb9c":""},["var y=hermite(a);"])])

    };

    __etcpack__scope_bundle__.default= script;

  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/api/Hermite.paper?QuickPaper&type=script&lang=js&hash=1ad3eb9c
/*****************************************************************/
window.__etcpack__bundleSrc__['49']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    __etcpack__scope_bundle__.default= {};
  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/api/Hermite.paper?QuickPaper&type=style&lang=css&hash=1ad3eb9c
/*****************************************************************/
window.__etcpack__bundleSrc__['50']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);
  
    return __etcpack__scope_bundle__;
}

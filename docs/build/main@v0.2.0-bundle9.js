
/*************************** [bundle] ****************************/
// Original file:./src/pages/api/string.paper
/*****************************************************************/
window.__etcpack__bundleSrc__['42']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    

    // 导入js
__etcpack__scope_args__=window.__etcpack__getBundle('57');
var script =__etcpack__scope_args__.default;


    // 导入css
__etcpack__scope_args__=window.__etcpack__getBundle('58');


    script.render=function(createElement){

        return createElement('div',{"class":"doc-view","quickpaper":"","data-quickpaper-6f6e5473":""},[createElement('header',{"id":"fixed-top","data-quickpaper-6f6e5473":""},["字符串操作"]),createElement('pre',{"q-code":"","data-quickpaper-6f6e5473":""},["import {↵    ReadString↵} from '@hai2007/tool/string.js';"]),createElement('h2',{"data-quickpaper-6f6e5473":""},["字符串分析"]),createElement('pre',{"q-code":"","data-quickpaper-6f6e5473":""},["// express表示需要分析的原始字符串↵var reader = ReadString(express);"]),createElement('p',{"data-quickpaper-6f6e5473":""},["执行后会返回一个用于辅助分析字符串的读取对象，此对象上有下列属性："]),createElement('ul',{"data-quickpaper-6f6e5473":""},[createElement('li',{"data-quickpaper-6f6e5473":""},["1.index：用于记录当前分析的位置，初始值为-1；"]),createElement('li',{"data-quickpaper-6f6e5473":""},["2.currentChar：用于记录当前分析的字符，初始值为null。"])]),createElement('p',{"data-quickpaper-6f6e5473":""},["除此之外，还有下列方法："]),createElement('p',{"data-quickpaper-6f6e5473":""},["读取下一个字符"]),createElement('pre',{"q-code":"","data-quickpaper-6f6e5473":""},["var char = reader.readNext();"]),createElement('p',{"data-quickpaper-6f6e5473":""},["获取往后num个值"]),createElement('pre',{"q-code":"","data-quickpaper-6f6e5473":""},["var nChar = reader.getNextN(num);"])])

    };

    __etcpack__scope_bundle__.default= script;

  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/api/string.paper?QuickPaper&type=script&lang=js&hash=6f6e5473
/*****************************************************************/
window.__etcpack__bundleSrc__['57']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    __etcpack__scope_bundle__.default= {};
  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/api/string.paper?QuickPaper&type=style&lang=css&hash=6f6e5473
/*****************************************************************/
window.__etcpack__bundleSrc__['58']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);
  
    return __etcpack__scope_bundle__;
}


/*************************** [bundle] ****************************/
// Original file:./src/pages/api/getType.paper
/*****************************************************************/
window.__etcpack__bundleSrc__['39']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    

    // 导入js
__etcpack__scope_args__=window.__etcpack__getBundle('51');
var script =__etcpack__scope_args__.default;


    // 导入css
__etcpack__scope_args__=window.__etcpack__getBundle('52');


    script.render=function(createElement){

        return createElement('div',{"class":"doc-view","quickpaper":"","data-quickpaper-1fdd696c":""},[createElement('header',{"id":"fixed-top","data-quickpaper-1fdd696c":""},["获取值的类型"]),createElement('pre',{"q-code":"","data-quickpaper-1fdd696c":""},["import getType from '@hai2007/tool/getType.js';"]),createElement('pre',{"q-code":"","data-quickpaper-1fdd696c":""},["var type=getType(input);"]),createElement('p',{"data-quickpaper-1fdd696c":""},["input表示需要判断类型的值。"]),createElement('p',{"data-quickpaper-1fdd696c":""},["type就是返回的类型结构，格式如下："]),createElement('pre',{"q-code":"","data-quickpaper-1fdd696c":""},["['Basic'|'Object',typeValue]"]),createElement('p',{"data-quickpaper-1fdd696c":""},["是的，type是一个数组，type[0]的值有两种，分别表示基本类型和引用类型，type[1]表示具体的类型，按照分类有如下可能的结果："]),createElement('ul',{"data-quickpaper-1fdd696c":""},[createElement('li',{"data-quickpaper-1fdd696c":""},["1.基本数据类型：Undefined|Null|Boolean|Number|String|Symbol"]),createElement('li',{"data-quickpaper-1fdd696c":""},["2.引用类型：Function|Array|Error|Plain"]),createElement('li',{"data-quickpaper-1fdd696c":""},["3.结点类型：Element|Attribute|Text|Comment"])]),createElement('p',{"data-quickpaper-1fdd696c":""},["最后，为了兼容后续升级，type[1]预留了值\"*\"，表示未识别类型，这种类型请不要使用。"])])

    };

    __etcpack__scope_bundle__.default= script;

  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/api/getType.paper?QuickPaper&type=script&lang=js&hash=1fdd696c
/*****************************************************************/
window.__etcpack__bundleSrc__['51']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    __etcpack__scope_bundle__.default= {};
  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/api/getType.paper?QuickPaper&type=style&lang=css&hash=1fdd696c
/*****************************************************************/
window.__etcpack__bundleSrc__['52']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);
  
    return __etcpack__scope_bundle__;
}


/*************************** [bundle] ****************************/
// Original file:./src/pages/api/Shader.paper
/*****************************************************************/
window.__etcpack__bundleSrc__['41']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    

    // 导入js
__etcpack__scope_args__=window.__etcpack__getBundle('58');
var script =__etcpack__scope_args__.default;


    // 导入css
__etcpack__scope_args__=window.__etcpack__getBundle('59');


    script.render=function(createElement){

        return createElement('div',{"class":"doc-view","quickpaper":"","data-quickpaper-0176dd32":""},[createElement('header',{"id":"fixed-top","data-quickpaper-0176dd32":""},["代码着色计算"]),createElement('pre',{"q-code":"","data-quickpaper-0176dd32":""},["import Shader from '@hai2007/tool/Shader.js';"]),createElement('pre',{"q-code":"","data-quickpaper-0176dd32":""},["// lang是一个字符串，表示需要着色的语言↵// colors可选，表示使用的色彩↵// 此外，colors具体有多项，都可选，配置你希望修改的即可，其余自动使用默认值↵var shader = Shader(lang[, colors]);"]),createElement('p',{"data-quickpaper-0176dd32":""},["上面的方法获取对于某个特定语言的着色计算实例，接下来使用就很简单了："]),createElement('pre',{"q-code":"","data-quickpaper-0176dd32":""},["// 获取的codeArray就是最终结果↵var codeArray = shader('代码');"]),createElement('p',{"data-quickpaper-0176dd32":""},["举个例子，比如对于下面的css代码："]),createElement('pre',{"q-code:css":"","data-quickpaper-0176dd32":""},["div{↵    color:red;↵}"]),createElement('p',{"data-quickpaper-0176dd32":""},["结果如下："]),createElement('pre',{"q-code":"","data-quickpaper-0176dd32":""},["[   // 最外层是一个数组，里面的元素表示一行行代码↵    [   // 比如这里的第一行代码，解析出来 ```div``` 和 ```{``` ，分别使用不同颜色表示↵        {color: \"#1e50b3\", content: \"div\"},↵        {color: \"#ffffff\", content: \"{\"}↵    ],↵    [{…}, {…}, {…}, {…}, {…}],↵    [{…}, {…}]↵]"]),createElement('p',{"data-quickpaper-0176dd32":""},["下面来列举出所有可选的语言："]),createElement('h2',{"id":"fixed-Shader-html","data-quickpaper-0176dd32":""},["html"]),createElement('pre',{"q-code":"","data-quickpaper-0176dd32":""},["Shader('html',{↵    \"text\": \"#000000\",/*文本颜色*/↵    \"annotation\": \"#6a9955\",/*注释颜色*/↵    \"insign\": \"#ffffff\",/*符号颜色*/↵    \"node\": \"#1e50b3\",/*结点颜色*/↵    \"attrKey\": \"#1e83b1\",/*属性名称颜色*/↵    \"attrValue\": \"#ac4c1e\",/*属性值颜色*/↵    \"css\":{↵        // 查看后续css语言部分↵    },↵    \"javascript\":{↵        // 查看后续javascript语言部分↵    }↵});"]),createElement('h2',{"id":"fixed-Shader-css","data-quickpaper-0176dd32":""},["css"]),createElement('pre',{"q-code":"","data-quickpaper-0176dd32":""},["Shader('css',{↵    \"annotation\": \"#6a9955\",/*注释颜色*/↵    \"insign\": \"#ffffff\",/*符号颜色*/↵    \"selector\": \"#1e50b3\",/*选择器*/↵    \"attrKey\": \"#1e83b1\",/*属性名称颜色*/↵    \"attrValue\": \"#ac4c1e\"/*属性值颜色*/↵});"]),createElement('h2',{"id":"fixed-Shader-js","data-quickpaper-0176dd32":""},["javascript"]),createElement('pre',{"q-code":"","data-quickpaper-0176dd32":""},["Shader('javascript',{↵    \"text\": \"#000000\",/*文本颜色*/↵    \"annotation\": \"#6a9955\",/*注释颜色*/↵    \"insign\": \"#ffffff\",/*符号颜色*/↵    \"key\": \"#ff0000\",/*关键字颜色*/↵    \"string\": \"#ac4c1e\",/*字符串颜色*/↵    \"funName\": \"#1e50b3\",/*函数名称颜色*/↵    \"execName\": \"#1e83b1\"/*执行方法颜色*/↵});"])])

    };

    __etcpack__scope_bundle__.default= script;

  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/api/Shader.paper?QuickPaper&type=script&lang=js&hash=0176dd32
/*****************************************************************/
window.__etcpack__bundleSrc__['58']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    __etcpack__scope_bundle__.default= {};
  
    return __etcpack__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/api/Shader.paper?QuickPaper&type=style&lang=css&hash=0176dd32
/*****************************************************************/
window.__etcpack__bundleSrc__['59']=function(){
    var __etcpack__scope_bundle__={};
    var __etcpack__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);
  
    return __etcpack__scope_bundle__;
}

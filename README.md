<p align='center'>
    <a href='https://hai2007.github.io/tool.js' target='_blank'>
        <img src='./logo.png'>
    </a>
</p>

# 💡 tool.js - 前端常用的工具类方法汇总

<p>
  <a href="https://hai2007.gitee.io/npm-downloads?interval=7&packages=@hai2007/tool"><img src="https://img.shields.io/npm/dm/@hai2007/tool.svg" alt="downloads"></a>
  <a href="https://www.jsdelivr.com/package/npm/@hai2007/tool"><img src="https://data.jsdelivr.com/v1/package/npm/@hai2007/tool/badge" alt="CDN"></a>
  <a href="https://www.npmjs.com/package/@hai2007/tool"><img src="https://img.shields.io/npm/v/@hai2007/tool.svg" alt="Version"></a>
  <a href="https://github.com/hai2007/tool.js/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@hai2007/tool.svg" alt="License"></a>
  <a href="https://github.com/hai2007/tool.js" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/hai2007/tool.js?style=social">
    </a>
</p>

## Issues
使用的时候遇到任何问题或有好的建议，请点击进入[issue](https://github.com/hai2007/tool.js/issues)，欢迎参与维护！

## How to use?

首先你需要通过命令行安装，就像这样：

```
npm install --save @hai2007/tool
```

安装好了以后，然后引入你需要的算法即可（在具体方法的开头会说明），除此之外，你还可以直接引入全部方法：

```js
import tool from '@hai2007/tool';
```

或

```html
<script src='https://cdn.jsdelivr.net/npm/@hai2007/tool@1'></script>
```

如果是node.js环境，请使用这种方式引入：

```js
let tool = require('@hai2007/tool');
```

### 可以使用的接口

- tool.animation() : 一个更灵活的动画工具方法
- tool.Matrix4() : 可以用于WebGL绘图的变换矩阵
- ......等

当然，考虑到web应用打包体积的问题，比如我们希望判断一个变量是否是字符串，我们有```tool.isString```方法，那么，更小提交的引入方式是：

```js
import {isString} from '@hai2007/tool/type.js';
```

具体的使用你可以[查阅文档](https://hai2007.github.io/tool.js)哦~


如果在使用的时候，发现文档中有的方法无法使用，可能是你的版本过低导致的，你可以[点击此处](https://github.com/hai2007/tool.js/blob/master/CHANGELOG)查看版本日志。

开源协议
---------------------------------------
[MIT](https://github.com/hai2007/tool.js/blob/master/LICENSE)

Copyright (c) 2020-present [hai2007](https://hai2007.gitee.io/sweethome/) 走一步，再走一步。

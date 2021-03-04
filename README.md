# 💡 tool.js - 前端常用的工具类方法汇总

<p>
  <a href="https://hai2007.gitee.io/npm-downloads?interval=7&packages=@hai2007/tool"><img src="https://img.shields.io/npm/dm/@hai2007/tool.svg" alt="downloads"></a>
  <a href="https://packagephobia.now.sh/result?p=@hai2007/tool"><img src="https://packagephobia.now.sh/badge?p=@hai2007/tool" alt="install size"></a>
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
首先你需要通过命令行安装：

```bash
npm install --save @hai2007/tool
```

安装好了以后，然后引入你需要的工具：

- 动画轮播

```js
import animation from '@hai2007/tool/animation.js';
```

[<< 查看文档](./apis/animation.md)

- 列主序存储的4x4矩阵

```js
import Matrix4 from '@hai2007/tool/Matrix4.js';
```

[<< 查看文档](./apis/Matrix4.md)

- Hermite三次插值

```js
import Hermite from '@hai2007/tool/Hermite.js';
```

[<< 查看文档](./apis/Hermite.md)

- 获取值的类型

```js
import getType from '@hai2007/tool/getType.js';
```

[<< 查看文档](./apis/getType.md)

- 值类型判断方法

```js
import {
    isObject,
    isUndefined, isNull, isBoolean, isNumber, isString, isSymbol,
    isFunction, isArray, isError, isPlainObject,
    isElement, isAttribute, isText, isComment
} from '@hai2007/tool/type.js';
```

- 提供常用的DOM操作方法

```js
import xhtml from '@hai2007/tool/xhtml.js';
```

[<< 查看文档](./apis/xhtml.md)

- 获取键盘此时按下的键的组合结果

```js
import getKeyString from '@hai2007/tool/getKeyString.js';
```

[<< 查看文档](./apis/getKeyString.md)

## Special attention

如果你希望一下子引入全部方法，可以有如下方式引入：

```js
import tool from '@hai2007/tool';
```

或

```html
<script src='https://cdn.jsdelivr.net/npm/@hai2007/tool'></script>
```

如果是node.js环境，请使用这种方式引入：

```js
const tool = require('@hai2007/tool');
```

## ES笔记

- [理解prototype和__proto__（继承与原型链）](./notebook/prototype.md)
- [二进制数据（ArrayBuffer + TypedArray + DataView）](./notebook/ArrayBuffer-TypedArray-DataView.md)
- [Symbol + Generator函数 + Promise](./notebook/Symbol-Generator-Promise.md)

## 联系我们

- QQ: 2501482523
- Email: 2501482523@qq.com

开源协议
---------------------------------------
[MIT](https://github.com/hai2007/tool.js/blob/master/LICENSE)

Copyright (c) 2020-present [hai2007](https://hai2007.gitee.io/sweethome/) 走一步，再走一步。

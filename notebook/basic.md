JavaScript一些基本的概念和说明
======================

## 变量提升

> 温馨提示：严格模式不允许使用未声明的变量。

var定义的变量会先定义，全部定义完毕再赋值。

比如我们执行下面的语句：

```js
console.log(temp);
```

你会看见如下报错：

```js
VM47:1 Uncaught ReferenceError: temp is not defined
    at <anonymous>:1:13
```

我们把代码改一下：

```js
console.log(temp);
var temp='我爱你，中国！';
```

可以看见打印了```undefined```，没有报错，也没有打印```'我爱你，中国！'```。

其实修改后的代码相当于：

```js
var temp;
console.log(temp);
temp='我爱你，中国！';
```

再看个例子：

```js
console.log(temp);
function temp(){}
var temp='我爱你，中国！';
```

看看对应结果：

```js
ƒ temp(){}
```

这说明，和var一样，function定义的变量也会进行提升，都将被提到当前作用域的最顶部（但是不会初始化）；同时，函数声明的优先级大于变量声明的优先级（function>var）。

[<< 返回首页](../README.md)

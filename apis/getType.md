获取值的类型
======================

```js
var type=getType(input);
```

input表示需要判断类型的值。

type就是返回的类型结构，格式如下：

```js
['Basic'|'Object',typeValue]
```

是的，type是一个数组，type[0]的值有两种，分别表示基本类型和引用类型，type[1]表示具体的类型，按照分类有如下可能的结果：

- 基本数据类型：```Undefined|Null|Boolean|Number|String|Symbol```
- 引用类型：```Function|Array|Error|Plain```
- 结点类型：```Element|Attribute|Text|Comment```

最后，为了兼容后续升级，type[1]预留了值```"*"```，表示未识别类型，这种类型请不要使用。

[<< 返回首页](../README.md)

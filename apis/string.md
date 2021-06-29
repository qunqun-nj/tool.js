字符串操作
======================

### 字符串分析

```js
// express表示需要分析的原始字符串
var reader = ReadString(express);
```

执行后会返回一个用于辅助分析字符串的读取对象，此对象上有下列属性：

- ```index```：用于记录当前分析的位置，初始值为```-1```；
- ```currentChar```：用于记录当前分析的字符，初始值为```null```。

除此之外，还有下列方法：

- 读取下一个字符

```js
var char = reader.readNext();
```

- 获取往后num个值

```js
var nChar = reader.getNextN(num);
```

[<< 返回首页](../README.md)

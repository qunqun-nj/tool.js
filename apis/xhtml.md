提供常用的DOM操作方法
======================

- 阻止冒泡

```js
xhtml.stopPropagation(event);
```

- 阻止默认事件

```js
xhtml.preventDefault(event);
```

- 判断是否是结点

```js
xhtml.isNode(param);
```

- 绑定事件

```js
xhtml.bind(dom|domArray, eventType, callback);
```

- 去掉绑定事件

```js
xhtml.unbind(dom|domArray, eventType, handler);
```

- 在当前上下文context上查找结点

```js
// selectFun可选，返回boolean用以判断当前面对的结点是否保留(下同)
xhtml.find(context, selectFun, tagName);
```

- 寻找当前结点的孩子结点

```js
xhtml.children(dom, selectFun);
```

- 判断结点是否有指定class

```js
// clazzs可以是字符串或数组字符串
// notStrict可选，boolean值，默认false表示结点必须包含全部class,true表示至少包含一个即可
xhtml.hasClass(dom, clazzs, notStrict);
```

- 删除指定class

```js
xhtml.removeClass(dom, clazz);
```

- 添加指定class

```js
xhtml.addClass(dom, clazz);
```

- 字符串变成结点

```js
// isSvg可选，boolean值，默认false表示结点是html，为true表示svg类型
xhtml.toNode(string, isSvg);
```

- 主动触发事件

```js
xhtml.trigger(dom, eventType);
```

- 获取样式

```js
xhtml.getStyle(dom, name);
```

- 获取元素位置

```js
xhtml.offsetPosition(dom);
```

- 获取鼠标相对元素位置

```js
xhtml.mousePosition(dom, event);
```

- 删除结点

```js
xhtml.remove(dom);
```

- 设置多个样式

```js
xhtml.setStyles(dom, styleJson);
```

- 获取元素大小

```js
// type可选，默认border
xhtml.size(dom[, type]);

/*
type有如下可选：
1.content:内容
2.padding:内容+内边距
3.border:内容+内边距+边框
4.scroll:滚动的宽（不包括border）
*/
```

- 在被选元素内部的结尾插入内容

```js
var node = xhtml.append(el, template|node);
```

- 在被选元素内部的开头插入内容

```js
var node = xhtml.prepend(el, template|node);
```

- 在被选元素之后插入内容

```js
var node = xhtml.after(el, template|node);
```

- 在被选元素之前插入内容

```js
var node = xhtml.before(el, template|node);
```

[<< 返回首页](../README.md)

列主序存储的4x4矩阵
======================

Matrix4是一个列主序存储的4x4矩阵，使用该矩阵对象的第一步是像下面这样获取该对象，参数initMatrix4可选，你可以传递一个初始化矩阵或默认采用单位矩阵E初始化。

```
var matrix4=Matrix4(initMatrix4);
```

变换不是直接作用在具体的点上，而是先求解出一系列变换的变换矩阵，最后应用在具体点上。

### 基本运算

返回matrix4当前记录的内部矩阵：

```js
var val=matrix4.value();
```

比如采用默认值初始化的矩阵对象，打印结果如下：

```js
(16) [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
```

二个矩阵相乘：

```js
matrix4.multiply(newMatrix4[, flag]);
```

第一个参数应该是一个和value打印出来一样格式的一维数组，列主序存储。flag默认false，可不传，表示左乘，即newMatrix4 × matrix4，如果设置flag为true，表示右乘。

把变换矩阵作用在具体的点上：

```js
var position=matrix4.use(x, y, z, w);
```

矩阵的目的是对坐标进行变换，use方法返回齐次坐标(x, y, z, w)经过matrix4矩阵变换后的坐标值。其中z和w可以不传递，默认0和1，返回的坐标值是一个齐次坐标。

### 坐标变换

沿着向量(a, b, c)方向移动距离dis（其中c可以不传，默认0）：

```js
matrix4.move(dis, a, b, c);
```

以点(cx, cy, cz)为中心，分别在x、y和z方向上缩放xTimes、yTimes和zTimes倍（其中cx、cy和cz都可以不传递，默认0）：

```js
matrix4.scale(xTimes, yTimes, zTimes, cx, cy, cz);
```

围绕射线(a1, b1, c1) -> (a2, b2, c2)旋转deg度（方向由右手法则确定）：

```js
matrix4.rotate(deg, a1, b1, c1, a2, b2, c2);
```

a1、b1、c1、a2、b2和c2这6个值在设置的时候，不是一定需要全部设置，还有以下可选：

- 只设置了a1和b1，表示在xoy平面围绕（a1, b1）旋转。
- 设置三个点(设置不足六个点都认为只设置了三个点)，表示围绕从原点出发的射线旋转。

[<< 返回首页](../README.md)

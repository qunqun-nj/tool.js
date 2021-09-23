(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{29:function(e,a,p){var i=p(30);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,p(1).default)("data-quickpaper-76e21eb0",i,!0)},30:function(e,a,p){(e.exports=p(0)(!1)).push([e.i,"",""])},50:function(e,a,p){"use strict";p.r(a);var i={};p(29);i.render=function(e){return e("div",{class:"doc-view",quickpaper:"","data-quickpaper-76e21eb0":""},[e("header",{id:"fixed-top","data-quickpaper-76e21eb0":""},["列主序存储的4x4矩阵"]),e("pre",{"q-code":"","data-quickpaper-76e21eb0":""},["import Matrix4 from '@hai2007/tool/Matrix4.js';"]),e("p",{"data-quickpaper-76e21eb0":""},["Matrix4是一个列主序存储的4x4矩阵，使用该矩阵对象的第一步是像下面这样获取该对象，参数initMatrix4可选，你可以传递一个初始化矩阵或默认采用单位矩阵E初始化。"]),e("pre",{"q-code":"","data-quickpaper-76e21eb0":""},["var matrix4=Matrix4(initMatrix4);"]),e("p",{"data-quickpaper-76e21eb0":""},["变换不是直接作用在具体的点上，而是先求解出一系列变换的变换矩阵，最后应用在具体点上。"]),e("h2",{"data-quickpaper-76e21eb0":""},["基本运算"]),e("p",{"data-quickpaper-76e21eb0":""},["返回matrix4当前记录的内部矩阵："]),e("pre",{"q-code":"","data-quickpaper-76e21eb0":""},["var val=matrix4.value();"]),e("p",{"data-quickpaper-76e21eb0":""},["比如采用默认值初始化的矩阵对象，打印结果如下："]),e("pre",{"q-code":"","data-quickpaper-76e21eb0":""},["(16) [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]"]),e("p",{"data-quickpaper-76e21eb0":""},["两个矩阵相乘："]),e("pre",{"q-code":"","data-quickpaper-76e21eb0":""},["matrix4.multiply(newMatrix4[, flag]);"]),e("p",{"data-quickpaper-76e21eb0":""},["第一个参数应该是一个和value打印出来一样格式的一维数组，列主序存储。flag默认false，可不传，表示左乘，即newMatrix4 × matrix4，如果设置flag为true，表示右乘。"]),e("p",{"data-quickpaper-76e21eb0":""},["把变换矩阵作用在具体的点上："]),e("pre",{"q-code":"","data-quickpaper-76e21eb0":""},["var position=matrix4.use(x, y, z, w);"]),e("p",{"data-quickpaper-76e21eb0":""},["矩阵的目的是对坐标进行变换，use方法返回齐次坐标(x, y, z, w)经过matrix4矩阵变换后的坐标值。其中z和w可以不传递，默认0和1，返回的坐标值是一个齐次坐标。"]),e("h2",{"data-quickpaper-76e21eb0":""},["坐标变换"]),e("p",{"data-quickpaper-76e21eb0":""},["沿着向量(a, b, c)方向移动距离dis（其中c可以不传，默认0）："]),e("pre",{"q-code":"","data-quickpaper-76e21eb0":""},["matrix4.move(dis, a, b, c);"]),e("p",{"data-quickpaper-76e21eb0":""},["以点(cx, cy, cz)为中心，分别在x、y和z方向上缩放xTimes、yTimes和zTimes倍（其中cx、cy和cz都可以不传递，默认0）："]),e("pre",{"q-code":"","data-quickpaper-76e21eb0":""},["matrix4.scale(xTimes, yTimes, zTimes, cx, cy, cz);"]),e("p",{"data-quickpaper-76e21eb0":""},["围绕射线(a1, b1, c1) -> (a2, b2, c2)旋转deg度（方向由右手法则确定）："]),e("pre",{"q-code":"","data-quickpaper-76e21eb0":""},["matrix4.rotate(deg, a1, b1, c1, a2, b2, c2);"]),e("p",{"data-quickpaper-76e21eb0":""},["a1、b1、c1、a2、b2和c2这6个值在设置的时候，不是一定需要全部设置，还有以下可选："]),e("ul",{"data-quickpaper-76e21eb0":""},[e("li",{"data-quickpaper-76e21eb0":""},["1.只设置了a1和b1，表示在xoy平面围绕（a1, b1）旋转。"]),e("li",{"data-quickpaper-76e21eb0":""},["2.设置三个点(设置不足六个点都认为只设置了三个点)，表示围绕从原点出发的射线旋转"])])])};a.default=i}}]);
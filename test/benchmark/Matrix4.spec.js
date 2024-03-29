JSLitmus.test('旋转矩阵 - 2D旋转', function () {
    tool.Matrix4().rotate(Math.PI / 2, 2, 1).use(2, 0);
});
JSLitmus.test('旋转矩阵 - 来自圆心的射线旋转', function () {
    tool.Matrix4().rotate(Math.PI / 3 * 2, 1, 1, 1).use(0, 1, 0);
});
JSLitmus.test('旋转矩阵 - 任意射线旋转', function () {
    tool.Matrix4().rotate(Math.PI / 3 * 4, 1, 0, 1, 2, 1, 2).use(1, 1, 1);
});

JSLitmus.test('缩放矩阵', function () {
    tool.Matrix4().scale(1, 2, 7, 3, 4, 1).use(0, 0, 1);
});

JSLitmus.test('移动矩阵 - 平面移动', function () {
    tool.Matrix4().move(5, 3, 4).use(1, 2);
});
JSLitmus.test('移动矩阵 - 立体移动', function () {
    tool.Matrix4().move(5, 3, 4, 0).use(1, 1, 1);
});

JSLitmus.test('多变换矩阵', function () {
    tool.Matrix4().scale(0.5, 0.5, 0.5, 1, 0, 0).move(Math.sqrt(14), -1, -2, -3).rotate(Math.PI / 3 * 4, 1, 0, 1, 2, 1, 2).use(3, 6, 8);
});

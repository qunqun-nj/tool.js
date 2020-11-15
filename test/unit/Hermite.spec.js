QUnit.test('Hermite y=x(3次方)+1', 4, function () {

    var interpolate = tool.Hermite({
        // 使用斜率不调整的Hermite插值法求出回归曲线
        "u": 1
    }).setP(0, 1, 3, 28, 0, 27);

    equal(interpolate(0), 1);
    equal(interpolate(1), 2);
    equal(interpolate(2), 9);
    equal(interpolate(3), 28);

});

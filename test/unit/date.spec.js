QUnit.test('计算某月多少天', 3, function () {

    equal(tool.calcDays(2020, 2), 29);

    equal(tool.calcDays(2021, 3), 31);
    equal(tool.calcDays(2021, 2), 28);

});

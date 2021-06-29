QUnit.test('字符串操作-字符串分析', 6, function () {

    var reader = tool.ReadString('这是一段字符串');

    // 初始值是否正确
    equal(reader.index, -1);
    equal(reader.currentChar, null);

    // 读取
    equal(reader.readNext(), "这");
    equal(reader.getNextN(3), "这是一");

    reader.readNext();

    // 再次判断属性
    equal(reader.index, 1);
    equal(reader.currentChar, "是");

});

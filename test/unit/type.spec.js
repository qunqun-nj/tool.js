QUnit.test('类型判断-基本类型', 11, function () {

    equal(tool.isUndefined(), true, '');
    equal(tool.isUndefined(undefined), true, 'undefined');
    equal(tool.isNull(null), true, 'null');
    equal(tool.isBoolean(true), true, 'true');
    equal(tool.isBoolean(false), true, 'false');
    equal(tool.isNumber(-1), true, '-1');
    equal(tool.isNumber(0), true, '0');
    equal(tool.isNumber(1), true, '1');
    equal(tool.isString(""), true, '""');
    equal(tool.isString("str"), true, '"str"');
    equal(tool.isSymbol(Symbol()), true, 'Symbol()');

});

QUnit.test('类型判断-基本类型(引用类型)', 5, function () {

    equal(tool.isNumber(new Number(-1)), true, 'new Number(-1)');
    equal(tool.isNumber(new Number(0)), true, 'new Number(0)');
    equal(tool.isNumber(new Number(1)), true, 'new Number(1)');
    equal(tool.isString(new String("")), true, 'new String("")');
    equal(tool.isString(new String("str")), true, 'new String("str")');

});

QUnit.test('类型判断-引用类型', 6, function () {

    equal(tool.isFunction(function () { }), true, 'function () { }');
    equal(tool.isArray([]), true, '[]');
    equal(tool.isArray(new Array(1)), true, 'new Array(1)');
    equal(tool.isError(new Error()), true, 'new Error()');
    equal(tool.isPlainObject({}), true, '{}');
    equal(tool.isPlainObject(new Object()), true, 'new Object()');

});

QUnit.test('类型判断-结点类型', 2, function () {

    var div = document.getElementsByTagName('div')[0];
    equal(tool.isElement(div), true, 'div');

    // 补充
    equal(tool.isArray(div), false, 'isArray > div');

});

QUnit.test('获取类型-基本类型', 11, function () {
    deepEqual(tool.getType(), ["Basic", "Undefined"], '');
    deepEqual(tool.getType(undefined), ["Basic", "Undefined"], 'undefined');
    deepEqual(tool.getType(null), ["Basic", "Null"], 'null');
    deepEqual(tool.getType(true), ["Basic", "Boolean"], 'true');
    deepEqual(tool.getType(false), ["Basic", "Boolean"], 'false');
    deepEqual(tool.getType(-1), ["Basic", "Number"], '-1');
    deepEqual(tool.getType(0), ["Basic", "Number"], '0');
    deepEqual(tool.getType(1), ["Basic", "Number"], '1');
    deepEqual(tool.getType(""), ["Basic", "String"], '""');
    deepEqual(tool.getType("str"), ["Basic", "String"], '"str"');
    deepEqual(tool.getType(Symbol()), ["Basic", "Symbol"], 'Symbol()');

});

QUnit.test('获取类型-基本类型(引用类型)', 5, function () {
    deepEqual(tool.getType(new Number(-1)), ["Object", "Number"], 'new Number(-1)');
    deepEqual(tool.getType(new Number(0)), ["Object", "Number"], 'new Number(0)');
    deepEqual(tool.getType(new Number(1)), ["Object", "Number"], 'new Number(1)');
    deepEqual(tool.getType(new String("")), ["Object", "String"], 'new String("")');
    deepEqual(tool.getType(new String("str")), ["Object", "String"], 'new String("str")');

});

QUnit.test('获取类型-引用类型', 6, function () {
    deepEqual(tool.getType(function () { }), ["Object", "Function"], 'function(){}');
    deepEqual(tool.getType([]), ["Object", "Array"], '[]');
    deepEqual(tool.getType(new Array(1)), ["Object", "Array"], 'new Array(1)');
    deepEqual(tool.getType(new Error()), ["Object", "Error"], 'new Error()');
    deepEqual(tool.getType({}), ["Object", "Plain"], '{}');
    deepEqual(tool.getType(new Object), ["Object", "Plain"], 'new Object()');
});



QUnit.test('获取类型-结点类型', 1, function () {
    var div = document.getElementsByTagName('div')[0];
    deepEqual(tool.getType(div), ["Object", "Element"]);
});

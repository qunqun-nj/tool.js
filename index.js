import animation from './animation';
import Matrix4 from './Matrix4';
import Hermite from './Hermite';
import getType from './getType';

import {
    isUndefined, isNull, isBoolean, isNumber, isString, isSymbol,
    isFunction, isArray, isError, isPlainObject,
    isElement, isAttribute, isText, isComment
} from './type';

// 导出
var tool = {
    animation: animation,
    Matrix4: Matrix4,
    Hermite: Hermite,
    getType: getType,

    // 类型判断
    isUndefined: isUndefined, isNull: isNull, isBoolean: isBoolean, isNumber: isNumber, isString: isString, isSymbol: isSymbol,
    isFunction: isFunction, isArray: isArray, isError: isError, isPlainObject: isPlainObject,
    isElement: isElement, isAttribute: isAttribute, isText: isText, isComment: isComment

};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = tool;
} else {
    window.tool = tool;
}

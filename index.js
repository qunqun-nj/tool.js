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
let tool = {
    animation,
    Matrix4,
    Hermite,
    getType,

    // 类型判断
    isUndefined, isNull, isBoolean, isNumber, isString, isSymbol,
    isFunction, isArray, isError, isPlainObject,
    isElement, isAttribute, isText, isComment

};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = tool;
} else {
    window.tool = tool;
}

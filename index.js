import animation from './animation';
import Matrix4 from './Matrix4';
import Hermite from './Hermite';
import getType from './getType';

import {
    isUndefined, isNull, isBoolean, isNumber, isString, isSymbol,
    isFunction, isArray, isError, isPlainObject,
    isElement, isAttribute, isText, isComment
} from './type';

import xhtml from './xhtml';

import getKeyString from './getKeyString';

import ruler from './ruler';

import {
    ReadString
} from './string';

// 导出
var tool = {

    // 动画
    animation: animation,

    // 矩阵
    Matrix4: Matrix4,

    // 函数插值
    Hermite: Hermite,

    // 获取类型
    getType: getType,

    // 类型判断
    isUndefined: isUndefined, isNull: isNull, isBoolean: isBoolean, isNumber: isNumber, isString: isString, isSymbol: isSymbol,
    isFunction: isFunction, isArray: isArray, isError: isError, isPlainObject: isPlainObject,
    isElement: isElement, isAttribute: isAttribute, isText: isText, isComment: isComment,

    // DOM操作
    xhtml: xhtml,

    // 键盘按键
    getKeyString: getKeyString,

    // 刻度
    ruler: ruler,

    // 字符串
    ReadString: ReadString

};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = tool;
} else {
    window.tool = tool;
}

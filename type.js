import _isObject from './.inner/type/isObject';

import _isBoolean from './.inner/type/isBoolean';
import _isNumber from './.inner/type/isNumber';
import _isString from './.inner/type/isString';
import _isSymbol from './.inner/type/isSymbol';

import _isFunction from './.inner/type/isFunction';

import _isError from './.inner/type/isError';
import _isPlainObject from '././.inner/type/isPlainObject';

var domTypeHelp = function (types, value) {
    return value !== null && typeof value === 'object' &&
        types.indexOf(value.nodeType) > -1 &&
        !_isPlainObject(value);
};

/*!
 * 💡 - 值类型判断方法
 * https://github.com/hai2007/tool.js/blob/master/type.js
 *
 * author hai2007 < https://hai2007.gitee.io/sweethome >
 *
 * Copyright (c) 2020-present hai2007 走一步，再走一步。
 * Released under the MIT license
 */

export var isObject = _isObject;

// 基本类型
export var isUndefined = function (input) { return input === undefined };
export var isNull = function (input) { return input === null };
export var isBoolean = _isBoolean;
export var isNumber = _isNumber;
export var isString = _isString;
export var isSymbol = _isSymbol;

// 引用类型
export var isFunction = _isFunction;
export var isArray = function (input) { return Array.isArray(input) };
export var isError = _isError;
export var isPlainObject = _isPlainObject;

// 结点类型
export var isElement = function (input) { return domTypeHelp([1, 9, 11], input) };
export var isAttribute = function (input) { return domTypeHelp([2], input) };
export var isText = function (input) { return domTypeHelp([3], input) };
export var isComment = function (input) { return domTypeHelp([8], input) };

import _isObject from './.inner/type/isObject';

import _isBoolean from './.inner/type/isBoolean';
import _isNumber from './.inner/type/isNumber';
import _isString from './.inner/type/isString';
import _isSymbol from './.inner/type/isSymbol';

import _isFunction from './.inner/type/isFunction';

import _isError from './.inner/type/isError';
import _isPlainObject from '././.inner/type/isPlainObject';

let domTypeHelp = (types, value) => {
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

export let isObject = isObject;

// 基本类型
export let isUndefined = input => input === undefined;
export let isNull = input => input === null;
export let isBoolean = _isBoolean;
export let isNumber = _isNumber;
export let isString = _isString;
export let isSymbol = _isSymbol;

// 引用类型
export let isFunction = _isFunction;
export let isArray = input => Array.isArray(input);
export let isError = _isError;
export let isPlainObject = _isPlainObject;

// 结点类型
export let isElement = input => domTypeHelp([1, 9, 11], input);
export let isAttribute = input => domTypeHelp([2], input);
export let isText = input => domTypeHelp([3], input);
export let isComment = input => domTypeHelp([8], input);

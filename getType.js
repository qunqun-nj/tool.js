/*!
 * 💡 - 获取值的类型
 * https://github.com/hai2007/tool.js/blob/master/getType.js
 *
 * author hai2007 < https://hai2007.gitee.io/sweethome >
 *
 * Copyright (c) 2020-present hai2007 走一步，再走一步。
 * Released under the MIT license
 */

import isObject from './.inner/type/isObject';

import isBoolean from './.inner/type/isBoolean';
import isNumber from './.inner/type/isNumber';
import isString from './.inner/type/isString';
import isSymbol from './.inner/type/isSymbol';

import isFunction from './.inner/type/isFunction';

import isError from './.inner/type/isError';
import isPlainObject from '././.inner/type/isPlainObject';

/**
 * [
 *  种类：Basic|Object
 *  类型:
 *      // 基本数据类型
 *      Undefined|Null|Boolean|Number|String|Symbol
 *
 *      // 引用类型
 *      Function|Array|Error|Plain
 *
 *      // 结点类型
 *      Element|Attribute|Text|Comment
 *
 *      // 未识别类型(这种类型请不要使用，这是为了未来扩展类型的时候使用的)
 *      *
 * ]
 */

export default function (input) {

    // 首先，判断是不是对象（朴素对象plain也是对象），具体类型设置为，未定义
    let result = [isObject(input) ? "Object" : "Basic", "*"];

    // 基本类型
    if (input === undefined) result[1] = 'Undefined';
    else if (input === null) result[1] = 'Null';
    else if (isBoolean(input)) result[1] = 'Boolean';
    else if (isNumber(input)) result[1] = 'Number';
    else if (isString(input)) result[1] = 'String';
    else if (isSymbol(input)) result[1] = 'Symbol';

    // 引用类型
    else if (isFunction(input)) result[1] = 'Function';
    else if (Array.isArray(input)) result[1] = 'Array'; // 一个类似数组的类型没有被统计进来
    else if (isError(input)) result[1] = 'Error';
    else if (isPlainObject(input)) result[1] = 'Plain';

    else {

        if (typeof input === 'object') {

            // 结点类型
            // 这首先不能是一个Plain或null，需要特别注意一下
            if (input.nodeType === 3) result[1] = 'Text'; // 文本
            else if (input.nodeType === 1 || input.nodeType === 9 || input.nodeType === 11) result[1] = 'Element'; // 结点
            else if (input.nodeType === 2) result[1] = 'Attribute'; // 属性
            else if (input.nodeType === 8) result[1] = 'Comment'; // 注释

        }

    }

    return result;
};

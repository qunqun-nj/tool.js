import getType from './getType';
import isObject from './isObject';

/**
 * 判断一个值是不是Function。
 *
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是Function返回true，否则返回false
 */
export default function (value) {
    if (!isObject(value)) {
        return false;
    }

    const type = getType(value);
    return type === '[object Function]' || type === '[object AsyncFunction]' ||
        type === '[object GeneratorFunction]' || type === '[object Proxy]';
};

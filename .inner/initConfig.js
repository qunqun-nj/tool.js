/**
 * 初始化配置文件
 *
 * @param {Json} init 默认值
 * @param {Json} data
 * @return {Json}
 */
export default function (init, data) {
    for (let key in data)
        try {
            init[key] = data[key];
        } catch (e) {
            throw new Error("Illegal property value！");
        }
    return init;
};

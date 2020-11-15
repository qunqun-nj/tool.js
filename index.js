import animation from './animation';
import Matrix4 from './Matrix4';
import Hermite from './Hermite';

// 导出
let tool = {
    animation,
    Matrix4,
    Hermite
};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = tool;
} else {
    window.tool = tool;
}

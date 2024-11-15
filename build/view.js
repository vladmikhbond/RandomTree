var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _View_instances, _a, _View_rDrawTree;
class View {
    constructor(tree) {
        _View_instances.add(this);
        this.rndTree = tree;
        // приведення контексту до шкільної системи координат
        _a.ctx = _a.canvas.getContext("2d");
        _a.ctx.translate(0, _a.canvas.height);
        _a.ctx.scale(1, -1);
    }
    drawTree(age = 0) {
        _a.ctx.clearRect(0, 0, _a.canvas.width, _a.canvas.height);
        __classPrivateFieldGet(this, _View_instances, "m", _View_rDrawTree).call(this, this.rndTree.base, this.rndTree.maxDepth - age - 1);
    }
}
_a = View, _View_instances = new WeakSet(), _View_rDrawTree = function _View_rDrawTree(b, levLimit) {
    if (b.level <= levLimit)
        return;
    // чим гілка вище, тим молодше 
    let visualAge = b.level - levLimit;
    // визначення товщини (емпірічно)
    _a.ctx.lineWidth = 0.05 * (visualAge + 1) ** 2;
    _a.ctx.beginPath();
    _a.ctx.moveTo(b.x, b.y);
    _a.ctx.lineTo(b.xEnd, b.yEnd);
    _a.ctx.stroke();
    if (visualAge == 1) {
        lives(b);
    }
    if (b.sons[0])
        __classPrivateFieldGet(this, _View_instances, "m", _View_rDrawTree).call(this, b.sons[0], levLimit);
    if (b.sons[1])
        __classPrivateFieldGet(this, _View_instances, "m", _View_rDrawTree).call(this, b.sons[1], levLimit);
    // Внутрішня функція - малює листя не гільці 
    function lives(b) {
        let n = 7;
        let dx = (b.xEnd - b.x) / n, dy = (b.yEnd - b.y) / n;
        _a.ctx.fillStyle = 'green';
        _a.ctx.beginPath();
        for (let i = n / 2; i <= n; i++) {
            let x = b.x + dx * i, y = b.y + dy * i;
            let noiseX = Math.random() * 6 - 3, noiseY = Math.random() * 6 - 3;
            _a.ctx.arc(x + noiseX, y + noiseY, 2, 0, 6.29);
        }
        _a.ctx.fill();
    }
};
View.canvas = document.getElementById("canvas");
export default View;

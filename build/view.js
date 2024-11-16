var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _View_instances, _View_rDrawTree;
class View {
    constructor(tree) {
        _View_instances.add(this);
        this.rndTree = tree;
        // приведення контексту до шкільної системи координат
        View.ctx = View.canvas.getContext("2d");
        View.ctx.translate(0, View.canvas.height);
        View.ctx.scale(1, -1);
    }
    drawTree(age = 0) {
        View.ctx.clearRect(0, 0, View.canvas.width, View.canvas.height);
        __classPrivateFieldGet(this, _View_instances, "m", _View_rDrawTree).call(this, this.rndTree.base, this.rndTree.maxDepth - age - 1);
    }
    // Малює гілку 
    drawTrunk(b, visualAge) {
        View.ctx.strokeStyle = 'brown';
        View.ctx.lineCap = "round";
        // визначення товщини (емпірічно)
        let width = 0.05 * (visualAge + 1) ** 2;
        let n = 6;
        let dx = (b.xEnd - b.x) / n, dy = (b.yEnd - b.y) / n, dw = (width - 0.05 * (visualAge) ** 2) / n;
        View.ctx.lineWidth = width;
        for (let i = 0; i < n; i++) {
            let x = b.x + dx * i, y = b.y + dy * i, w = width - dw * i;
            View.ctx.lineWidth = w;
            View.ctx.beginPath();
            View.ctx.moveTo(x, y);
            View.ctx.lineTo(x + dx, y + dy);
            View.ctx.stroke();
        }
    }
    // Малює листя на гільці 
    drawLeaves(b, visualAge) {
        if (visualAge > 1)
            return;
        let n = 7;
        let dx = (b.xEnd - b.x) / n, dy = (b.yEnd - b.y) / n;
        View.ctx.fillStyle = 'green';
        View.ctx.beginPath();
        for (let i = n / 2; i <= n; i++) {
            let x = b.x + dx * i, y = b.y + dy * i;
            let noiseX = Math.random() * 6 - 3, noiseY = Math.random() * 6 - 3;
            View.ctx.arc(x + noiseX, y + noiseY, 2, 0, 2 * Math.PI);
        }
        View.ctx.fill();
    }
}
_View_instances = new WeakSet(), _View_rDrawTree = function _View_rDrawTree(b, levLimit) {
    if (b.level <= levLimit)
        return;
    // чим гілка вище, тим молодше 
    let visualAge = b.level - levLimit;
    this.drawTrunk(b, visualAge);
    this.drawLeaves(b, visualAge);
    if (b.sons[0])
        __classPrivateFieldGet(this, _View_instances, "m", _View_rDrawTree).call(this, b.sons[0], levLimit);
    if (b.sons[1])
        __classPrivateFieldGet(this, _View_instances, "m", _View_rDrawTree).call(this, b.sons[1], levLimit);
};
View.canvas = document.getElementById("canvas");
export default View;

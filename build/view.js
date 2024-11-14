class View {
    constructor(tree) {
        View.ctx = View.canvas.getContext("2d");
        View.ctx.translate(0, View.canvas.height);
        View.ctx.scale(1, -1);
        this.rndTree = tree;
    }
    draw() {
        View.ctx.clearRect(0, 0, View.canvas.width, View.canvas.height);
        this.drawRec(this.rndTree.root);
    }
    drawRec(b) {
        let dx = b.size * Math.cos(b.angle);
        let dy = b.size * Math.sin(b.angle);
        View.ctx.beginPath();
        View.ctx.moveTo(b.x, b.y);
        View.ctx.lineTo(b.x + dx, b.y + dy);
        View.ctx.stroke();
        if (b.sons[0])
            this.drawRec(b.sons[0]);
        if (b.sons[1])
            this.drawRec(b.sons[1]);
    }
}
View.canvas = document.getElementById("canvas");
export default View;

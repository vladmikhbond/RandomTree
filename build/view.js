export default class View {
    constructor(tree) {
        const canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.ctx.translate(0, canvas.height);
        this.ctx.scale(1, -1);
        this.tree = tree;
    }
    draw() {
        this.drawRec(this.tree.root);
    }
    drawRec(b) {
        let dx = b.size * Math.cos(b.angle);
        let dy = b.size * Math.sin(b.angle);
        this.ctx.beginPath();
        this.ctx.moveTo(b.x, b.y);
        this.ctx.lineTo(b.x + dx, b.y + dy);
        this.ctx.stroke();
        if (b.sons[0])
            this.drawRec(b.sons[0]);
        if (b.sons[1])
            this.drawRec(b.sons[1]);
    }
}

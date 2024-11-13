export class Branch {
    constructor(size, angle, x, y, level) {
        this.sons = [];
        this.size = size;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.level = level;
    }
    grow() {
        if (this.level == 0)
            return;
        let angle1 = this.angle + Math.PI / 4;
        let angle2 = this.angle - Math.PI / 4;
        let x1 = this.size * Math.cos(angle1);
        let y1 = this.size * Math.sin(angle1);
        let b1 = new Branch(this.size * 0.9, angle1, x1, y1, this.level - 1);
        b1.grow();
        let x2 = this.size * Math.cos(angle2);
        let y2 = this.size * Math.sin(angle2);
        let b2 = new Branch(this.size * 0.9, angle2, x2, y2, this.level - 1);
        b2.grow();
        this.sons = [b1, b2];
    }
}
export class RndTree {
    constructor(maxDepth, rootSize, x, y) {
        this.root = new Branch(rootSize, Math.PI / 2, x, y, maxDepth);
        this.root.grow();
    }
}

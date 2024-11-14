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
        let x = this.x + this.size * Math.cos(this.angle);
        let y = this.y + this.size * Math.sin(this.angle);
        let size = this.size * RndTree.R;
        let level = this.level - 1;
        const growTree = (alpha) => {
            let branch = new Branch(size, this.angle + alpha, x, y, level);
            branch.grow();
            return branch;
        };
        switch (RndTree.variant()) {
            case '|':
                this.sons[0] = growTree(0);
                break;
            case '\|':
                this.sons[0] = growTree(-RndTree.V);
                this.sons[1] = growTree(0);
                break;
            case '|/':
                this.sons[0] = growTree(0);
                this.sons[1] = growTree(RndTree.V);
                break;
            case '\/':
                this.sons[0] = growTree(-RndTree.V);
                this.sons[1] = growTree(RndTree.V);
                break;
        }
    }
    print(shift) {
        var _a, _b;
        console.log(shift, `lev:${this.level} x:${this.x}  y:${this.y} size${this.size} angle:${this.angle}`);
        if (this.level == 0)
            return;
        (_a = this.sons[0]) === null || _a === void 0 ? void 0 : _a.print(shift + "    ");
        console.log();
        (_b = this.sons[1]) === null || _b === void 0 ? void 0 : _b.print(shift + "    ");
    }
}
export class RndTree {
    static variant() {
        let rnd = Math.random();
        let prob = 0;
        for (let i = 0; i < RndTree.P.length; i++) {
            prob += RndTree.P[i];
            if (rnd <= prob)
                return ['|', '|/', '\|', '\/'][i];
        }
    }
    constructor(maxDepth, rootSize, x, y, R, V, P) {
        RndTree.R = R;
        RndTree.V = V;
        RndTree.P = P;
        this.root = new Branch(rootSize, Math.PI / 2, x, y, maxDepth);
        this.root.grow();
    }
}

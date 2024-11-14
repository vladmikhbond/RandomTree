import RndTree from "./RndTree.js";
export default class Branch {
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
        let size = this.size * RndTree.REDUCTION;
        const nextLevel = (level) => {
            let rnd = Math.random();
            return rnd < 0.2 ? 0 : level - 1;
        };
        const growTree = (alpha) => {
            let branch = new Branch(size, this.angle + alpha, x, y, nextLevel(this.level));
            branch.grow();
            return branch;
        };
        switch (RndTree.variant()) {
            case 0: // '|' 
                this.sons[0] = growTree(0);
                break;
            case 1: // '\|'  
                this.sons[0] = growTree(RndTree.V_ANGLE);
                this.sons[1] = growTree(0);
                break;
            case 2: // '|/'
                this.sons[0] = growTree(0);
                this.sons[1] = growTree(-RndTree.V_ANGLE);
                break;
            case 3: //'\/'
                this.sons[0] = growTree(-RndTree.V_ANGLE);
                this.sons[1] = growTree(RndTree.V_ANGLE);
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

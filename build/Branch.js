import RndTree from "./RndTree.js";
// Гілка випадкового дерева
//
export default class Branch {
    constructor(size, angle, x, y, age, color = 'rgb(143, 67, 13);') {
        this.sons = [];
        this.size = size;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.age = age;
        this.color = color;
    }
    // Протилежний кінець гілки
    //
    get xEnd() { return this.x + this.size * Math.cos(this.angle); }
    get yEnd() { return this.y + this.size * Math.sin(this.angle); }
    // Рекурсивно вирощує дерево з гілки this 
    //
    rGrow() {
        if (this.age == 0)
            return;
        // Внутрішня функція - визначає рівень наступного покоління гілок
        function nextAge(father) {
            let next = Math.random() < 0.5 ? father.age - 2 : father.age - 1;
            return next < 0 ? 0 : next;
        }
        // Внутрішня функція - визначає рівень наступного покоління гілок
        function nextColor(father) {
            if (Math.random() < 0.4) {
                let red = 64 + Math.random() * 128 | 0;
                return `rgb(${red}, ${100}, ${0})`;
            }
            return father.color;
        }
        // Внутрішня функція - створює гілку, яка продовжує гілку this і має заданий кут нахилу
        const rSubTree = (alpha) => {
            let branch = new Branch(this.size * RndTree.REDUCTION, this.angle + alpha, this.xEnd, this.yEnd, nextAge(this), nextColor(this));
            branch.rGrow();
            return branch;
        };
        switch (RndTree.variant()) {
            case 0: // '|' 
                this.sons[0] = rSubTree(0);
                break;
            case 1: // '\|'  
                this.sons[0] = rSubTree(RndTree.V_ANGLE);
                this.sons[1] = rSubTree(0);
                break;
            case 2: // '|/'
                this.sons[0] = rSubTree(0);
                this.sons[1] = rSubTree(-RndTree.V_ANGLE);
                break;
            case 3: // '\/'
                this.sons[0] = rSubTree(-RndTree.V_ANGLE);
                this.sons[1] = rSubTree(RndTree.V_ANGLE);
                break;
        }
    }
    // Текстове подання дерева
    //
    toString(shift) {
        var _a, _b;
        console.log(shift, `lev:${this.age} x:${this.x}  y:${this.y} size${this.size} angle:${this.angle}`);
        if (this.age == 0)
            return;
        (_a = this.sons[0]) === null || _a === void 0 ? void 0 : _a.toString(shift + "    ");
        console.log();
        (_b = this.sons[1]) === null || _b === void 0 ? void 0 : _b.toString(shift + "    ");
    }
}

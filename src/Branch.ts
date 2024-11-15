import RndTree from "./RndTree.js";

// Гілка випадкового дерева
//
export default class Branch 
{    
    x: number;
    y: number;
    size: number;
    angle: number;
    sons: Branch[] = [];
  
    // звороний рівень гілки (на горі він найменший = 0)
    level: number;

    constructor(size: number, angle: number, x: number, y: number, level: number) {
        this.size = size;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.level = level;
    }

    // Протилежний кінець гілки
    //
    get xEnd() { return this.x + this.size * Math.cos(this.angle); }    
    get yEnd() { return this.y + this.size * Math.sin(this.angle); }

    // Рекурсивно вирощує дерево з гілки this 
    //
    rGrow() {
        if (this.level == 0)
            return;
        
        // Внутрішня функція - визначає рівень наступного покоління гілок
        function nextLevel(level: number) {
            let next = Math.random() < 0.5 ? level - 2 : level - 1;
            return next < 0 ? 0 : next;
        }

        // Внутрішня функція - створює гілку, яка продовжує гілку this і має заданий кут нахилу
        const rSubTree = (alpha: number) => {
            let branch = new Branch(
                this.size * RndTree.REDUCTION, 
                this.angle + alpha, 
                this.xEnd, this.yEnd, 
                nextLevel(this.level));
            branch.rGrow();
            return branch;
        }
        
        switch(RndTree.variant()) 
        {
            case 0 : // '|' 
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

    // Тестове подання дерева
    //
    rPrint(shift: string) {
        console.log(shift, 
            `lev:${this.level} x:${this.x}  y:${this.y} size${this.size} angle:${this.angle}`);
        if (this.level == 0) 
            return;
        this.sons[0]?.rPrint(shift + "    ");
        console.log();
        this.sons[1]?.rPrint(shift + "    ");
    }
    
}


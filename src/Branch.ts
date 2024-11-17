import RndTree from "./RndTree.js";

// Гілка випадкового дерева
//
export default class Branch 
{    
    size: number;
    angle: number;
    x: number;
    y: number;
    // вік гілки або зворотний рівень
    age: number;
    color: string;
    sons: Branch[] = [];
    tree: RndTree;


    constructor(size: number, angle: number, x: number, y: number, age: number, color: string, tree: RndTree) {
        this.size = size;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.age = age;
        this.color = color;
        this.tree = tree;
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
        
        // Внутрішня функція - визначає вік наступного покоління гілок
        function nextAge(father: Branch) {
            let next = Math.random() < 0.5 ? father.age - 2 : father.age - 1;
            return next < 0 ? 0 : next;
        }

        // Внутрішня функція - визначає колір наступного покоління гілок
        function nextColor(father: Branch) {
            if (Math.random() < 0.4) {
                let red = 64 + Math.random() * 100 | 0;
                return  `rgb(${red}, ${64}, ${0})`; 
            }
            return father.color;
           
        }

        // Внутрішня функція - створює гілку, яка продовжує гілку this і має заданий кут нахилу
        const rSubTree = (alpha: number) => {
            let branch = new Branch(
                this.size * this.tree.reduction, 
                this.angle + alpha, 
                this.xEnd, this.yEnd, 
                nextAge(this),
                nextColor(this),
                this.tree,
            );
            branch.rGrow();
            return branch;
        }
        
        switch(this.tree.variant()) 
        {
            case 0 : // '|' 
                this.sons[0] = rSubTree(0);  
                break;
            case 1: // '\|'  
                this.sons[0] = rSubTree(this.tree.forkAngle); 
                this.sons[1] = rSubTree(0);
                break;
            case 2: // '|/'
                this.sons[0] = rSubTree(0); 
                this.sons[1] = rSubTree(-this.tree.forkAngle);
                break;
            case 3: // '\/'
                this.sons[0] = rSubTree(-this.tree.forkAngle); 
                this.sons[1] = rSubTree(this.tree.forkAngle);
                break;
        }
    }

    // Текстове подання дерева
    //
    toString(shift: string) {
        console.log(shift, 
            `lev:${this.age} x:${this.x}  y:${this.y} size${this.size} angle:${this.angle}`);
        if (this.age == 0) 
            return;
        this.sons[0]?.toString(shift + "    ");
        console.log();
        this.sons[1]?.toString(shift + "    ");
    }
    
}


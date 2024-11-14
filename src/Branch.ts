import RndTree from "./RndTree.js";

export default class Branch 
{    
    x: number;
    y: number;
    size: number;
    angle: number;
    sons: Branch[] = [];
    
    level: number;

    constructor(size: number, angle: number, x: number, y: number, level: number) {
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
        
        const nextLevel = (level: number) => {
            let rnd = Math.random();
            let next = rnd < 0.5 ? level - 2 : level - 1;
            if (next < 0) next = 0;
            return next;
        }

        const growTree = (alpha: number) => {
            let branch = new Branch(size, this.angle + alpha, x, y, nextLevel(this.level));
            branch.grow();
            return branch;
        }
        
        switch(RndTree.variant()) 
        {
            case 0 : // '|' 
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


    print(shift: string) {
        console.log(shift, `lev:${this.level} x:${this.x}  y:${this.y} size${this.size} angle:${this.angle}`);
        if (this.level == 0) 
            return;
        this.sons[0]?.print(shift + "    ");
        console.log();
        this.sons[1]?.print(shift + "    ");
    }
    
}


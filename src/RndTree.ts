export class Branch 
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

    print(shift: string) {
        console.log(shift, this.level, this.angle);
        if (this.level == 0) 
            return;
        this.sons[0].print(shift + "    ");
        console.log();
        this.sons[1].print(shift + "    ");
    }
    
}

export class RndTree 
{
    root: Branch;
    constructor(maxDepth: number, rootSize: number, x: number, y: number) {

       this.root = new Branch(rootSize, Math.PI / 2, x, y, maxDepth);
       this.root.grow();
    }  

}



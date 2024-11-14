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

    static variant() {
        let P = [0.25, 0.25, 0.25, 0.25];
        let rnd = Math.random();
        let prob = 0;
        for (let i = 0; i < P.length; i++) {
            prob += P[i];
            if (rnd <= prob) return i;
        }
    }
    

    grow() {
        const alpha = Math.PI / 6
        if (this.level == 0)
            return;
        let xEnd = this.x + this.size * Math.cos(this.angle);
        let yEnd = this.y + this.size * Math.sin(this.angle);

        
        // left
        let angle1 = this.angle + alpha;
        let b1 = new Branch(this.size * 0.9, angle1, xEnd, yEnd, this.level - 1);
        b1.grow();

        // right
        let angle2 = this.angle - alpha;
        let b2 = new Branch(this.size * 0.9, angle2, xEnd, yEnd, this.level - 1);
        b2.grow();
        
        this.sons = [b1, b2]; 
    }

    print(shift: string) {
        console.log(shift, `lev:${this.level} x:${this.x}  y:${this.y} size${this.size} angle:${this.angle}`);
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



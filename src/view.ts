import RndTree from "./RndTree.js";
import Branch from "./Branch.js";

export default class View
{
    static canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");

    static ctx: CanvasRenderingContext2D;
    rndTree: RndTree;

    constructor(tree:RndTree) {
        
        View.ctx = <CanvasRenderingContext2D>View.canvas.getContext("2d");
        View.ctx.translate(0, View.canvas.height);
        View.ctx.scale(1, -1);

        this.rndTree = tree;
    }

    draw(l=0) {
        View.ctx.clearRect(0, 0, View.canvas.width, View.canvas.height);
        this.rdraw(this.rndTree.root, l);
    }

    rdraw(b: Branch, oldest: number) {
        if (b.level <= oldest) 
            return;
        let dx = b.size * Math.cos(b.angle);
        let dy = b.size * Math.sin(b.angle);

        View.ctx.lineWidth = 0.05 * (b.level - oldest + 1)**2;
        View.ctx.beginPath();
        View.ctx.moveTo(b.x, b.y);
        View.ctx.lineTo(b.x + dx, b.y + dy);
        View.ctx.stroke();

        if (b.sons[0]) this.rdraw(b.sons[0], oldest);
        if (b.sons[1]) this.rdraw(b.sons[1], oldest);        
    }
}


//     ctx.lineWidth = 0.05 * depth ** 2;
//     let col = ['black', 'red', 'green', 'blue'][(D - depth) % 4];
//     ctx.strokeStyle = col;

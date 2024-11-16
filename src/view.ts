import RndTree from "./RndTree.js";
import Branch from "./Branch.js";

export default class View
{
    static canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    static ctx: CanvasRenderingContext2D;

    rndTree: RndTree;

    constructor(tree:RndTree) {
        this.rndTree = tree;

        // приведення контексту до шкільної системи координат
        View.ctx = <CanvasRenderingContext2D>View.canvas.getContext("2d");
        View.ctx.translate(0, View.canvas.height);
        View.ctx.scale(1, -1);
    }


    drawTree(age=0) {
        View.ctx.clearRect(0, 0, View.canvas.width, View.canvas.height);
        this.#rDrawTree(this.rndTree.base!, this.rndTree.maxDepth - age - 1);
    }


    #rDrawTree(b: Branch, levLimit: number) {
        if (b.level <= levLimit) 
            return;
        
        // чим гілка вище, тим молодше 
        let visualAge = b.level - levLimit;
 
        // // визначення товщини (емпірічно)
        // View.ctx.lineWidth = 0.05 * (visualAge + 1)**2;

        // View.ctx.beginPath();
        // View.ctx.moveTo(b.x, b.y);
        // View.ctx.lineTo(b.xEnd, b.yEnd);
        // View.ctx.stroke();

        trunk(b);
        if (visualAge == 1 ) {
            lives(b);
        }

        if (b.sons[0]) this.#rDrawTree(b.sons[0], levLimit);
        if (b.sons[1]) this.#rDrawTree(b.sons[1], levLimit);        

        // Внутрішня функція - малює гілку 
        function trunk(b: Branch) {
            View.ctx.strokeStyle = 'brown';
            View.ctx.lineCap = "round";
            // визначення товщини (емпірічно)
            let width = 0.05 * (visualAge + 1)**2;
            let n = 6;
            let dx = (b.xEnd - b.x)/n, 
                dy = (b.yEnd - b.y)/n,
                dw = (width - 0.05 * (visualAge)**2) / n;

            View.ctx.lineWidth = width;
            for (let i = 0; i < n; i++) {
                let x = b.x + dx * i, y = b.y + dy * i, w = width - dw * i;
                View.ctx.lineWidth = w;
                View.ctx.beginPath();
                View.ctx.moveTo(x, y);
                View.ctx.lineTo(x + dx, y + dy);
                View.ctx.stroke();
            }

        }
        // Внутрішня функція - малює листя не гільці 
        function lives(b: Branch) {
            let n = 7;
            let dx = (b.xEnd - b.x)/n, 
                dy = (b.yEnd - b.y)/n;

            View.ctx.fillStyle = 'green';
            View.ctx.beginPath(); 
            for (let i = n/2; i <= n; i++) {
                let x = b.x + dx * i, y = b.y + dy * i;
                let noiseX = Math.random() * 6 - 3, noiseY = Math.random() * 6 - 3;
                View.ctx.arc(x + noiseX, y + noiseY, 2, 0, 2*Math.PI);
            }
            View.ctx.fill();
        }
        

    }
}

class View {
    constructor(tree) {
        View.ctx = View.canvas.getContext("2d");
        View.ctx.translate(0, View.canvas.height);
        View.ctx.scale(1, -1);
        this.rndTree = tree;
    }
    draw(age = 0) {
        View.ctx.clearRect(0, 0, View.canvas.width, View.canvas.height);
        this.rdraw(this.rndTree.root, this.rndTree.maxDepth - age - 1);
    }
    rdraw(b, levLimit) {
        if (b.level <= levLimit)
            return;
        let visualAge = b.level - levLimit;
        View.ctx.lineWidth = 0.05 * (visualAge + 1) ** 2;
        View.ctx.beginPath();
        View.ctx.moveTo(b.x, b.y);
        View.ctx.lineTo(b.xEnd, b.yEnd);
        View.ctx.stroke();
        if (visualAge == 1) { //&& b.level <= 3
            lives(b);
        }
        if (b.sons[0])
            this.rdraw(b.sons[0], levLimit);
        if (b.sons[1])
            this.rdraw(b.sons[1], levLimit);
        function lives(b) {
            let n = 7;
            let dx = (b.xEnd - b.x) / n, dy = (b.yEnd - b.y) / n;
            View.ctx.fillStyle = 'green';
            View.ctx.beginPath();
            for (let i = n / 2; i <= n; i++) {
                let x = b.x + dx * i, y = b.y + dy * i;
                let noiseX = Math.random() * 6 - 3, noiseY = Math.random() * 6 - 3;
                View.ctx.arc(x + noiseX, y + noiseY, 2, 0, 6.29);
            }
            View.ctx.fill();
        }
    }
}
View.canvas = document.getElementById("canvas");
export default View;

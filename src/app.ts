import RndTree from "./RndTree.js";
import View from "./view.js";


let tree = new RndTree(
    10, 50, 
    200, 0, 
    0.90, Math.PI/7, [1,1,1,1]
);
tree.grow();
let view = new View(tree);
//tree.root.print("   ");
view.draw();

const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
canvas.addEventListener('click', () => {
    tree.grow();
    view.draw();
});


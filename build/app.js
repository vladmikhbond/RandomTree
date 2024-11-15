import RndTree from "./RndTree.js";
import View from "./view.js";
let rTree = new RndTree(16, 50, 200, 0, 0.90, Math.PI / 7, [1, 1, 1, 1]);
let view = new View(rTree);
let canvas = document.getElementById("canvas");
canvas.addEventListener('click', () => {
    rTree.grow();
    for (let oldest = rTree.maxDepth; oldest > 0; oldest--) {
        setTimeout(() => view.draw(oldest), 200 * (rTree.maxDepth - oldest));
    }
});
//canvas.dispatchEvent(new Event('click'));

import RndTree from "./RndTree.js";
import View from "./view.js";
let rTree = new RndTree(16, 50, 200, 0, 0.90, Math.PI / 7, [1, 1, 1, 1]);
let view = new View(rTree);
let canvas = document.getElementById("canvas");
// rTree.grow();
// view.draw(5);
canvas.addEventListener('click', () => {
    rTree.grow();
    for (let age = 1; age < rTree.maxDepth; age++) {
        let timeSpan = 500 * age;
        setTimeout(() => view.drawTree(age), timeSpan);
    }
});
canvas.dispatchEvent(new Event('click'));

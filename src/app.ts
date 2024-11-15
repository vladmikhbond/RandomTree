import RndTree from "./RndTree.js";
import View from "./view.js";

let rndTree = new RndTree(
    16, 50, 
    200, 0, 
    0.90, Math.PI/7, [1,1,1,1]
);
let view = new View(rndTree);
let canvas = document.getElementById("canvas")!;

canvas.addEventListener('click', () => {
    let maxDepth = <HTMLInputElement>document.getElementById('maxDepth')!;
    rndTree.maxDepth = +maxDepth.value;
    rndTree.grow();
    for (let age = 1; age < rndTree.maxDepth; age++) {
        let timeSpan = 500 * age ;
        setTimeout( () => {
            view.drawTree(age);
            maxDepth.value = (age + 1).toString();
        }, timeSpan );
    }
});

canvas.dispatchEvent(new Event('click'));



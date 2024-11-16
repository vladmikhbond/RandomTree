import RndTree from "./RndTree.js";
import View from "./view.js";

const rndTree = new RndTree(
    16, 50, 
    200, 0, 
    0.90, Math.PI/7, [1,1,1,1]
);
const view = new View(rndTree);
const canvas = document.getElementById("canvas")!;


canvas.addEventListener('click', () => {
    const MSEC = 200;
    let maxAge = <HTMLInputElement>document.getElementById('maxAge')!;
    rndTree.maxAge = +maxAge.value;
    rndTree.grow();
    for (let year = 0; year < rndTree.maxAge; year++) {
        let timeSpan = MSEC * year ;
        setTimeout( () => {
            view.drawTree(year);
            maxAge.value = (year + 1).toString();
        }, timeSpan );
    }
});

canvas.dispatchEvent(new Event('click'));




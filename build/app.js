import RndTree from "./RndTree.js";
import View from "./view.js";
let maxAge = document.getElementById('maxAge');
let params = document.getElementById('params');
const rndTree = new RndTree();
const view = new View(rndTree);
const canvas = document.getElementById("canvas");
const MSEC = 200;
canvas.addEventListener('click', () => {
    setTreeProps(rndTree);
    rndTree.grow();
    for (let year = 0; year < rndTree.maxAge; year++) {
        let timeSpan = MSEC * year;
        setTimeout(() => {
            view.drawTree(year);
            maxAge.value = (year + 1).toString();
        }, timeSpan);
    }
});
canvas.dispatchEvent(new Event('click'));
function setTreeProps(rndTree) {
    rndTree.maxAge = +maxAge.value;
    let o = JSON.parse('{' + params.value + '}');
    rndTree.baseSize = o.baseSize;
    // нормалізуємо вірогідності
    let sum = o.probs.reduce((a, x) => a + x);
    rndTree.forkProbs = o.probs.map(p => p / sum);
    rndTree.reduction = o.reduction;
    rndTree.forkAngle = o.v_angle * Math.PI / 180;
}

import RndTree from "./RndTree.js";
import View from "./view.js";


let tree = new RndTree(
    10, 50, 
    200, 0, 
    0.9, Math.PI/6, [1,2,2,4]
);

//tree.root.print("   ");

let view = new View(tree);
view.draw();



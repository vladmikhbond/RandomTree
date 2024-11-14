import RndTree from "./RndTree.js";
import View from "./view.js";


let tree = new RndTree(
    10, 50, 
    200, 0, 
    0.9, Math.PI/6, [1,1,1,1]
);

//tree.root.print("   ");

let view = new View(tree);
view.draw();



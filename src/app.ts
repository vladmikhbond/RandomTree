import { RndTree } from "./RndTree.js";
import View from "./view.js";

let tree = new RndTree(6
    , 50, 200, 0);
tree.root.print("   ");

let view = new View(tree);
view.draw();



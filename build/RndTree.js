import Branch from "./Brabch.js";
export default class RndTree {
    static variant() {
        let rnd = Math.random();
        let prob = 0;
        for (let i = 0; i < RndTree.P.length; i++) {
            prob += RndTree.P[i];
            if (rnd <= prob)
                return i;
        }
    }
    constructor(maxDepth, rootSize, x, y, R, V, P) {
        RndTree.R = R;
        RndTree.V = V;
        let sum = P.reduce((a, x) => a + x);
        RndTree.P = P.map(p => p / sum);
        this.root = new Branch(rootSize, Math.PI / 2, x, y, maxDepth);
        this.root.grow();
    }
}

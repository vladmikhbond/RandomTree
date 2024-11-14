import Branch from "./Branch.js";

export default class RndTree 
{
    static REDUCTION: number;
    static V_ANGLE: number;
    static PROBS: number[];
    
    static variant() {
        let rnd = Math.random();
        let prob = 0;
        for (let i = 0; i < RndTree.PROBS.length; i++) {
            prob += RndTree.PROBS[i];
            if (rnd <= prob) 
                return i;
        }
    }


    root: Branch;

    constructor(
        maxDepth: number, 
        rootSize: number, 
        x: number, 
        y: number,
        R: number,
        V: number,
        P: number[]) 
    {
        RndTree.REDUCTION = R;
        RndTree.V_ANGLE = V;
        let sum = P.reduce((a, x) => a + x);
        RndTree.PROBS = P.map(p => p / sum);
       

       this.root = new Branch(rootSize, Math.PI / 2, x, y, maxDepth);
       this.grow();
    }
    
    grow() {
       this.root.grow();
    }

}



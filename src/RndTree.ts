import Branch from "./Brabch.js";

export default class RndTree 
{
    static R: number;
    static V: number;
    static P: number[];
    
    static variant() {
        
        let rnd = Math.random();
        let prob = 0;
        for (let i = 0; i < RndTree.P.length; i++) {
            prob += RndTree.P[i];
            if (rnd <= prob) 
                return ['|','|/','\|','\/'][i];
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
        RndTree.R = R;
        RndTree.V = V;
        RndTree.P = P;
       

       this.root = new Branch(rootSize, Math.PI / 2, x, y, maxDepth);
       this.root.grow();
    }  

}



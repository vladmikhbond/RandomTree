import Branch from "./Branch.js";

// Випадкове дерево
//
export default class RndTree 
{
    // коеф.скорочення гілок наступного рівня
    static REDUCTION: number;
    // кут розвилки |/
    static V_ANGLE: number;
    // відносна вірогідність появи сегментів:  0: |, 1: \|,  2: |/, 3: \/  
    static PROBS: number[];  
    
    // Випадково обирає номер сегменту
    //
    static variant() {
        let rnd = Math.random();
        let prob = 0;
        for (let i = 0; i < RndTree.PROBS.length; i++) {
            prob += RndTree.PROBS[i];
            if (rnd <= prob) 
                return i;
        }
    }


    baseSize: number;
    x: number;
    y: number;
    maxDepth: number    // висота дерева (в гілках)
    base: Branch | null = null;

    constructor(
        maxDepth: number, 
        baseSize: number, 
        x: number, 
        y: number,
        REDUCTION = 0.9,
        V_ANGLE = Math.PI/7,
        PROBS = [1,1,1,1]) 
    {
        RndTree.REDUCTION = REDUCTION;
        RndTree.V_ANGLE = V_ANGLE;

        // нормалізуємо вірогідності
        let sum = PROBS.reduce((a, x) => a + x);
        RndTree.PROBS = PROBS.map(p => p / sum);
       
        this.baseSize = baseSize;
        this.maxDepth = maxDepth;
        this.x = x; this.y = y; 
        this.grow();
    }
    
    grow() {
        this.base = new Branch(this.baseSize, Math.PI / 2, this.x, this.y, this.maxDepth);
        this.base.rGrow();
    }

}



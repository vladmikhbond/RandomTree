import Branch from "./Branch.js";
// Випадкове дерево
//
export default class RndTree {
    constructor() {
        this.maxAge = 16; // висота дерева (в гілках)
        this.baseSize = 50;
        this.x = 200;
        this.y = 0;
        // коеф.скорочення гілок наступного рівня    
        this.reduction = 0.9;
        // кут розвилки |/
        this.forkAngle = Math.PI / 7;
        // вірогідність появи сегментів:  0: |, 1: \|,  2: |/, 3: \/ 
        this.forkProbs = [0.25, 0.25, 0.25, 0.25];
        this.baseColor = 'rgb(128, 64, 0)';
        this.base = null;
    }
    grow() {
        this.base = new Branch(this.baseSize, Math.PI / 2, this.x, this.y, this.maxAge, this.baseColor, this);
        this.base.rGrow();
    }
    // Випадково обирає номер сегменту
    //
    variant() {
        let rnd = Math.random();
        let prob = 0;
        for (let i = 0; i < this.forkProbs.length; i++) {
            prob += this.forkProbs[i];
            if (rnd <= prob)
                return i;
        }
    }
}

import Branch from "./Branch.js";

// Випадкове дерево
//
export default class RndTree 
{    

    maxAge = 16    // висота дерева (в гілках)
    baseSize = 50;
    x = 200;
    y = 0;
    // коеф.скорочення гілок наступного рівня    
    reduction = 0.9;
    // кут розвилки |/
    forkAngle = Math.PI/7;
    // вірогідність появи сегментів:  0: |, 1: \|,  2: |/, 3: \/ 
    forkProbs = [0.25,0.25,0.25,0.25];

    baseColor = 'rgb(128, 64, 0)';


    base: Branch | null = null;


    
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



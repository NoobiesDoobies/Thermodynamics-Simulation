
class Ball{
    constructor(box_x, box_y, box_w, box_h, x, y, radius, vx, vy, color){
        this.x = x + box_x + radius;
        this.y = y + box_y + radius;
        this.box_x = box_x;
        this.box_y = box_y;
        this.box_w = box_w;
        this.box_h = box_h;
        this.r = radius;
        this.vx = vx;
        this.vy = vy;
        this.willCollide = false;
        this.color = color;

        // top left bottom right
        this.max = {
            "top" : this.box_y + this.r,
            "left": this.box_x + this.r,
            "bottom": this.box_y + this.box_h - this.r,
            "right": this.box_x + this.box_w - this.r
        }
           
    }

    setVelocity(vx, vy){
        this.vx = vx;
        this.vy = vy;
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    draw(ctx){
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fill();   
    }

    // look one frame ahead
    predictCollision(ball1, ball2){ 
        let x1 = ball1.x
        let y1 = ball1.y
        let x2 = ball2.x
        let y2 = ball2.y
        let v1x = ball1.vx
        let v1y = ball1.vy
        let v2x = ball2.vx
        let v2y = ball2.vy
        let r1 = ball1.r
        let r2 = ball2.r
        
        x1 += (v1x * deltaT)
        y1 -= (v1y * deltaT)
        x2 += (v2x * deltaT)
        y2 -= (v2y * deltaT)  
        const dx = x1 - x2;
        const dy = y1 - y2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const sumRadius = r1 + r2;

        // console.log("distance: " + distance + " sumRadius: " + sumRadius)
        
        return distance < sumRadius;       
    }

    update(traffic, index){
        for(let i = 0; i<traffic.length; i++){
            if(i != index){
                // console.log(".")
                this.willCollide = this.predictCollision(this, traffic[i])
                if(this.willCollide){
                    // console.log("collision!!")

                    const v1 = math.matrix([[this.vx], [this.vy]])
                    const v2 = math.matrix([[traffic[i].vx], [traffic[i].vy]])

                    const r1 = math.matrix([[this.x], [this.y]])
                    const r2 = math.matrix([[traffic[i].x],[traffic[i].y]])

                    const R1 = this.r
                    const R2 = traffic[i].r

                    const m1 = math.pow(R1,3)
                    const m2 = math.pow(R2,3)

                    const centerToCenterVector = math.subtract(r1,r2)
                    const centerToCenterScalar = math.sqrt(math.dot(centerToCenterVector, centerToCenterVector))
                    const centerToCenterUnitVector = math.divide(centerToCenterVector, centerToCenterScalar)
                    

                    // v1New[0] = (Math.pow(r1,3) - Math.pow(r2,3)) / (Math.pow(r1,3) + Math.pow(r2,3)) * v1[0] + 2 * Math.pow(r2,3) / (Math.pow(r1,3) + Math.pow(r2,3)) * v2[0]
                    // v1New[1] = (Math.pow(r1,3) - Math.pow(r2,3)) / (Math.pow(r1,3) + Math.pow(r2,3)) * v1[1] + 2 * Math.pow(r2,3) / (Math.pow(r1,3) + Math.pow(r2,3)) * v2[1]
                    
                    // v2New[0] = 2 * Math.pow(r1,3) / (Math.pow(r1, 3) + Math.pow(r2,3)) * v1[0] - (Math.pow(r1,3) - Math.pow(r2,3)) / (Math.pow(r1,3) + Math.pow(r2,3)) * v2[0]
                    // v2New[1] = 2 * Math.pow(r1,3) / (Math.pow(r1, 3) + Math.pow(r2,3)) * v1[1] - (Math.pow(r1,3) - Math.pow(r2,3)) / (Math.pow(r1,3) + Math.pow(r2,3)) * v2[1]
                    
                    // const v1New = math.subtract(v1, math.multiply(( math.dot(math.subtract(v1,v2),math.subtract(r1,r2)) ) / math.dot(math.subtract(r1,r2),math.subtract(r1,r2)),  math.subtract(r1,r2)))
                    // const v2New = math.subtract(v2, math.multiply(( math.dot(math.subtract(v2,v1),math.subtract(r2,r1)) ) / math.dot(math.subtract(r1,r2),math.subtract(r1,r2)),  math.subtract(r2,r1)))
                    

                    //===========================//

                    const v1ProjVector = math.multiply(math.dot(v1,centerToCenterVector) / math.pow(centerToCenterScalar,2), centerToCenterVector)
                    const v1OrthoVector = math.subtract(v1,v1ProjVector)
                    const v2ProjVector = math.multiply(math.dot(v2,centerToCenterVector) / math.pow(centerToCenterScalar,2), centerToCenterVector)
                    const v2OrthoVector = math.subtract(v2,v2ProjVector)
                    const v1ProjScalar = math.dot(v1, centerToCenterVector)/centerToCenterScalar
                    const alpha = Math.acos(v1ProjScalar/math.sqrt(math.dot(v1,v1))) * 180 / math.pi
                    const v2ProjScalar = math.dot(v2, centerToCenterVector)/centerToCenterScalar
                    const v1ProjScalarNew = (m1-m2)/(m1+m2) * v1ProjScalar + 2*m2/(m1+m2) * v2ProjScalar
                    const v2ProjScalarNew = 2*m1/(m1+m2) * v1ProjScalar - (m1-m2)/(m1+m2) * v2ProjScalar

                    const v1ProjVectorNew = math.multiply(centerToCenterUnitVector, v1ProjScalarNew)
                    const v2ProjVectorNew = math.multiply(centerToCenterUnitVector, v2ProjScalarNew)

                    const v1New = math.add(v1OrthoVector, v1ProjVectorNew)
                    const v2New = math.add(v2OrthoVector, v2ProjVectorNew)

                    //===============================//
                    // const v1New = math.subtract(v1, math.multiply( math.multiply(2*m2/(m1+m2), math.divide(math.dot(math.subtract(v1,v2), centerToCenterVector), math.pow(centerToCenterScalar, 2))), centerToCenterVector))
                    // const v2New = math.subtract(v2, math.multiply( math.multiply(2*m1/(m1+m2), math.divide(math.dot(math.subtract(v2,v1), centerToCenterVector), math.pow(centerToCenterScalar, 2))), centerToCenterVector))


                    
                    this.vx = v1New.get([0,0])
                    this.vy = v1New.get([1,0])


                    traffic[i].setVelocity(v2New.get([0,0]), v2New.get([1,0]))

                    

                    const dx = this.x - traffic[i].x;
                    const dy = -(this.y - traffic[i].y);
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const sumRadius = this.r + traffic[i].r;
                }
                
                this.willCollide = false;
            }

        }
        if(this.y > this.max.bottom){
            this.y = this.max.bottom;
            this.vy = -this.vy;
        }
        if(this.y < this.max.top){
            this.y = this.max.top;
            this.vy = -this.vy;
        }
        if(this.x > this.max.right){
            this.x = this.max.right;
            this.vx = -this.vx;
        }
        if(this.x < this.max.left){
            this.x = this.max.left;
            this.vx = -this.vx;
        }


        // move
        this.x += (this.vx * deltaT);
        this.y -= (this.vy * deltaT);
  
    }
}


function drawVector(x0, y0, vectorX, vectorY){
   const magnification = 10;
   x0+=box_x;
   y0+=box_y;
   vectorX*=magnification;
   vectorY*=magnification;
   const length = math.sqrt(math.pow(vectorX,2) + math.pow(vectorY,2))
   const bodyToArrowProportion = 15/16;
   var gradient = ctx.createLinearGradient(x0, y0, x0+vectorX, y0+vectorY);
    gradient.addColorStop("0", "red");
    gradient.addColorStop("1.0", "green");
    ctx.strokeStyle = gradient;
   ctx.beginPath();
   ctx.moveTo(x0, y0);
   ctx.lineTo((x0+vectorX), (y0+vectorY));
   ctx.stroke(); 
}
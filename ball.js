class Ball{
    constructor(box_x, box_y, box_w, box_h, x, y, radius, vx, vy){
        this.x = x + box_x + radius;
        this.y = y + box_y + radius;
        this.box_x = box_x;
        this.box_y = box_y;
        this.box_w = box_w;
        this.box_h = box_h;
        this.r = radius;
        this.vx = vx;
        this.vy = vy;
        this.collide = false;

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
        ctx.fillStyle = "blue"
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fill();

        ctx.fillStyle="blue";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.stroke();   
    }

    checkCollision(traffic){   
        
        const dx = this.x - traffic.x;
        const dy = this.y - traffic.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const sumRadius = this.r + traffic.r;
        
        return distance < sumRadius;       
    }

    update(traffic, index){
        for(let i = 0; i<traffic.length; i++){
            if(i != index){
                this.collide = this.checkCollision(traffic[i]);
                if(this.collide){
                    const tempvx = this.vx;
                    const tempvy = this.vy;
                    
                    this.vx = traffic[i].vx;
                    this.vy  = traffic[i].vy;

                    traffic[i].setVelocity(tempvx, tempvy);


                    const dx = this.x - traffic[i].x;
                    const dy = -(this.y - traffic[i].y);
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const sumRadius = this.r + traffic[i].r;

                    
                    this.x += 1/2 * ((sumRadius * dx/distance) - dx);
                    this.y -= 1/2 * ((sumRadius * dy/distance) - dy);
                }
                
                this.collide = false;
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
        this.x += this.vx;
        this.y -= this.vy;
  
    }
}
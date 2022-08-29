class Box{
    constructor(box_x, box_y, w, h, color){
        this.x = box_x;
        this.y = box_y;
        this.w = w;
        this.h = h;
        this.color = color;

        
    };


    draw(ctx){

        ctx.fillStyle = this.color;
        ctx.save();

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    }

}
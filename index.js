    const canvas = document.getElementById("myCanvas")
    const startBtn = document.getElementById("start")
    const stopBtn = document.getElementById("stop")
    const ctx = canvas.getContext("2d")

    canvas.width = 1000;
    canvas.height = 1000;
    const box_w = 500;
    const box_h = 500;
    const box_x = canvas.width/2 - box_w/2;
    const box_y = canvas.height/2 - box_h/2;
    const radius = 10;
    const box = new Box(box_x, box_y, box_w, box_h, "white")


    const balls = [];

    let paused = false;

    const x = Math.floor(Math.random() * box_w);
    const y = Math.floor(Math.random() * box_h);
    const vx = Math.floor(Math.random() * 5 + 1);
    const vy = Math.floor(Math.random() * 5 + 1);
    const ballInitial = new Ball(box_x, box_y, box_w, box_h, x, y, radius, vx, vy);
    balls.push(ballInitial)


    const n = 100;
    const total_energy = 100;
    const vmax = 2;

    for(let i = 0; i < n-1; i++){
        let ball = new Ball();
        let collide = false;
        do{        
            const x = Math.floor(Math.random() * box_w);
            const y = Math.floor(Math.random() * box_h);
            const vx = getRandomFloat(0, vmax, 2);
            const vy = getRandomFloat(0, vmax, 2);
            ball = new Ball(box_x, box_y, box_w, box_h, x, y, radius, vx, vy);
            
            for(let j=0; j<balls.length; j++){

                collide = ball.checkCollision(balls[j]);
                if(collide){
                    break;
                }
            }        
        }while(collide)

        balls.push(ball);
    }


    animate();

    function animate(){
        startBtn.onclick = function(){
            paused = false;
        }
        stopBtn.onclick = function(){
            paused = true;
        }
        if(!paused){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            box.draw(ctx);
            for(let i = 0; i < n; i++){
                balls[i].update(balls, i);
                balls[i].draw(ctx); 
            }

        }
        
        requestAnimationFrame(animate);
    }

    function getRandomFloat(min, max, decimals) {
        const str = (Math.random() * (max - min) + min).toFixed(decimals);
      
        return parseFloat(str);
      }
const box = new Box(box_x, box_y, box_w, box_h, "white")

const ballInitial = new Ball(box_x, box_y, box_w, box_h, x, y, r, vx, vy, "red");
balls.push(ballInitial);

function updateSlider(){
    total_energy = energyElement.value
    energyValue.innerHTML = total_energy
    fps = fpsElement.value
    fpsValue.innerHTML = fps
    deltaT = 1/fps*1000
}

for(let i = 0; i < n-1; i++){
    let ball = new Ball();
    let collide = false;
    do{ 
        const x = Math.floor(Math.random() * box_w);
        const y = Math.floor(Math.random() * box_h);
        const r = getRandomFloat(2, rmax, 2);
        const vx = getRandomFloat(-vmax, vmax, 2);
        const vy = getRandomFloat(-vmax, vmax, 2);
        // const x = box_w;
        // const y = box_h/2 + 2;
        // const r = 15;
        // const vx = 0.1;
        // const vy = 0;

        const color = "rgba(" + getRandomInt(0, 255) + ", " + getRandomInt(0, 255) + ", " + getRandomInt(0, 255) + ", " + getRandomInt(0, 255) + ")";
        ball = new Ball(box_x, box_y, box_w, box_h, x, y, r, vx, vy, color);
        for(let j=0; j<balls.length; j++){
            collide = ball.predictCollision(ball, balls[j]);
            if(collide){
                break;
            }
        }        
    }while(collide)

    balls.push(ball);
}


animate();

document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    // Alert the key name and key code on keydown
    console.log(`Key pressed ${name} \r\n Key code value: ${code}`);

    switch(code){
        case "Space":
            event.preventDefault();
            paused = !paused
            break;

        case "ArrowRight":
            event.preventDefault();
            if(paused){
                playFramebyFrame = true
            }
    }
}, false);

function animate(){
    
    startBtn.onclick = function(){
        paused = false;
    }
    stopBtn.onclick = function(){
        paused = true;
    }
    if(!paused || playFramebyFrame){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        box.draw(ctx);
        for(let i = 0; i < n; i++){
            balls[i].update(balls, i);
            balls[i].draw(ctx); 
        }
        playFramebyFrame = false;
    }
    
    if(oldTime === 0) {
        oldTime = new Date().getTime();
        }
    
    while((currentTime - oldTime) < deltaT){ 
        
        currentTime = new Date().getTime();
    }
    oldTime = new Date().getTime();
    requestAnimationFrame(animate);
}



function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    
    return parseFloat(str);
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * max) + min;
}
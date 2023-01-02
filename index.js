
   const canvas = document.getElementById("myCanvas")
    const startBtn = document.getElementById("start")
    const stopBtn = document.getElementById("stop")
    const ctx = canvas.getContext("2d")
    const energyElement = document.getElementById("energy")
    const energyValue = document.getElementById("energyValue")

    // let total_energy = energyElement.value   
    let total_energy = 30;
    
    energyValue.innerHTML = energyElement.value

    // constant
    const rmax = 10; // order of -10
    const density = 1.225; // kg.m^-3


    canvas.width = 1000;
    canvas.height = 1000;
    const box_w = 500;
    const box_h = 500;
    const box_x = canvas.width/2 - box_w/2;
    const box_y = canvas.height/2 - box_h/2;
    const box = new Box(box_x, box_y, box_w, box_h, "white")
    
    const balls = [];

    let paused = false;

    const n = 2;

    const vmax = 5;

    // const x = Math.floor(Math.random() * box_w);
    // const y = Math.floor(Math.random() * box_h);
    // const r = getRandomFloat(2, rmax, 2);
    // const vx = 3;
    // const vy = 0;
    // const ballInitial = new Ball(box_x, box_y, box_w, box_h, x, y, r, vx, vy, "red");
    const x = 0
    const y = box_h/2
    const r = 20;
    const vx = 3;
    const vy = 0;
    const ballInitial = new Ball(box_x, box_y, box_w, box_h, x, y, r, vx, vy, "red");
    balls.push(ballInitial);

    function updateSlider(){
        total_energy = energyElement.value
        energyValue.innerHTML = total_energy
    }

    for(let i = 0; i < n-1; i++){
        
        // console.log("value = " + energyElement.value)
        let ball = new Ball();
        let collide = false;
        do{ 
        //     const x = Math.floor(Math.random() * box_w);
        //     const y = Math.floor(Math.random() * box_h);
        //     const r = getRandomFloat(2, rmax, 2);
        //     const vx = 3;
        //     const vy = 0;
        //     ball = new Ball(box_x, box_y, box_w, box_h, x, y, r, vx, vy, "blue");
        const x = box_w;
        const y = box_h/2 + 2;
        const r = 15;
        const vx = 3;
        const vy = 0;
        ball = new Ball(box_x, box_y, box_w, box_h, x, y, r, vx, vy, "blue");
            for(let j=0; j<balls.length; j++){

                collide = ball.checkCollision(balls[j]);
                if(collide){
                    break;
                }
            }        
        }while(collide)

        balls.push(ball);
    }

    const fps = 60;
    const deltaT = 1/fps*1000;
    let oldTime = 0;
    let currentTime = 0;
    animate();

    document.addEventListener('keydown', (event) => {
        var name = event.key;
        var code = event.code;
        // Alert the key name and key code on keydown
        console.log(`Key pressed ${name} \r\n Key code value: ${code}`);

        if(code === "Space"){
            event.preventDefault();
            paused = !paused
        }
    }, false);

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
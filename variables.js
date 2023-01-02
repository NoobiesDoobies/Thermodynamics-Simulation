canvas.width = 750;
canvas.height = 750;
const box_w = 500;
const box_h = 500;
const box_x = canvas.width/2 - box_w/2;
const box_y = canvas.height/2 - box_h/2;



const balls = [];
let paused = false;
let playFramebyFrame = false;

// constant
const rmax = 10; // order of -10
const n = 100;
const vmax = 0.1;
let total_energy = 30;

let fps = fpsElement.value;
let deltaT = 1/fps*1000;
let oldTime = 0;
let currentTime = 0;


// initial position

const x = Math.floor(Math.random() * box_w);
const y = Math.floor(Math.random() * box_h);
function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    
    return parseFloat(str);
}
const r = getRandomFloat(2, rmax, 2);
const vx = getRandomFloat(-vmax, vmax, 2);
const vy = getRandomFloat(-vmax, vmax, 2);
// const x = 0
// const y = box_h/2
// const r = 40;
// const vx = 0.1;
// const vy = 0;
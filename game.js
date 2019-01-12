// Grabs the canvas for drawing
const scene = document.getElementById('scene');
// Specifies that we want to draw in 2d
const ctx = scene.getContext('2d');


// Setup for assets we need ingame
const bird = new Image();
bird.src = './assets/images/bird.png';

const sky = new Image();
sky.src = './assets/images/sky.png';

const floor = new Image();
floor.src = './assets/images/floor.png';

const bottom_pipe = new Image();
bottom_pipe.src = './assets/images/bottom_pipe.png';

const top_pipe = new Image();
top_pipe.src = './assets/images/top_pipe.png';

const flapSound = new Audio();
flapSound.src = './assets/sounds/fly.mp3';

const scoreSound = new Audio();
scoreSound.src = './assets/sounds/score.mp3';


// Game constants
const pipeGap = 85;
const gravity = 1.5;

let birdX = 10;
let birdY = 150;
// Player score
let score = 0;


// Handle controls
document.addEventListener("keydown", flyUp);
function flyUp() {
  birdY -= 25;
  flapSound.play();
}


const pipes = [{ x: scene.width, y: 0 }];


// Draw everything
function drawScene() {
  ctx.drawImage(sky, 0, 0);

  for (let i = 0; i < pipes.length; i++) {
    let constant = top_pipe.height + pipeGap;
    ctx.drawImage(top_pipe, pipes[i].x, pipes[i].y);
    ctx.drawImage(bottom_pipe, pipes[i].x, pipes[i].y + constant);
    pipes[i].x--;

    if (birdX + bird.width >= pipes[i].x && birdX <= pipes[i].x + top_pipe.width && (birdY <= pipes[i].y + top_pipe.height || birdY + bird.height >= pipes[i].y + constant || birdY + bird.height >= scene.height - floor.height)) {
      location.reload();
    }

    if (birdY >= scene.height - floor.height) {
      location.reload();
    }

    if (pipes[i].x == scene.width - 188) {
      let y = Math.floor(Math.random() * top_pipe.height) - top_pipe.height;
      pipes.push({ x: scene.width, y: y });
    }

    // Collision


    if (pipes[i].x == 5) {
      score++;
      scoreSound.play();
    }
  }

  ctx.drawImage(floor, 0, scene.height - floor.height);
  ctx.drawImage(bird, birdX, birdY);

  birdY += gravity;
  requestAnimationFrame(drawScene);

  ctx.fillStyle = '#000000';
  ctx.font = '20px Verdana';
  ctx.fillText(`Score: ${score}`, 10, scene.height - 20);
}

drawScene();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const player = {
  x: 50,
  y: 100,
  width: 20,
  height: 40,
  xSpeed: 5
};

const platforms = [
  { x: 0, y: 200, width: 150, height: 10 },
  { x: 200, y: 150, width: 100, height: 10 },
  { x: 350, y: 250, width: 150, height: 10 },
  { x: 550, y: 200, width: 100, height: 10 }
];

let gameWidth = 700;
let gameHeight = 300;

function update() {
  // Move the player horizontally
  player.x += player.xSpeed;
  
  // Check if the player has reached the left or right boundary
  if (player.x < gameWidth / 3) {
    gameWidth += player.xSpeed;
    canvas.style.width = gameWidth + 'px';
  } else if (player.x > gameWidth * 2 / 3) {
    gameWidth += player.xSpeed;
    canvas.style.width = gameWidth + 'px';
    canvas.style.marginLeft = -(gameWidth - 700) + 'px';
  }
  
  // Draw the player
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);
  
  // Check for collisions with platforms
  let canJump = false;
  for (const platform of platforms) {
    if (
      player.x + player.width > platform.x &&
      player.x < platform.x + platform.width &&
      player.y + player.height > platform.y &&
      player.y < platform.y + platform.height
    ) {
      // The player is colliding with this platform
      canJump = true;
      player.y = platform.y - player.height;
      break;
    }
  }
  
  // If the player can't jump, make them fall
  if (!canJump) {
    player.y += 5;
  }
}

setInterval(() => {
  update();
}, 1000 / 60);

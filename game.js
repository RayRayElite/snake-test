// Game constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLATFORM_HEIGHT = 20;
const PLATFORM_GAP = 80;
const PLATFORM_SPEED = 2;
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
const PLAYER_SPEED = 5;
const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 50;
const ENEMY_SPEED = 3;

// Game variables
let canvas;
let ctx;
let platforms = [];
let player;
let enemy;
let goalX;
let gameOver = false;

// Initialize the game
function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  // Create the player
  player = {
    x: 50,
    y: CANVAS_HEIGHT - PLATFORM_HEIGHT - PLAYER_HEIGHT,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    speed: PLAYER_SPEED
  };

  // Create the enemy
  enemy = {
    x: 0,
    y: 0,
    width: ENEMY_WIDTH,
    height: ENEMY_HEIGHT,
    speed: ENEMY_SPEED
  };
  randomizeEnemyPosition();

  // Create the platforms
  let platformCount = Math.ceil(CANVAS_WIDTH / PLATFORM_GAP);
  let platformX = 0;
  let gapIndex = Math.floor(Math.random() * platformCount);
  for (let i = 0; i < platformCount; i++) {
    let platform = {
      x: platformX,
      y: CANVAS_HEIGHT - PLATFORM_HEIGHT,
      width: PLATFORM_GAP,
      height: PLATFORM_HEIGHT
    };
    if (i == gapIndex) {
      // Create a gap in the platform
      platform.width = Math.floor(Math.random() * (PLATFORM_GAP - 50)) + 50;
    }
    platforms.push(platform);
    platformX += PLATFORM_GAP;
  }

  // Set the goal X coordinate
  goalX = platformX - PLATFORM_GAP;
}

// Update the game state
function update() {
  // Move the player left or right
  if (isKeyDown('ArrowLeft')) {
    player.x -= player.speed;
  } else if (isKeyDown('ArrowRight')) {
    player.x += player.speed;
  }

  // Scroll the platforms and enemy
  let scrollX = 0;
  if (player.x < CANVAS_WIDTH * 0.3) {
    scrollX = -player.speed;
  } else if (player.x > CANVAS_WIDTH * 0.7) {
    scrollX = player.speed;
  }
  platforms.forEach(platform => {
    platform.x += scrollX;
  });
  enemy.x += scrollX;

  // Check for collision with platforms
  let isOnPlatform = false;
  platforms.forEach(platform => {
    if (isColliding(player, platform)) {
      player.y = platform.y - player.height;
      isOnPlatform = true;
        }
  });
  if (!isOnPlatform) {
    player.y += 2;
  }

  // Check for collision with enemy
  if (isColliding(player, enemy)) {
    gameOver = true;
  }

  // Check if the player has reached the goal
  if (player.x > goalX) {
    gameOver = true;
  }
}

// Draw the game
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Draw the platforms
  platforms.forEach(platform => {
    ctx.fillStyle = 'black';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });

  // Draw the player
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw the enemy
  ctx.fillStyle = 'red';
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

  // Draw the goal
  ctx.fillStyle = 'green';
  ctx.fillRect(goalX, CANVAS_HEIGHT - PLATFORM_HEIGHT, PLATFORM_GAP, PLATFORM_HEIGHT);

  // Draw the game over screen if the game is over
  if (gameOver) {
    ctx.fillStyle = 'black';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }
}

// Handle keyboard input
let keysDown = {};
function onKeyDown(event) {
  keysDown[event.key] = true;
}
function onKeyUp(event) {
  delete keysDown[event.key];
}
function isKeyDown(key) {
  return keysDown[key];
}

// Check if two objects are colliding
function isColliding(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

// Randomize the enemy position
function randomizeEnemyPosition() {
  enemy.y = Math.floor(Math.random() * (CANVAS_HEIGHT - 2 * PLATFORM_HEIGHT - ENEMY_HEIGHT)) + PLATFORM_HEIGHT;
  enemy.x = Math.floor(Math.random() * (CANVAS_WIDTH - ENEMY_WIDTH));
}

// Start the game
init();
setInterval(() => {
  if (!gameOver) {
    update();
    draw();
  }
}, 16);

// Set up keyboard event listeners
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

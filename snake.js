// Set up the canvas and get the drawing context
var canvas = document.getElementById("snake-canvas");
var ctx = canvas.getContext("2d");

// Set up the game variables
var blockSize = 10;
var boardWidth = canvas.width / blockSize;
var boardHeight = canvas.height / blockSize;
var snake;
var food;
var obstacles = [];
var score = 0;
var highScore = 0;
var currency = 0;
var fruitCost = 10;
var sizeCost = 20;
var obstacleCost = 30;
var radiusCost = 40;
var spawnRateCost = 50;
var maxBoardCost = 60;
var fruitTimer = 0;
var fruitSpawnRate = 30;
var fruitRadius = 1;
var maxBoardSize = 30;
var obstacleSize = 10;
var obstacleTimer = 0;
var obstacleDuration = 30;
var maxObstacles = 5;
var obstaclesEnabled = true;
var gameOver = false;
var gamePaused = false;

// Set up the key controls
var keyLeft = 37;
var keyUp = 38;
var keyRight = 39;
var keyDown = 40;
var keyP = 80;

// Set up the shop items
var shopItems = [  {    name: "Larger Board",    cost: maxBoardCost,    description: "Increases the maximum board size",    upgrade: function () {      maxBoardSize++;    },  },  {    name: "Less Obstacles",    cost: obstacleCost,    description: "Reduces the number of obstacles that appear",    upgrade: function () {      if (maxObstacles > 1) {        maxObstacles--;      }    },  },  {    name: "Faster Fruit",    cost: spawnRateCost,    description: "Increases the rate at which fruit spawns",    upgrade: function () {      if (fruitSpawnRate > 1) {        fruitSpawnRate--;      }    },  },  {    name: "Larger Collection Radius",    cost: radiusCost,    description: "Increases the radius of the fruit collection area",    upgrade: function () {      fruitRadius++;    },  },  {    name: "Larger Size Growth",    cost: sizeCost,    description: "Increases the number of fruits required to grow",    upgrade: function () {      fruitCost += 10;    },  },];

// Shop variables
var snakeMaxSize = 4;
var lessObstacles = false;
var fasterFruitSpawn = false;
var largerCollectionRadius = false;
var upgradePrices = [2, 5, 10, 20];

// Handle shop interactions
function handleShopInteraction() {
  // Check if snake has enough currency to buy an upgrade
  if (currency >= upgradePrices[0] && !snakeMaxSize) {
    currency -= upgradePrices[0];
    snakeMaxSize = 4;
    upgradePrices.shift();
  }
  if (currency >= upgradePrices[0] && !lessObstacles) {
    currency -= upgradePrices[0];
    lessObstacles = true;
    upgradePrices.shift();
  }
  if (currency >= upgradePrices[0] && !fasterFruitSpawn) {
    currency -= upgradePrices[0];
    fasterFruitSpawn = true;
    upgradePrices.shift();
  }
  if (currency >= upgradePrices[0] && !largerCollectionRadius) {
    currency -= upgradePrices[0];
    largerCollectionRadius = true;
    upgradePrices.shift();
  }
}

// Update function
function update() {
  // Move the snake
  moveSnake();

  // Check for collisions
  checkCollisions();

  // Check if the snake has collided with a fruit
  if (snakeX === fruitX && snakeY === fruitY) {
    collectFruit();
  }

  // Handle shop interactions
  if (inShop && shopSelection !== null) {
    handleShopInteraction();
  }
}

// Draw function
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (inShop) {
    // Draw shop items
    drawShopItems();

    // Draw currency
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Currency: " + currency, 20, 30);
  } else {
    // Draw the snake
    drawSnake();

    // Draw the fruit
    drawFruit();

    // Draw obstacles
    if (!lessObstacles) {
      drawObstacles();
    }

    // Draw score
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: " + score, 20, 30);
  }
}

// Main game loop
function gameLoop() {
  // Update the game state
  update();

  // Draw the game state
  draw();

  // Request the next frame of the game loop
  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);

// Shop item costs
const MAX_SIZE_COST = 10;
const LESS_OBSTACLES_COST = 25;
const FASTER_SPAWN_COST = 50;
const LARGE_RADIUS_COST = 100;

// Shop items
let maxBoardSize = 20;
let numObstacles = 5;
let fruitSpawnInterval = 3000;
let fruitCollectRadius = 10;

// Shop button event listeners
document.getElementById("maxSizeBtn").addEventListener("click", function() {
  if (currency >= MAX_SIZE_COST) {
    currency -= MAX_SIZE_COST;
    maxBoardSize += 5;
    document.getElementById("maxSize").innerHTML = maxBoardSize;
    document.getElementById("currency").innerHTML = currency;
  }
});
document.getElementById("lessObstaclesBtn").addEventListener("click", function() {
  if (currency >= LESS_OBSTACLES_COST) {
    currency -= LESS_OBSTACLES_COST;
    numObstacles -= 1;
    document.getElementById("numObstacles").innerHTML = numObstacles;
    document.getElementById("currency").innerHTML = currency;
  }
});
document.getElementById("fasterSpawnBtn").addEventListener("click", function() {
  if (currency >= FASTER_SPAWN_COST) {
    currency -= FASTER_SPAWN_COST;
    fruitSpawnInterval /= 2;
    document.getElementById("spawnInterval").innerHTML = fruitSpawnInterval / 1000;
    document.getElementById("currency").innerHTML = currency;
  }
});
document.getElementById("largeRadiusBtn").addEventListener("click", function() {
  if (currency >= LARGE_RADIUS_COST) {
    currency -= LARGE_RADIUS_COST;
    fruitCollectRadius += 5;
    document.getElementById("collectRadius").innerHTML = fruitCollectRadius;
    document.getElementById("currency").innerHTML = currency;
  }
});

// Game loop function
function gameLoop() {
  update();
  draw();

  // Loop the game
  if (!gameOver) {
    setTimeout(gameLoop, 100);
  }
}

// Update function
function update() {
  // Move the snake
  moveSnake();

  // Check for collision with wall
  if (snake[0].x < 0 || snake[0].x >= maxBoardSize * BLOCK_SIZE || snake[0].y < 0 || snake[0].y >= maxBoardSize * BLOCK_SIZE) {
    gameOver = true;
    return;
  }

  // Check for collision with obstacles
  for (let i = 0; i < obstacles.length; i++) {
    if (collides(snake[0], obstacles[i])) {
      gameOver = true;
      return;
    }
  }

  // Check for collision with fruit
  for (let i = 0; i < fruits.length; i++) {
    if (collides(snake[0], fruits[i])) {
      currency++;
      document.getElementById("currency").innerHTML = currency;
      fruits.splice(i, 1);
      growSnake();
      spawnFruit();
      break;
    }
  }

  // Remove expired obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].life -= 1;
    if (obstacles[i].life <= 0) {
      obstacles.splice(i, 1);
      spawnObstacle();
      break;
    }
  }

  // Spawn fruit
  if (fruitSpawnCounter === 0) {
    spawnFruit();
    fruitSpawnCounter = fruitSpawnInterval;
  } else {
    fruitSpawnCounter--;
  }
}

// Draw function
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = "lime";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, blockSize, blockSize);
  }

  // Draw the fruit
  ctx.fillStyle = "red";
  ctx.fillRect(fruit.x, fruit.y, blockSize, blockSize);

  // Draw the obstacles
  ctx.fillStyle = "gray";
  for (let i = 0; i < obstacles.length; i++) {
    ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h);
  }

  // Draw the score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, canvas.width - 100, 30);

  // Draw the shop button
  ctx.fillStyle = "orange";
  ctx.fillRect(canvas.width - 80, canvas.height - 50, 70, 30);
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Shop", canvas.width - 65, canvas.height - 30);
}

// Update function
function update() {
  // Move the snake
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }
  snake[0].x += dx * blockSize;
  snake[0].y += dy * blockSize;

  // Check for collision with fruit
  if (snake[0].x === fruit.x && snake[0].y === fruit.y) {
    score += fruitValue;
    if (score >= nextLevel) {
      levelUp();
    }
    spawnFruit();
    growSnake();
  }

  // Check for collision with obstacles
  for (let i = 0; i < obstacles.length; i++) {
    if (snake[0].x < obstacles[i].x + obstacles[i].w &&
        snake[0].x + blockSize > obstacles[i].x &&
        snake[0].y < obstacles[i].y + obstacles[i].h &&
        snake[0].y + blockSize > obstacles[i].y) {
      gameover();
      return;
    }
  }

  // Check for collision with walls
  if (snake[0].x < 0 || snake[0].x >= canvas.width ||
      snake[0].y < 0 || snake[0].y >= canvas.height) {
    gameover();
    return;
  }

  // Draw the game
  draw();
}

// Game loop
setInterval(update, 1000 / fps);

// Add event listeners for keyboard controls
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

// Show the main menu
showMainMenu();

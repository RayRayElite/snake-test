console.log()

// Define the game constants
const TILE_SIZE = 20;
const GAME_WIDTH = 30;
const GAME_HEIGHT = 30;
const GAME_SPEED = 100;
const INITIAL_SNAKE_LENGTH = 3;
const FRUITS_PER_GROWTH = 2;
const MAX_OBSTACLES = 3;
const OBSTACLE_LIFESPAN = 30000; // in milliseconds
const SHOP_ITEMS = [
  {
    name: "Max Board Size",
    description: "Increase the maximum board size",
    cost: 10,
    effect: function() {
      maxBoardSize += 5;
    }
  },
  {
    name: "Less Obstacles",
    description: "Reduce the number of obstacles on the board",
    cost: 20,
    effect: function() {
      maxObstacles--;
    }
  },
  {
    name: "Faster Fruit Spawns",
    description: "Increase the rate at which fruits appear",
    cost: 30,
    effect: function() {
      fruitSpawnInterval -= 1000;
    }
  },
  {
    name: "Larger Collection Radius",
    description: "Increase the size of the object collection radius",
    cost: 40,
    effect: function() {
      collectionRadius += TILE_SIZE;
    }
  }
];

// Define the game variables
let maxBoardSize = GAME_WIDTH;
let snake = [];
let fruits = [];
let obstacles = [];
let direction = "right";
let score = 0;
let currency = 0;
let collectionRadius = TILE_SIZE * 2;
let fruitSpawnInterval = 5000;
let maxObstacles = MAX_OBSTACLES;
let boardSize = {
  width: GAME_WIDTH * TILE_SIZE,
  height: GAME_HEIGHT * TILE_SIZE
};

// Set up the canvas and get the drawing context
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Set up the keyboard event listeners
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.code === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.code === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.code === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});

// Define the game functions
function drawTile(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    drawTile(snake[i].x, snake[i].y, "green");
  }
}

function drawFruits() {
  for (let i = 0; i < fruits.length; i++) {
    drawTile(fruits[i].x, fruits[i].y, "red");
  }
}

function drawObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    drawTile(obstacles[i].x, obstacles[i].y, "gray");
  }
}

function drawGame() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the canvas border
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "black";
  ctx.stroke();

  // Draw the snake, fruits, and obstacles
  drawSnake();
  drawFruits();
  drawObstacles();

  // Draw the score and currency
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 25);
  ctx.fillText(`Currency: ${currency}`, 10, 50);
}

function update() {
  // Move the snake
  let newHead = { x: snake[0].x, y: snake[0].y };
  if (direction === "up") {
    newHead.y--;
  } else if (direction === "down") {
    newHead.y++;
  } else if (direction === "left") {
    newHead.x--;
  } else if (direction === "right") {
    newHead.x++;
  }

  // Check for collision with walls
  if (newHead.x < 0 || newHead.x >= maxBoardSize || newHead.y < 0 || newHead.y >= maxBoardSize) {
    endGame();
    return;
  }

  // Check for collision with obstacles
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x === newHead.x && obstacles[i].y === newHead.y) {
      endGame();
      return;
    }
  }

  // Check for collision with fruits
  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i].x === newHead.x && fruits[i].y === newHead.y) {
      // Remove the fruit from the array
      fruits.splice(i, 1);

      // Add to the score and currency
      score++;
      currency++;

      // Check if the snake should grow
      if (score % FRUITS_PER_GROWTH === 0) {
        snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
      }

      // Spawn a new fruit
      spawnFruit();

      // Update the game display
      drawGame();
      return;
    }
  }

  // Move the snake by adding the new head to the beginning and removing the tail
  snake.unshift(newHead);
  snake.pop();

  // Update the game display
  drawGame();
}

function endGame() {
  // Reset the game variables
  snake = [];
  fruits = [];
  obstacles = [];
  direction = "right";
  score = 0;
  currency = 0;

  // Spawn the initial snake and fruit
  spawnSnake();
  spawnFruit();

  // Update the game display
  drawGame();
}

function spawnSnake() {
  // Spawn the snake in the center of the board
  let centerX = Math.floor(maxBoardSize / 2);
  let centerY = Math.floor(maxBoardSize / 2);

  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.push({ x: centerX - i, y: centerY });
  }
}

function spawnFruit() {
  // Generate a random position for the fruit
  let fruitX = Math.floor(Math.random() * maxBoardSize);
  let fruitY = Math.floor(Math.random() * maxBoardSize);

// Check that the fruit doesn't overlap with the snake or obstacles
for (let i = 0; i < snake.length; i++) {
if (fruitX === snake[i].x && fruitY === snake[i].y) {
// The fruit is on the snake, regenerate the fruit
spawnFruit();
return;
}
}
for (let i = 0; i < obstacles.length; i++) {
if (fruitX === obstacles[i].x && fruitY === obstacles[i].y) {
// The fruit is on an obstacle, regenerate the fruit
spawnFruit();
return;
}
}

// Add the new fruit to the array
fruits.push({ x: fruitX, y: fruitY });
}

function spawnObstacle() {
// Generate a random position for the obstacle
let obstacleX = Math.floor(Math.random() * maxBoardSize);
let obstacleY = Math.floor(Math.random() * maxBoardSize);

// Check that the obstacle doesn't overlap with the snake, fruits or other obstacles
for (let i = 0; i < snake.length; i++) {
if (obstacleX === snake[i].x && obstacleY === snake[i].y) {
// The obstacle is on the snake, regenerate the obstacle
spawnObstacle();
return;
}
}
for (let i = 0; i < fruits.length; i++) {
if (obstacleX === fruits[i].x && obstacleY === fruits[i].y) {
// The obstacle is on a fruit, regenerate the obstacle
spawnObstacle();
return;
}
}
for (let i = 0; i < obstacles.length; i++) {
if (obstacleX === obstacles[i].x && obstacleY === obstacles[i].y) {
// The obstacle is on another obstacle, regenerate the obstacle
spawnObstacle();
return;
}
}

// Add the new obstacle to the array
obstacles.push({ x: obstacleX, y: obstacleY });
}

function handleKeyPress(event) {
// Change the direction of the snake based on the key pressed
if (event.keyCode === 38 && direction !== "down") {
direction = "up";
} else if (event.keyCode === 40 && direction !== "up") {
direction = "down";
} else if (event.keyCode === 37 && direction !== "right") {
direction = "left";
} else if (event.keyCode === 39 && direction !== "left") {
direction = "right";
}
}

// Start the game
spawnSnake();
spawnFruit();
spawnObstacle();
drawGame();

// Listen for arrow key presses to change the direction of the snake
document.addEventListener("keydown", handleKeyPress);

function update() {
  // Move the snake
  let newHead;
  switch (direction) {
    case "left":
      newHead = { x: snake[0].x - 1, y: snake[0].y };
      break;
    case "up":
      newHead = { x: snake[0].x, y: snake[0].y - 1 };
      break;
    case "right":
      newHead = { x: snake[0].x + 1, y: snake[0].y };
      break;
    case "down":
      newHead = { x: snake[0].x, y: snake[0].y + 1 };
      break;
  }

  // Check if the snake hit a wall or obstacle
  if (newHead.x < 0 || newHead.x >= maxBoardSize || newHead.y < 0 || newHead.y >= maxBoardSize || isOccupied(newHead.x, newHead.y)) {
    endGame();
    return;
  }

  // Check if the snake ate a fruit
  let ateFruit = false;
  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i].x === newHead.x && fruits[i].y === newHead.y) {
      snake.unshift(newHead);
      fruits.splice(i, 1);
      ateFruit = true;
      break;
    }
  }

  // Move the rest of the snake
  if (!ateFruit) {
    let tail = snake.pop();
    tail.x = newHead.x;
    tail.y = newHead.y;
    snake.unshift(tail);
  }

  // Add a new obstacle if it's time
  if (obstacles.length < maxObstacles && Math.random() < OBSTACLE_SPAWN_CHANCE) {
    addObstacle();
  }

  // Update the game display
  drawGame();
}

function endGame() {
  // Reset the game state
  snake = [{ x: 10, y: 10 }];
  fruits = [];
  obstacles = [];

  // Spawn the initial snake and fruit
  spawnSnake();
  spawnFruit();

  // Update the game display
  drawGame();
}

function drawGame() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "black" : "green";
    ctx.fillRect(snake[i].x * BLOCK_SIZE, snake[i].y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  }

  // Draw the fruits
  for (let i = 0; i < fruits.length; i++) {
    ctx.fillStyle = "red";
    ctx.fillRect(fruits[i].x * BLOCK_SIZE, fruits[i].y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  }

  // Draw the obstacles
  for (let i = 0; i < obstacles.length; i++) {
    ctx.fillStyle = "gray";
    ctx.fillRect(obstacles[i].x * BLOCK_SIZE, obstacles[i].y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  }
}

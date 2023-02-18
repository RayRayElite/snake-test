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

// Define the game initialization functions
function startGame() {
  // Initialize the snake
  snake = [];
  for (let i = INITIAL_SNAKE_LENGTH - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 });
  }

  // Initialize the game objects
  score = 0;
  currency = 0;
  fruits = [];
  obstacles = [];
  sizeCounter = 0;
  snakeSize = INITIAL_SNAKE_LENGTH;

  // Spawn the initial objects
  spawnFruit();
  spawnObstacles();

  // Start the game loop
  moveSnake();
}

function gameOver() {
  // Display the game over message and final score
  alert("Game over! Final score: " + score);

  // Reset the game state
  startGame();
}

function updateScore() {
  document.getElementById("score").innerHTML = "Score: " + score;
}

function updateCurrency() {
  document.getElementById("currency").innerHTML = "Currency: " + currency;
}

function spawnFruit() {
  let x = Math.floor(Math.random() * boardSize.width / TILE_SIZE);
  let y = Math.floor(Math.random() * boardSize.height / TILE_SIZE);
  fruits.push({ x: x, y: y });
  setTimeout(spawnFruit, fruitSpawnInterval);
}

function drawFruits() {
  for (let i = 0; i < fruits.length; i++) {
    drawTile(fruits[i].x, fruits[i].y, "red");
  }
}

function spawnObstacles() {
  while (obstacles.length < maxObstacles) {
    let x = Math.floor(Math.random() * boardSize.width / TILE_SIZE);
    let y = Math.floor(Math.random() * boardSize.height / TILE_SIZE);
    let lifespan = Math.floor(Math.random() * OBSTACLE_LIFESPAN);
    obstacles.push({ x: x, y: y, lifespan: lifespan });
  }
  setTimeout(spawnObstacles, OBSTACLE_LIFESPAN);
}

function drawObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    drawTile(obstacles[i].x, obstacles[i].y, "gray");
  }
}

function hitObstacle(x, y) {
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x === x && obstacles[i].y === y) {
      return true;
    }
  }
  return false;
}
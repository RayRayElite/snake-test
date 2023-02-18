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

function moveSnake() {
  // Move the snake in the current direction test
  let head = {
    x: snake[0].x,
    y: snake[0].y
  };
  if (direction === "up") {
    head.y--;
  } else if (direction === "down") {
    head.y++;
  } else if (direction === "left") {
    head.x--;
  } else if (direction === "right") {
    head.x++;
  }
     // Check if the snake has collided with a wall or obstacle
    if (snakeX < 0 || snakeX >= boardWidth || snakeY < 0 || snakeY >= boardHeight || hitObstacle()) {
      // Game over
      gameOver();
      return;
    }

    // Check if the snake has collided with a fruit
    if (snakeX === fruitX && snakeY === fruitY) {
      // Increment the score and spawn a new fruit
      score += 1;
      updateScore();
      spawnFruit();

      // Increment the size counter and update the snake's body
      sizeCounter += 1;
      snakeBody.push({ x: snakeX, y: snakeY });

      // Check if the snake has grown to the next size
      if (sizeCounter >= sizeIncrement) {
        snakeSize += 1;
        sizeCounter = 0;
      }
    } else {
      // Move the snake's body forward
      var tail = snakeBody.shift();
      tail.x = snakeX;
      tail.y = snakeY;
      snakeBody.push(tail);
    }

    // Clear the canvas and draw the game objects
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFruit();
    drawSnake();
    drawObstacles();

    // Schedule the next game tick
    setTimeout(gameTick, gameSpeed);
  }

  // Start the game
  startGame();

})();

// Set up the canvas and get the drawing context
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Set up the game state
var gameState = {
  snake: [{ x: 10, y: 10 }],
  direction: "right",
  apple: { x: 15, y: 15 },
  score: 0,
  currency: 0,
  options: {
    boardSize: 20,
    obstacleFrequency: 0.1,
    appleRadius: 1,
    appleSpawnRate: 3000,
  },
};
// Define the game loop function
function gameLoop() {
  // Move the snake
  var newHead = {
    x: gameState.snake[0].x,
    y: gameState.snake[0].y,
  };

  switch (gameState.direction) {
    case "up":
      newHead.y -= 1;
      break;
    case "down":
      newHead.y += 1;
      break;
    case "left":
      newHead.x -= 1;
      break;
    case "right":
      newHead.x += 1;
      break;
  }

  // Check for collisions
  if (
    newHead.x < 0 ||
    newHead.x >= gameState.options.boardSize ||
    newHead.y < 0 ||
    newHead.y >= gameState.options.boardSize
  ) {
    // Game over
    alert("Game over! Your score was: " + gameState.score);
    resetGame();
    return;
  }
  // Check for collisions with the apple
  if (
    newHead.x == gameState.apple.x &&
    newHead.y == gameState.apple.y
  ) 
  {
    // The snake has eaten the apple
    gameState.score += 1;
    gameState.currency += 1;

    // Add a new segment to the snake
    gameState.snake.unshift(newHead);

    // Spawn a new apple
    spawnApple();

    // Update the display
    updateDisplay();
  } else {
    // Move the snake
    gameState.snake.pop();
    gameState.snake.unshift(newHead);

    // Update the display
    updateDisplay();
  }

  // Set the next iteration of the game loop
  setTimeout(gameLoop, 1000 / 10);
}

// Start the game loop
gameLoop();

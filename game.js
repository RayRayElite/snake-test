// Initialize the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Sets up Global Variables for Jump Mechanics
let jumpTime = 0;
const jumpDuration = 0.5; // in seconds

// Set up the player
const player = {
	x: 50,
	y: 50,
	width: 50,
	height: 50,
	speed: 5,
	jumpHeight: 125,
	jumping: false,
	jumpCount: 0,
	direction: "right",
	velocityY: 0, // add velocityY to player object
	velocityX: 0 // set initial velocity to 0
};

// Set up the platforms 
const platforms = [
	{
		x: 0,
		y: canvas.height - 50,
		width: canvas.width,
		height: 50
	},
	{
		x: 200,
		y: 400,
		width: 100,
		height: 25
	},
	{
		x: 500,
		y: 350,
		width: 100,
		height: 25
	}
];

// Set up gravity
const gravity = 2;

// Handle user input
document.addEventListener("keydown", event => {
	if (event.code === "KeyW" && !player.jumping) {
		player.jumping = true;
		player.jumpCount = player.jumpHeight;
	}
	if (event.code === "KeyA") {
		player.direction = "left";
	}
	if (event.code === "KeyD") {
		player.direction = "right";
	}
});

document.addEventListener("keyup", event => {
	if (event.code === "KeyA" && player.direction === "left") {
		player.direction = "none";
	}
	if (event.code === "KeyD" && player.direction === "right") {
		player.direction = "none";
	}
});

// Update the game state
function update() {
  // Apply gravity
  player.velocityY += gravity;

  // sets horizontal player movement to 0 every update when not being changed by the user.
  player.velocityX = 0;

  // Update player position
  if (player.jumping) {
    jumpTime += deltaTime;
    if (jumpTime < jumpDuration) {
      // Calculate easing function
      const t = jumpTime / jumpDuration;
      const jumpHeight = 200;
      const jumpSpeed = -2 * jumpHeight / jumpDuration;
      player.velocityY = jumpSpeed * t * (1 - t);
    } else {
      player.jumping = false;
      jumpTime = 0;
    }
  }
  player.y += player.velocityY;

  // Check for collisions with platforms
  let canJump = false;
  for (const platform of platforms) {
    if (
      player.x + player.width > platform.x &&
      player.x < platform.x + platform.width &&
      player.y + player.height > platform.y &&
      player.y < platform.y + platform.height
    ) {
      if (player.jumping) {
        player.jumpCount = player.jumpHeight;
      }
      player.jumping = false;
      player.y = platform.y - player.height;
      canJump = true;
    }
  }

  // Apply input
  if (player.direction === "left") {
    player.x -= player.speed;
  }
  if (player.direction === "right") {
    player.x += player.speed;
  }

  // Wrap player around screen
  if (player.x < 0) {
    player.x = canvas.width - player.width;
  }
  if (player.x > canvas.width - player.width) {
    player.x = 0;
  }

  // Allow jumping
  if (canJump && player.jumpCount === 0) {
    player.jumpCount = player.jumpHeight;
  }
  if (player.jumpCount > 0) {
    player.velocityY = -10;
    player.jumpCount -= 10;
  }
}

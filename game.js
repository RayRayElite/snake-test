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
	direction: "notMoving"
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
	canJump = false; // Assume that the player can't jump until we know they are touching a platform
	for (const platform of platforms) {
		if (player.x + player.width > platform.x &&
			player.x < platform.x + platform.width &&
			player.y + player.height > platform.y &&
			player.y < platform.y + platform.height) {
			if (player.jumping) {
				player.jumpCount = player.jumpHeight;
			}
			player.jumping = false;
			player.y = platform.y - player.height;
			canJump = true; // The player is touching a platform, so they can jump
		}
	}
}

// Draw the game
function draw() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// Draw the player
	ctx.fillStyle = "red";
	ctx.fillRect(player.x, player.y, player.width, player.height);
	
	// Draw the platforms
	ctx.fillStyle = "gray";
	for (const platform of platforms) {
		ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
	}
}

// Game loop
function loop() {
	update();
	draw();
	requestAnimationFrame(loop);
}

// Start the game loop
requestAnimationFrame(loop);
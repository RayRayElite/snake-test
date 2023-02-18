// Initialize the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set up the player
const player = {
	x: 50,
	y: 50,
	width: 50,
	height: 50,
	speed: 5,
	jumpHeight: 10,
	jumping: false,
	jumpCount: 0,
	direction: "right"
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
	// Apply gravity to the player
	player.y += gravity;
	
	// Update the player's position
	if (player.jumping && canJump) { // Only allow jumping if canJump is true
		player.y -= player.jumpCount;
		player.jumpCount -= 1;
		if (player.jumpCount === 0) {
			player.jumping = false;
		}
	}
	if (player.direction === "left") {
		player.x -= player.speed;
	}
	if (player.direction === "right") {
		player.x += player.speed;
	}
	if (player.x < 0) {
		player.x = 0;
	}
	if (player.x + player.width > canvas.width) {
		player.x = canvas.width - player.width;
	}
	if (player.y + player.height > canvas.height) {
		player.y = canvas.height - player.height;
		player.jumping = false;
	}
	
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
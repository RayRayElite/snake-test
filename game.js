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
	jumpCount: 0
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

// Handle user input
document.addEventListener("keydown", event => {
	if (event.code === "KeyW" && !player.jumping) {
		player.jumping = true;
		player.jumpCount = player.jumpHeight;
	}
});

// Update the game state
function update() {
	// Update the player's position
	if (player.jumping) {
		player.y -= player.jumpCount;
		player.jumpCount -= 1;
		if (player.jumpCount === 0) {
			player.jumping = false;
		}
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
		}
	}
}

// Draw the game
function draw() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// Draw the player
	ctx.fillRect(player.x, player.y, player.width, player.height);
	
	// Draw the platforms
	for (const platform of platforms) {
		ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
	}
}

// Run the game loop
function gameLoop() {
	update();
	draw();
	requestAnimationFrame(gameLoop);
}
gameLoop();

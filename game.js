// Initialize game variables
let score = 0;
let level = 1;
let upgradeCost = 10;
let prestigeLevel = 0;

// Get DOM elements
const scoreElem = document.getElementById('score');
const levelElem = document.getElementById('level');
const clickButton = document.getElementById('clickButton');
const buyUpgradeButton = document.getElementById('buyUpgradeButton');
const prestigeButton = document.getElementById('prestigeButton');

// Function to update game state
function updateGameState() {
  // Update score
  score += level;
  scoreElem.innerText = score;

  // Update upgrade level and cost
  if (score >= upgradeCost) {
    level++;
    score -= upgradeCost;
    upgradeCost = Math.floor(upgradeCost * 1.5);
    levelElem.innerText = level;
    scoreElem.innerText = score;
    buyUpgradeButton.innerText = `Buy Upgrade (${upgradeCost} points)`;
  }

  // Update prestige level
  if (score >= 100 && prestigeLevel === 0) {
    prestigeLevel = 1;
    level = 1;
    upgradeCost = 10;
    score = 0;
    levelElem.innerText = level;
    scoreElem.innerText = score;
    buyUpgradeButton.innerText = `Buy Upgrade (${upgradeCost} points)`;
    prestigeButton.innerText = `Prestige (Cost: 500 points)`;
  } else if (score >= 500 && prestigeLevel === 1) {
    prestigeLevel = 2;
    level = 1;
    upgradeCost = 10;
    score = 0;
    levelElem.innerText = level;
    scoreElem.innerText = score;
    buyUpgradeButton.innerText = `Buy Upgrade (${upgradeCost} points)`;
    prestigeButton.innerText = `Prestige (Maxed Out)`;
  }
}

// Event listeners
clickButton.addEventListener('click', () => {
  updateGameState();
});

buyUpgradeButton.addEventListener('click', () => {
  if (score >= upgradeCost) {
    updateGameState();
  }
});

prestigeButton.addEventListener('click', () => {
  if (prestigeLevel === 1 && score >= 100) {
    prestigeLevel = 2;
    score -= 100;
    level = 1;
    upgradeCost = 10;
    levelElem.innerText = level;
    scoreElem.innerText = score;
    buyUpgradeButton.innerText = `Buy Upgrade (${upgradeCost} points)`;
    prestigeButton.innerText = `Prestige (Maxed Out)`;
  } else if (prestigeLevel === 2 && score >= 500) {
    score = 0;
    level = 1;
    upgradeCost = 10;
    prestigeLevel = 1;
    levelElem.innerText = level;
    scoreElem.innerText = score;
    buyUpgradeButton.innerText = `Buy Upgrade (${upgradeCost} points)`;
    prestigeButton.innerText = `Prestige (Cost: 100 points)`;
  }
});
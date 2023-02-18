// Define variables
let money = 0;
let wire = 0;
let circuit = 0;
let screen = 0;
let battery = 0;
let phone = 0;

let moneyPerClick = 1;
let wireCost = 10;
let circuitCost = 100;
let screenCost = 1000;
let batteryCost = 10000;
let phoneCost = 100000;

let wireClicks = 0;
let circuitClicks = 0;
let screenClicks = 0;
let batteryClicks = 0;

let wireElem = document.getElementById("wire-count");
let circuitElem = document.getElementById("circuit-count");
let screenElem = document.getElementById("screen-count");
let batteryElem = document.getElementById("battery-count");
let phoneElem = document.getElementById("phone-count");
let moneyElem = document.getElementById("money-count");

let wireClickElem = document.getElementById("wire-click");
let circuitClickElem = document.getElementById("circuit-click");
let screenClickElem = document.getElementById("screen-click");
let batteryClickElem = document.getElementById("battery-click");

let wireCostElem = document.getElementById("wire-cost");
let circuitCostElem = document.getElementById("circuit-cost");
let screenCostElem = document.getElementById("screen-cost");
let batteryCostElem = document.getElementById("battery-cost");
let phoneCostElem = document.getElementById("phone-cost");

// Add event listeners
document.getElementById("wire-btn").addEventListener("click", () => {
  wire += moneyPerClick + wireClicks;
  updateMoney();
  updateWire();
});

document.getElementById("circuit-btn").addEventListener("click", () => {
  circuit += moneyPerClick + circuitClicks;
  updateMoney();
  updateCircuit();
});

document.getElementById("screen-btn").addEventListener("click", () => {
  screen += moneyPerClick + screenClicks;
  updateMoney();
  updateScreen();
});

document.getElementById("battery-btn").addEventListener("click", () => {
  battery += moneyPerClick + batteryClicks;
  updateMoney();
  updateBattery();
});

document.getElementById("phone-btn").addEventListener("click", () => {
  if (money >= phoneCost) {
    money -= phoneCost;
    phone++;
    phoneCost *= 10;
    phoneCostElem.innerText = `Cost: ${phoneCost} Money`;
    updatePhone();
    updateMoney();
  }
});

document.getElementById("wire-upgrade-btn").addEventListener("click", () => {
  if (money >= wireCost) {
    money -= wireCost;
    moneyPerClick += 1;
    wireClicks++;
    wireCost *= 10;
    wireCostElem.innerText = `Cost: ${wireCost} Money`;
    updateWire();
    updateMoney();
  }
});

document.getElementById("circuit-upgrade-btn").addEventListener("click", () => {
  if (money >= circuitCost) {
    money -= circuitCost;
    moneyPerClick += 5;
    circuitClicks++;
    circuitCost *= 10;
    circuitCostElem.innerText = `Cost: ${circuitCost} Money`;
    updateCircuit();
    updateMoney();
  }
});

document.getElementById("screen-upgrade-btn").addEventListener("click", () => {
  if (money >= screenCost) {
    money -= screenCost;
    moneyPerClick += 10;
    screenClicks++;
    screenCost *= 10;
    screenCostElem.innerText = `Cost: ${screenCost} Money`;
    updateScreen();
    updateMoney();
  }
});

document.getElementById("battery-upgrade-btn").addEventListener("click", () => {
  if (money >= batteryCost) {
    money -= batteryCost;
    moneyPerClick += 20;
    batteryCount++;
    batteryCost = Math.floor(50 * Math.pow(1.1, batteryCount));
    updateMoney();
    updateBattery();
  }
});

document.getElementById("screen-upgrade-btn").addEventListener("click", () => {
  if (money >= screenCost) {
    money -= screenCost;
    moneyPerClick += 50;
    screenCount++;
    screenCost = Math.floor(100 * Math.pow(1.1, screenCount));
    updateMoney();
    updateScreen();
  }
});

document.getElementById("processor-upgrade-btn").addEventListener("click", () => {
  if (money >= processorCost) {
    money -= processorCost;
    moneyPerClick += 100;
    processorCount++;
    processorCost = Math.floor(200 * Math.pow(1.1, processorCount));
    updateMoney();
    updateProcessor();
  }
});

document.getElementById("phone-upgrade-btn").addEventListener("click", () => {
  if (money >= phoneCost) {
    money -= phoneCost;
    moneyPerClick += 500;
    phoneCount++;
    phoneCost = Math.floor(1000 * Math.pow(1.1, phoneCount));
    updateMoney();
    updatePhone();
  }
});

document.getElementById("sell-phone-btn").addEventListener("click", () => {
  if (phoneCount > 0) {
    phoneCount--;
    phonesSold++;
    money += phonePrice;
    updatePhone();
    updatePhonesSold();
    updateMoney();
  }
});

// Update functions

function updateMoney() {
  moneyElem.innerHTML = `$${money}`;
}

function updateBattery() {
  batteryElem.innerHTML = `Batteries: ${batteryCount} (Cost: $${batteryCost})`;
}

function updateScreen() {
  screenElem.innerHTML = `Screens: ${screenCount} (Cost: $${screenCost})`;
}

function updateProcessor() {
  processorElem.innerHTML = `Processors: ${processorCount} (Cost: $${processorCost})`;
}

function updatePhone() {
  phoneElem.innerHTML = `Phones: ${phoneCount} (Cost: $${phoneCost})`;
}

function updatePhonesSold() {
  phonesSoldElem.innerHTML = `Phones Sold: ${phonesSold}`;
}

// Game loop

setInterval(() => {
  money += moneyPerSecond;
  updateMoney();
}, 1000);

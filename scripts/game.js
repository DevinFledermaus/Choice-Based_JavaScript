let inventory = {};
let weapons = {};

function startGame() {
  inventory = {};
  weapons = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textElement = document.querySelector("#text");
  const optionButtonsElement = document.querySelector("#option-buttons");
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);

  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredItem == null || option.requiredItem(inventory);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    alert("GAME OVER!!!!!");
    return startGame();
  }
  inventory = Object.assign(inventory, option.setItem);
  updateBackPack();
  weapons = Object.assign(weapons, option.setWeapon);
  updateWeaponsList();
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: "You start awake, the feeling the cold of the stone wall and ground you seated against finally registering you get up. Noticing something shiny a few feet away...",
    options: [
      {
        text: "Head towards it and pick it up",
        setItem: { lockPick: true },
        nextText: 2,
      },
      {
        text: "Ignore the object",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text: "You venture on and come across a merchant",
    options: [
      {
        text: "Trade the goo for a sword",
        requiredItem: (currentInventory) => currentInventory.blueGoo,
        setItem: { blueGoo: false, redGoo: true, greenGoo: true },
        setWeapon: { sword: true },
        nextText: 3,
      },
      {
        text: "Trade the goo for a shield",
        requiredItem: (currentInventory) => currentInventory.blueGoo,
        setItem: { blueGoo: false },
        setWeapon: { shield: true },
        nextText: 3,
      },
      {
        text: "Ignore the merchant",
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text: "After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.",
    options: [
      {
        text: "Explore the castle",
        nextText: 4,
      },
      {
        text: "Find a room to sleep at in the town",
        nextText: 5,
      },
      {
        text: "Find some hay in a stable to sleep in",
        nextText: 6,
      },
    ],
  },
  {
    id: 4,
    text: "You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 5,
    text: "Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 6,
    text: "You wake up well rested and full of energy ready to explore the nearby castle.",
    options: [
      {
        text: "Explore the castle",
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text: "While exploring the castle you come across a horrible monster in your path.",
    options: [
      {
        text: "Try to run",
        nextText: 8,
      },
      {
        text: "Attack it with your sword",
        requiredItem: (currentInventory) => currentInventory.sword,
        nextText: 9,
      },
      {
        text: "Hide behind your shield",
        requiredItem: (currentInventory) => currentInventory.shield,
        nextText: 10,
      },
      {
        text: "Throw the blue goo at it",
        requiredItem: (currentInventory) => currentInventory.blueGoo,
        nextText: 11,
      },
    ],
  },
  {
    id: 8,
    text: "Your attempts to run are in vain and the monster easily catches.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 9,
    text: "You foolishly thought this monster could be slain with a single sword.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 10,
    text: "The monster laughed as you hid behind your shield and ate you.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 11,
    text: "You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.",
    options: [
      {
        text: "Congratulations. Play Again.",
        nextText: -1,
      },
    ],
  },
];

function updateBackPack() {
  let items = Object.keys(inventory);
  let trueItems = items.filter(function (key) {
    return inventory[key];
  });
  let bodyElement = document.querySelector("#backpack-content");

  bodyElement.innerHTML = "";

  console.log(trueItems);
  for (let i = 0; i < trueItems.length; i++) {
    createBackPackList(trueItems[i]);
  }
}

function updateWeaponsList() {
  let items = Object.keys(weapons);
  let trueWeapons = items.filter(function (key) {
    return weapons[key];
  });
  let bodyElement = document.querySelector("#weapons-content");

  bodyElement.innerHTML = "";

  for (let i = 0; i < trueWeapons.length; i++) {
    createWeaponsList(trueWeapons[i]);
  }
}

const createBackPackList = (trueItems) => {
  const bodyElement = document.querySelector("#backpack-content");

  let itemRow = `<div class="item" id="item">${trueItems}</div>`;
  bodyElement.innerHTML += itemRow;
};

const createWeaponsList = (trueWeapons) => {
  const bodyElement = document.querySelector("#weapons-content");

  let itemRow = `<div class="item" id="item">${trueWeapons}</div>`;
  bodyElement.innerHTML += itemRow;
};

startGame();

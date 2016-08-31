/* global AirConsole VERSOMINUS*/

VERSOMINUS = {};

const PLAYER_COLORS = {
  0: ' Background--blue',
  1: ' Background--green',
  2: ' Background--yellow',
  3: ' Background--red',
};

const context = this;
const playerNameSelector = 'js-PlayerName';
const playerContainerSelector = 'js-Player';
const enemiesContaienrSelector = 'js-Enemies';


init();

function init() {
  const airConsole = new AirConsole();

  airConsole.onReady = ready(airConsole);
  airConsole.onMessage = onMessage;

  VERSOMINUS.sendMessage = sendMessage(airConsole);
  VERSOMINUS.sendMessageToScreen = sendMessageToScreen(airConsole);

  VERSOMINUS.playerContainer = document.getElementById(playerContainerSelector);
  VERSOMINUS.enemiesContainer = document.getElementById(enemiesContaienrSelector);
  VERSOMINUS.playerNameContainer = document.getElementById(playerNameSelector);

  VERSOMINUS.actions = {
    left: 'LEFT',
    right: 'RIGHT',
    rotate: 'ROTATE',
  };
}

function ready(airConsole) {
  return function() {
    handshake();
    sendMessage(AirConsole.SCREEN, 'How are you?');
    airConsole.setOrientation(AirConsole.ORIENTATION_LANDSCAPE);
    VERSOMINUS.playerNameContainer.innerHTML = airConsole.getNickname();
  };
}

function handshake(airConsole) {
  return function() {
    airConsole.message(AirConsole.SCREEN, {
      handshake: true,
    });
  };
}

function onMessage(from, data) {
  if (!data || !data.type || !context[data.type])
    return;

  context[data.type](data);
}


function sendMessage(airConsole) {
  return function(to, message) {
    return airConsole.message(to, message);
  };
}

function sendMessageToScreen(airConsole) {
  const to = AirConsole.SCREEN;
  return function(message) {
    return airConsole.message(to, message);
  };
}

function playersList(data) {
  if (!Object.keys(data.enemies).length) {
    return;
  }

  Object.keys(data.enemies).forEach(addEnemy(data.enemies));
}

function addEnemy(enemies) {
  return function(enemyKey) {
    const enemy = enemies[enemyKey];
    const color = PLAYER_COLORS[enemy.playerNumber];

    if (!color) {
      return;
    }

    const enemyElement = document.createElement('DIV');
    enemyElement.className = `Controller-button Controller-enemy${color}`;
    enemyElement.innerHTML = enemy.nickName;
    enemyElement.id = `js-Enemy-${enemy.playerNumber}`;

    if (playerExists(enemy.playerNumber)) {
      return;
    }

    VERSOMINUS.enemiesContainer.appendChild(enemyElement);
  };
}

function playerExists(playerNumber) {
  const id = `js-Enemy-${playerNumber}`;

  return document.getElementById(id);
}

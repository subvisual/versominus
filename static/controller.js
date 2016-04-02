/*global AirConsole VERSOMINUS*/

VERSOMINUS = {};

var PLAYER_COLORS = {
  0: ' Background--blue',
  1: ' Background--green',
  2: ' Background--yellow',
  3: ' Background--red'
};

var context = this;
var playerNameSelector = 'js-PlayerName';
var playerContainerSelector = 'js-Player';
var enemiesContaienrSelector = 'js-Enemies';


init();

function init() {
  var airConsole = new AirConsole();

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
    rotate: 'ROTATE'
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
      handshake: true
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
  var to = AirConsole.SCREEN;
  return function(message) {
    return airConsole.message(to, message);
  };
}

function playersList(data) {
  // console.log('playersList', data);
}

function setPlayer(data) {
  var color = PLAYER_COLORS[data.player.playerNumber];

  console.log(data, color);
  if (!color)
    return;

  VERSOMINUS.playerContainer.className += color;
}

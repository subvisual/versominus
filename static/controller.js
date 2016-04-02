/*global AirConsole VERSOMINUS*/

var playerNameSelector = 'js-PlayerName';

VERSOMINUS = {};

init();

function init() {
  var airConsole = new AirConsole();

  airConsole.onReady = ready(airConsole);
  airConsole.onMessage = onMessage(airConsole);

  VERSOMINUS.sendMessage = sendMessage(airConsole);
  VERSOMINUS.sendMessageToScreen = sendMessageToScreen(airConsole);
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
  console.log(from, data); // eslint-disable-line
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

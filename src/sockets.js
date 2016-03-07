import io from 'socket.io-client';
import store from './store';
import * as dataAction from './actions/data';

window.socket = io.connect();
window.mySocketId = null;

socket.on('you are', function (socketId) {
  window.mySocketId = socketId;
});

socket.on('another player has joined', function (challengerId, challengerColor) {
  store.dispatch(dataAction.addPlayer(challengerColor, challengerId));
});

socket.on('no one is playing for team', function (team) {
  store.dispatch(dataAction.deletePlayer(team));
});

socket.on('another player has choosen', function (color, symbol) {
  store.dispatch(dataAction.setPlayerSymbol(color, symbol));
});

socket.on('clear symbols', function () {
  store.dispatch(dataAction.playNewGame());
});

/**
 * Actions
 */

export const ADD_PLAYER = 'ADD_PLAYER';
export const DELETE_PLAYER = 'DELETE_PLAYER';
export const SET_PLAYER_SYMBOL = 'SET_PLAYER_SYMBOL';
export const CLEAR_SYMBOLS = 'CLEAR_SYMBOLS';

/**
 * Action creators
 */

export function addPlayer(color, id) {
  return {
    type: ADD_PLAYER,
    payload: {
      color,
      joinedAt: Date.now(),
      id,
      status: 'isChoosing',
      statusText: 'est en train de choisir..',
    },
  };
}

export function deletePlayer(color) {
  return {
    type: DELETE_PLAYER,
    payload: color,
  };
}

export function playNewGame() {
  return {
    type: CLEAR_SYMBOLS,
    payload: {
      status: 'isChoosing',
      statusText: 'est en train de choisir..',
      symbol: null,
    },
  };
}

export function setPlayerSymbol(color, symbol) {
  return {
    type: SET_PLAYER_SYMBOL,
    target: color,
    payload: {
      symbol,
      status: 'hasChoosen',
      statusText: 'vient de faire son choix !',
    },
  };
}

import { Map, Record } from 'immutable';
import Player from '../records/Player'

const InitialState = Record({
  players: Map(),
});

const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
// const revive = ({ data }) => initialState.merge({
//   data: Map(data).data(player => new Player(player))
// });

export default (state = initialState, action) => {
  // if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {
    case 'ADD_PLAYER':
      const player = new Player(action.payload);
      return state
        .update('players', players => players.set(player.color, player));

    case 'DELETE_PLAYER':
      return state
        .update('players', players => players.delete(action.payload));

    case 'SET_PLAYER_SYMBOL':
      return state
        .mergeIn(['players', action.target], action.payload);

    case 'CLEAR_SYMBOLS':
      return state
        .set('players', state.players.map(val => val.merge(action.payload)));

    default:
      return state;
  }
};

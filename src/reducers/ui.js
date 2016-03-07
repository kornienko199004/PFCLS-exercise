import { Record } from 'immutable';

const InitialState = Record({
  selectedSymbol: 'ciseaux',
});

const initialState = new InitialState;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_SYMBOL':
      return state.set('selectedSymbol', action.payload);

    default:
      return state;
  }
};

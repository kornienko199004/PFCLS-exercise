import { createStore, combineReducers, applyMiddleware } from 'redux';

import data from './reducers/data';
import ui from './reducers/ui';

const middleware = [];

const thunkMiddleware = ({ dispatch, getState }) => {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action);
};

// dependency on redux-logger package
// const logger = createLogger({
//   collapsed: true,
//   // Convert immutable to JSON.
//   stateTransformer: state => JSON.parse(JSON.stringify(state))
// });

// Logger must be the last middleware in chain.
middleware.push(thunkMiddleware/*, logger */);

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const combinedReducers = combineReducers({ data, ui });
const store = createStoreWithMiddleware(combinedReducers);

// log store changes
// store.subscribe(() => {
//   // console.log(store.getState().data.players.size);
//   // console.log(store.getState().data.players.toJS());
//   // console.log(store.getState().ui.selectedSymbol);
// });

export default store;

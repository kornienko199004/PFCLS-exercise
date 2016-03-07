import React from 'react';
import PlayerStatus from './PlayerStatus';
import Board from './Board';
import GameEnding from './GameEnding';
import store from '../store';
import { Provider } from 'react-redux';
import { getMuiTheme, LightRawTheme } from 'material-ui/lib/styles';

const customTheme = {
  // override theme variables here
};

class ReduxProvider extends React.Component {

  getChildContext() {
    const newMuiTheme = getMuiTheme(LightRawTheme, customTheme);
    return {
      muiTheme: newMuiTheme,
    };
  }

  render() {
    return (
      <Provider store={store}>
          <div className="u-textCenter">
            <div className="my-Canvas Grid">
              <PlayerStatus color="rouge"/>
              <PlayerStatus color="bleu"/>
            </div>
            <div className="my-Canvas">
              <Board />
            </div>
            <div className="my-Canvas">
              <GameEnding />
            </div>
          </div>
      </Provider>
    );
  }
}

ReduxProvider.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default ReduxProvider;

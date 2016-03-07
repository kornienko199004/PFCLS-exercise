import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as uiAction from '../actions/ui';
import RaisedButton from 'material-ui/lib/raised-button';

const symbols = {
  ciseaux: [
    'Les ciseaux décapitent le lézard',
    'Les ciseaux coupent la feuille',
  ],
  feuille: [
    'La feuille désavoue Spock',
    'La feuille envellope la pierre',
  ],
  lezard: [
    'Le lézard mange la feuille',
    'Le lézard empoisonne Spock',
  ],
  pierre: [
    'La pierre émousse les ciseaux',
    'La pierre écrase le lézard',
  ],
  spock: [
    'Spock casse les ciseaux',
    'Spock vaporise la pierre',
  ],
};

let isDisplayed = '';
let bothPlayerHaveChosen = false;

const Board = ({ playersNumber, players, setPlayerSymbol, selectSymbol, selectedSymbol }) => {
  let currentPlayerTeamColor = null;
  let hasChoosen = false;
  let isChoosing = false;

  // look if the spectator has joined the game already
  if (players) {
    const objectToArray = Utils.convertToArray(players);
    objectToArray.forEach(({ id, color, status }) => {
      if (id === mySocketId ) {
        currentPlayerTeamColor = color;
        hasChoosen = status === 'hasChoosen';
        isChoosing = status === 'isChoosing';
      }
    });
  }

  if (playersNumber === 2) {
    const objectToArray = Utils.convertToArray(players);
    const getHasChoosen = R.where({ status: R.equals('hasChoosen') });

    bothPlayerHaveChosen = getHasChoosen(objectToArray[0]) && getHasChoosen(objectToArray[1]);
    isDisplayed = bothPlayerHaveChosen ? 'none' : 'block';
  } else {
    isDisplayed = 'block';
  }
  return (
    <div className="my-Board u-textCenter my-u-fullWidth my-u-grey" style={{ display: isDisplayed }}>
      { !isChoosing && !hasChoosen ?
        <h3 className="u-inlineBlock my-u-marBot-40">Pour commencer, rejoignez une équipe.</h3>
      : null }
      { hasChoosen ?
        <h2 className="u-inlineBlock">En attente de votre adversaire..</h2>
        :
        <ul>
          { _.map(symbols, (rules, symbol) =>
            <li className="u-inlineBlock" key={symbol}>
              <button className="Button Button--default" onClick={ selectSymbol.bind(null, symbol) }>
                <img src={'./images/symbol-' + symbol + '_thumb.png'} />
              </button>
            </li>
          )}
        </ul>
      }
      <div>
        <img src={'./images/symbol-' + selectedSymbol + '.png'} />
      </div>
      <ul>
        { _.map(symbols[selectedSymbol], (rule, index) =>
          <li key={index}>{ rule }</li>
        )}
      </ul>
      { currentPlayerTeamColor && !hasChoosen ?
        <div className="my-u-marTop-20">
          <RaisedButton onClick={ setPlayerSymbol.bind(null, selectedSymbol, currentPlayerTeamColor) } label="Valider ce choix" />
        </div>
      : null }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedSymbol: state.ui.selectedSymbol,
    playersNumber: state.data.players.size ? state.data.players.size : 0,
    players: state.data.players.size ? state.data.players.toJS() : undefined,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPlayerSymbol(symbol, color) {
      socket.emit('player sets a symbol', symbol, color);
    },
    selectSymbol(symbol) {
      dispatch(uiAction.selectSymbol(symbol));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);

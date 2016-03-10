import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import Result from '../components/Result';
import * as dataAction from '../actions/data';

let isDisplayed = '';
let bothPlayerHaveChosen = false;
let winner = '';
let resultData = {};

const GameEnding = ({ playersNumber, players, playNewGame }) => {
  if (playersNumber === 2) {
    const objectToArray = Utils.convertToArray(players);
    const hasChoosen = R.where({ status: R.equals('hasChoosen') });

    bothPlayerHaveChosen = hasChoosen(objectToArray[0]) && hasChoosen(objectToArray[1]);
    isDisplayed = bothPlayerHaveChosen ? 'block' : 'none';
    if (bothPlayerHaveChosen) {
      winner = Utils.getTheWinner(objectToArray);
      resultData = Utils.findOutIfYouHaveWon(players[winner[1]], players[winner[2]], mySocketId);
    }
  } else {
    isDisplayed = 'none';
  }

  return (
    <div style={{ display: isDisplayed }} className="my-GameEnding my-u-fullWidth my-u-grey">
      <div className="u-textCenter">
          {bothPlayerHaveChosen && resultData ?
            <Result {...resultData} />
          : null}
          {bothPlayerHaveChosen && R.isNil(resultData) ?
            <h1>Match nul</h1>
          : null}
        <RaisedButton className="my-u-marTop-40" onClick={ playNewGame } label="Rejouer une partie" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    playersNumber: state.data.players.size ? state.data.players.size : 0,
    players: state.data.players.size ? state.data.players.toJS() : undefined,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playNewGame() {
      socket.emit('game restarted');
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameEnding);

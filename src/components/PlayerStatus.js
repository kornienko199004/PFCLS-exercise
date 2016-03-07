import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';

const PlayerStatus = ({ color, players, addPlayer }) => {
  let hasJoined = false;
  const bgColor = {
    'rouge': '#F294A8',
    'bleu': '#6BCAFA',
  };

  // look if the spectator has joined the game already
  if (players) {
    const objectToArray = Utils.convertToArray(players);
    objectToArray.forEach(({ id }) => {
      if (id === mySocketId) {
        hasJoined = true;
      }
    });
  }

  return (
    <div className="my-PlayerStatus Grid-cell u-size1of2 u-flex u-flexCol" style={{ backgroundColor: bgColor[color] }}>
      { players && players[color] ?
        <div className="my-PlayerStatus my-PlayerStatus-text">
          {'Joueur ' + color + ' ' + players[color].statusText}
        </div>
        :
        <RaisedButton
          primary={color === 'rouge'}
          className="my-PlayerStatus my-PlayerStatus-btn u-flexGrow1 u-flex u-flexCol"
          secondary={color === 'bleu'}
          onClick={ addPlayer.bind(null, color, hasJoined) }
          label={"Rejoindre l'équipe " + color}
        />
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.data.players.size ? state.data.players.toJS() : undefined,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPlayer(color, hasJoined) {
      // check if user is connected and has not yet joined
      if (mySocketId && !hasJoined) {
        socket.emit('player selects team', color);
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerStatus);

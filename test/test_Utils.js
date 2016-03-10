import test from 'tape';
// import React from 'react';
// import sinon from 'sinon';
// import { shallow } from 'enzyme';
import Utils from '../src/utils';
import Player from '../src/records/Player';

const fixtures = {};
const init = () => {

  const player1 = new Player({color: 'rouge', symbol: 'lezard'});
  const player2 = new Player({color: 'bleu', symbol: 'spock'});

  fixtures.players = [player1, player2];
};
const destroy = () => {
  delete fixtures.players;
};
function wrapper(description, fn) {
  test(description, function (t) {
    init();
    fn(t);
    destroy();
  });
}

wrapper("setting player's color", (assert) => {
  assert.equal(fixtures.players[0].color, 'rouge');
  assert.end();
});

wrapper("setting player's symbol", (assert) => {
  assert.equal(fixtures.players[0].symbol, 'lezard');
  assert.end();
});

wrapper("checking for a win", (assert) => {
  const winner = Utils.getTheWinner(fixtures.players)[1];
  assert.equal(winner, 'rouge');
  assert.end();
});

wrapper("checking for a draw", (assert) => {
  fixtures.players[0] = new Player({symbol: 'spock'});
  const result = Utils.findOutIfYouHaveWon(fixtures.players[0], fixtures.players[1], undefined)
  assert.equal(result, null);
  assert.end();
});

// Other useful test tools

// assert.throws
// assert.doesNotThrow
// onButtonClick = sinon.spy();
// shallow(<Component onButtonClick={onButtonClick} />).html()

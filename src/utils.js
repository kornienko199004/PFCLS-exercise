import R from 'ramda';

const underscored = (s) => {
  return s.trim().replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
};

const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const Utils = {};

Utils.convertToArray = (obj) => {
  const array = [];
  for (const i in obj) {
    const item = obj[i];
    array.push(item);
  }
  return array;
};

Utils.humanize = (s) => {
  return capitalize(underscored(s).replace(/_id$/, '').replace(/_/g, ' '));
};

const matricePFCLS = {
  pierre: [3, 4],
  feuille: [1, 5],
  ciseaux: [2, 4],
  lezard: [2, 5],
  spock: [1, 3],
};

const verbRelation = {
  pierre: {
    ciseaux: 'émousse',
    lezard: 'écrase'
  },
  feuille: {
    spock: 'désavoue',
    pierre: 'envellope'
  },
  ciseaux: {
    lezard: 'décapitent',
    feuille: 'coupent'
  },
  lezard: {
    spock: 'empoisonne',
    feuille: 'mange'
  },
  spock: {
    ciseaux: 'casse',
    pierre: 'vaporise'
  },
};

const atIndex = (x) => R.keys(matricePFCLS)[x - 1];
const findSymbols = (x) => R.map(atIndex, x);
const isKilling = (x, y) => R.intersection([x], R.concat(findSymbols(matricePFCLS[y]), findSymbols(matricePFCLS[x])));
const mapPlayers = (first, second) => R.isEmpty(isKilling(first.symbol, second.symbol)) ? [first.symbol, first.color, second.color] : [second.symbol, second.color, first.color];

Utils.getTheWinner = (players) => mapPlayers(players[0], players[1]);

Utils.findOutIfYouHaveWon = (winner, looser) => {
  let whoami = "L'équipe " + winner.color + " l'emporte";
  if (winner.id === mySocketId) {
    whoami = "Vous l'emportez";
  }
  if (looser.id === mySocketId) {
    whoami = "Votre adversaire l'emporte";
  }
  if ( winner.symbol === looser.symbol ) {
    return null;
  }
  return {
    whoami,
    winnerSymbol: winner.symbol,
    looserSymbol: looser.symbol,
    verb: verbRelation[winner.symbol][looser.symbol]
  };
};

window.Utils = Utils;
window.R = R;

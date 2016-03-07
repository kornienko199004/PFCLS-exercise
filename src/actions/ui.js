/**
 * Actions
 */

export const SELECT_SYMBOL = 'SELECT_SYMBOL';

/**
 * Action creators
 */

export function selectSymbol(symbol) {
  return {
    type: 'SELECT_SYMBOL',
    payload: symbol,
  };
}

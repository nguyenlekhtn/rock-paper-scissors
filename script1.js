import initGame from './game.js';

function capitalize(str) {
  let arrayStr = [...str.toLowerCase()];
  arrayStr[0] = arrayStr[0].toUpperCase();
  return arrayStr.join('');
}
initGame();

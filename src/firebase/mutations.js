import { colors, NumberOfEachColor, BAG } from '../constants';

const resetGame = ref => ref.set(null).then(() => {
  const tilesRef = ref.child('tiles');
  colors.forEach(color => [...new Array(NumberOfEachColor)].forEach(() => {
    tilesRef.push({ color, location: BAG });
  }));
});

const addPlayer = (ref, name) => ref.child('players').push({ name });

const removePlayer = (ref, key) => ref.child(`players/${key}`).set(null);

export {
  resetGame,
  addPlayer,
  removePlayer,
};
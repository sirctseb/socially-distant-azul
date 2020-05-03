import { colors, NumberOfEachColor, BAG, POT } from '../constants';

const resetGame = ref => ref.set(null).then(() => {
  const tilesRef = ref.child('tiles');
  colors.forEach(color => [...new Array(NumberOfEachColor)].forEach(() => {
    tilesRef.push({ color, location: BAG });
  }));
  ref.child('starter').set({
    location: POT
  });
});

const addPlayer = (ref, name) => ref.child('players').push({ name });

const removePlayer = (ref, key) => ref.child(`players/${key}`).set(null);

export {
  resetGame,
  addPlayer,
  removePlayer,
};
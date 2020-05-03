import { colors, NumberOfEachColor, BAG } from '../constants';

const resetGame = ref => ref.set(null).then(() => {
  const tilesRef = ref.child('tiles');
  colors.forEach(color => [...new Array(NumberOfEachColor)].forEach(() => {
    tilesRef.push({ color, location: BAG });
  }));
})

export {
  resetGame,
};
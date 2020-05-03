const numberOfEachColor = 20;
const BLACK = 'black';
const RED = 'red';
const YELLOW = 'yellow';
const WHITE = 'white';
const BLUE = 'blue';
const colors = [BLACK, RED, YELLOW, WHITE, BLUE];

const BAG = 'bag';

const resetGame = ref => ref.set(null).then(() => {
  colors.forEach(color => [...new Array(numberOfEachColor)].forEach(() => {
    ref.push({ color, location: BAG });
  }));
})

export {
  resetGame,
};
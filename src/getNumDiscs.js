export default game => {
  if (!game) {
    throw new Error('No game found');
  }

  if (!game.players) {
    throw new Error('Unacceptable numer of players');
  }

  switch(Object.keys(game.players).length) {
    case 2:
      return 5;
    case 3:
      return 7;
    case 4:
      return 9;
    default:
      throw new Error('Unacceptable number of players');
  }
}
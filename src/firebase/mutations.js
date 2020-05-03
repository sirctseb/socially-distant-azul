import { colors, NumberOfEachColor, BAG, POT, LID } from '../constants';

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

const pullTile = bag => {
  const selectedIndex = Math.floor(bag.length * Math.random());
  const tile = bag.splice(selectedIndex, 1)[0];

  return [bag, tile];
};

const dumpLid = (ref, game) =>
  Object.keys(game.tiles)
    .filter(({ location }) => location === LID)
    .map(key => {
      ref.child(`tiles/${key}/location`).set(BAG);
      return { ...game.tiles[key], key };
    });

const getNumDiscs = numPlayers => {
  if (numPlayers === 2) {
    return 5;
  }
  if (numPlayers === 3) {
    return 7;
  }
  if (numPlayers === 4) {
    return 9;
  }
  throw new Error('Unacceptable number of players');
}

const deal = (ref, game) => {
  let bag = Object.keys(game.tiles).map(key => ({ key, ...game.tiles[key] }));
  const numDiscs = getNumDiscs(Object.keys(game.players).length);
  let tile;

  for(let disc = 0; disc < numDiscs; disc++) {
    for(let tileIndex = 0; tileIndex < 4; tileIndex++) {
      if (bag.length === 0) {
        bag = dumpLid(ref, game);
      }
      if(bag.length === 0) {
        return;
      }

      [bag, tile] = pullTile(bag);
      ref.child(`tiles/${tile.key}/location`).set(disc);
    }
  }
}

export {
  resetGame,
  addPlayer,
  removePlayer,
  deal,
};
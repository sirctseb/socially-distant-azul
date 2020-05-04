import { colors, NumberOfEachColor, BAG, POT, LID } from '../constants';
import entity from '../entity';
import getNumDiscs from '../getNumDiscs';

const resetGame = ref => ref.set(null).then(() => {
  const tilesRef = ref.child('tiles');
  colors.forEach(color => [...Array(NumberOfEachColor).keys()].forEach(() => {
    tilesRef.push({ color, location: BAG });
  }));
  ref.child('starter').set({
    location: POT
  });
});

const addPlayer = (ref, name, uid) => ref.child('players').push({ name, uid });

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


const deal = (ref, game) => {
  let bag = entity(game.tiles);
  const numDiscs = getNumDiscs(game);
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
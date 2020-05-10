import { colors, NumberOfEachColor, BAG, POT, LID } from '../constants';
import entity from '../entity';
import getNumDiscs from '../getNumDiscs';

const resetGame = ref => ref.update({
  starter: {
    location: POT,
  },
  tiles: null,
}).then(() => {
  const tilesRef = ref.child('tiles');
  colors.forEach(color => [...Array(NumberOfEachColor).keys()].forEach(() => {
    tilesRef.push({ color, location: BAG });
  }));
})

const addPlayer = (ref, name, uid) => ref.child('players').push({ name, uid }).key;

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
  let bag = entity(game.tiles).filter(({ location }) => location === BAG);
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

const takeColorFromDisc = (ref, game, disc, color, playerKey) => {
  entity(game.tiles)
    .filter(tile => tile.location === disc.disc)
    .forEach(tile => {
      const location = tile.color === color ? playerKey : POT;
      ref.child(`tiles/${tile.key}/location`).set(location);
    });
}

const takeColorFromPot = (ref, game, color, playerKey) => {
  entity(game.tiles)
    .filter(tile => tile.location === POT && tile.color === color)
    .forEach(tile => {
      ref.child(`tiles/${tile.key}/location`).set(playerKey)
    });
  if (game.starter.location === POT) {
    ref.child('starter/location').set(playerKey);
  }
}

const discardTileToLid = (ref, tile) => {
  ref.child(`tiles/${tile.key}/location`).set(LID);
}

const discardStarterTileToPot = (ref) => {
  ref.child('starter/location').set(POT);
}

export {
  resetGame,
  addPlayer,
  removePlayer,
  deal,
  takeColorFromDisc,
  takeColorFromPot,
  discardTileToLid,
  discardStarterTileToPot,
};
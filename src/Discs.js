import React from 'react';
import getNumDiscs from './getNumDiscs';
import entity from './entity';
import Disc from './Disc';

import './Discs.css';

export default ({ game, game: { tiles }, onChooseDiscTile }) => {
  const numDiscs = getNumDiscs(game);
  const discs = [...Array(numDiscs).keys()].map(disc => ({
    disc,
    tiles: entity(tiles).filter(tile => tile.location === disc),
  }))
  return <div className="discs">
    {
      discs.map(disc => <Disc key={disc.disc} {...disc} onChooseTile={tile => onChooseDiscTile(disc, tile)} />)
    }
  </div>
};
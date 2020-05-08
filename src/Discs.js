import React from 'react';
import getNumDiscs from './getNumDiscs';
import Tile from './Tile';
import entity from './entity';

import './Disc.css';
import './Discs.css';

const Disc = ({ disc, tiles, onChooseTile }) => <div className="disc">
  {disc}
  {
    tiles.map(tile => <Tile key={tile.key} tile={tile} onClick={() => onChooseTile(tile)} />)
  }
</div>;

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
import React from 'react';
import getNumDiscs from './getNumDiscs';
import Tile from './Tile';
import entity from './entity';

const Disc = ({ disc, tiles }) => <div className="disc">
  {disc}
  {
    tiles.map(tile => <Tile key={tile.key} tile={tile} />)
  }
</div>;

export default ({ game, game: { tiles }}) => {
  const numDiscs = getNumDiscs(game);
  const discs = [...Array(numDiscs).keys()].map(disc => ({
    disc,
    tiles: entity(tiles).filter(tile => tile.location === disc),
  }))
  return <div className="discs">
    {
      discs.map(disc => <Disc key={disc.disc} {...disc} />)
    }
  </div>
};
import React from 'react';
import Tile from './Tile';
import entity from './entity';
import { POT } from './constants';

export default ({ game }) => <div className="pot">
  Pot
  {
    entity(game.tiles).filter(tile => tile.location === POT).map(tile => <Tile tile={tile} />)
  }
</div>
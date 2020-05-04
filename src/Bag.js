import React from 'react';
import { BAG } from './constants';
import Tile from './Tile';
import './Bag.css';
import entity from './entity';

export default ({ game: { tiles } }) => <div className='bag'>
  {
    entity(tiles)
      .filter(
        tile => tile.location === BAG
      ).map(
        tile => <Tile key={tile.key} tile={tile} />
      )
  }
</div>
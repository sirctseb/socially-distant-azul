import React from 'react';
import { BAG } from './constants';
import Tile from './Tile';

const arrayIfy = obj => Object.keys(obj).map(key => ({ ...obj, key }));

export default ({ game: { tiles } }) => <div className='bag'>
  {
    arrayIfy(tiles)
      .filter(
        tile => tile.location === BAG
      ).map(
        tile => <Tile tile={tile} />
      )
  }
</div>
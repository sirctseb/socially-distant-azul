import React from 'react';
import { BAG } from './constants';
import Tile from './Tile';
import './Bag.css';

const arrayIfy = obj => Object.keys(obj).map(key => ({ ...obj[key], key }));

export default ({ game: { tiles } }) => <div className='bag'>
  {
    arrayIfy(tiles)
      .filter(
        tile => tile.location === BAG
      ).map(
        tile => <Tile key={tile.key} tile={tile} />
      )
  }
</div>
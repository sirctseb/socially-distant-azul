import React from 'react';
import { BAG } from './constants';
import Tile from './Tile';
import './Bag.css';
import entity from './entity';

export default ({ game: { tiles }, dealable, onDeal }) => <div className='bag'>
  {
    dealable &&
    <button className="bag__deal" onClick={onDeal}>Deal</button>
  }
  {
    entity(tiles)
      .filter(
        tile => tile.location === BAG
      ).map(
        tile => <Tile key={tile.key} tile={tile} />
      )
  }
</div>
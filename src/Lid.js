import React from 'react';

import Tile from './Tile';
import entity from './entity';
import { LID } from './constants';

import './Lid.css';

export default ({ game: { tiles } }) => <div className="lid">
  {
    entity(tiles).filter(({ location }) => location === LID).map(tile => <Tile key={tile.key} tile={tile} />)
  }
</div>
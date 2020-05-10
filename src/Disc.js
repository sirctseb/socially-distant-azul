import React from 'react';
import Tile from './Tile';

import './Disc.css';

export default ({ disc, tiles, onChooseTile }) => <div className="disc">
  <div className="disc__content">
    {
      tiles.map(tile => <Tile key={tile.key} tile={tile} onClick={() => onChooseTile(tile)} />)
    }
  </div>
</div>;

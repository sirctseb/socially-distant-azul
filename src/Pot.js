import React from 'react';
import Tile from './Tile';
import entity from './entity';
import { POT } from './constants';
import StarterTile from './StarterTile';

export default ({ game, onChooseTile }) => <div className="pot">
  Pot
  {
    entity(game.tiles).filter(tile => tile.location === POT).map(tile => <Tile key={tile.key} tile={tile} onClick={() => onChooseTile(tile)} />)
  }
  {
    game.starter.location === POT && <StarterTile />
  }
</div>
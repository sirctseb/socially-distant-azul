import React from 'react';
import Tile from './Tile';
import entity from './entity';

export default ({ game, player }) => <div className="board">
  { player.name }'s board
  {
    entity(game.tiles).filter(tile => tile.location === player.uid).map(tile => <Tile tile={tile} />)
  }
  {
    game.starter.location === player.uid && 'Starter Tile'
  }
</div>
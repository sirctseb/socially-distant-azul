import React from 'react';
import Tile from './Tile';
import entity from './entity';

export default ({ game, player, onDiscardTile, onDiscardStarterTile, onFocusPlayer }) => <div className="board" onClick={onFocusPlayer}>
  { player.name }'s board
  {
    entity(game.tiles).filter(tile => tile.location === player.key).map(tile => <Tile key={tile.key} tile={tile} onClick={() => onDiscardTile(tile)} />)
  }
  {
    game.starter.location === player.key && <div onClick={onDiscardStarterTile}>Starter Tile</div>
  }
</div>
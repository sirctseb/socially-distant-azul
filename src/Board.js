import React from 'react';
import Tile from './Tile';
import entity from './entity';
import StarterTile from './StarterTile';

export default ({ game, player, onDiscardTile, onDiscardStarterTile, onFocusPlayer, currentPlayer, onDeletePlayer }) => <div className={`board ${currentPlayer ? 'board--current' :''}`} onClick={onFocusPlayer}>
  { player.name }'s board
  <button onClick={onDeletePlayer}>Leave Game</button>
  {
    entity(game.tiles).filter(tile => tile.location === player.key).map(tile => <Tile key={tile.key} tile={tile} onClick={() => onDiscardTile(tile)} />)
  }
  {
    game.starter.location === player.key && <StarterTile onClick={onDiscardStarterTile} />
  }
</div>
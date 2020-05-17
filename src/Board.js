import React from 'react';
import Tile from './Tile';
import entity from './entity';
import StarterTile from './StarterTile';

import './Board.css';

export default ({ game, player, localPlayer, onDiscardTile, onDiscardStarterTile, onFocusPlayer, currentPlayer, onDeletePlayer }) => <div className={`board ${currentPlayer ? 'board--current' :''}`} onClick={onFocusPlayer}>
  <div className="board__name">{ player.name }</div>
  <div className="board__tiles">
    {
      entity(game.tiles).filter(tile => tile.location === player.key).map(tile => <Tile key={tile.key} tile={tile} onClick={() => onDiscardTile(tile)} />)
    }
    {
      game.starter.location === player.key && <StarterTile onClick={onDiscardStarterTile} />
    }
  </div>
  <div>
    { localPlayer && <button onClick={onDeletePlayer} className="board__leave-game">Leave Game</button> }
  </div>
</div>
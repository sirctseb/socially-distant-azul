import React, { useState } from 'react';

import './Header.css';

const Reset = ({ onReset }) => <div className="header__reset">
  <button onClick={onReset} className="header__reset-button">Reset Game</button>
</div>

export default ({ guide, onReset, onAddPlayer }) => {
  const [playerName, setPlayerName] = useState('');

  return <div className="header">
    <div className="header__title">
      Socially Distant Azul
    </div>
    <div className="header__guide">{ guide }</div>
    {
      onAddPlayer &&
      <label className="header__add-player">
        <input className="header__add-player-input" placeholder="Player Name" value={playerName} onChange={({ target: { value } }) => setPlayerName(value)} />
        <button className="header__add-player-button" onClick={() => setPlayerName('') || onAddPlayer(playerName)}>Add Player</button>
      </label>
    }
    <Reset onReset={onReset} />
  </div>;
}
import React, { useState } from 'react';

const Player = ({ player: { key, name }, onDeletePlayer }) => <div className="player">
  <div className="player__name">
    { name }
  </div>
  <button onClick={() => onDeletePlayer(key)}>
    Leave game
  </button>
</div>

export default ({ players = [], onAddPlayer, onDeletePlayer }) => {
  const [name, setName] = useState('');

  const onAddPlayerClick = () => {
    onAddPlayer(name);
    setName('');
  }

  return <div className='players'>
    {
      players.map(player => <Player key={player.key} player={player} onDeletePlayer={onDeletePlayer} />)
    }
    <label>
      Player name <input onChange={({ target: { value } }) => setName(value)} />
    </label>
    <button onClick={onAddPlayerClick}>Add Player</button>
  </div>;
}
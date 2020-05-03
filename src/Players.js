import React, { useState } from 'react';

const Player = ({ player: { key, name }, onDeletePlayer }) => <div className="player">
  <div className="player__name">
    { name }
  </div>
  <button onClick={() => onDeletePlayer(key)}>
    Leave game
  </button>
</div>

export default ({ game: { players = {}}, onAddPlayer, onDeletePlayer }) => {
  const [name, setName] = useState('');

  const onAddPlayerClick = () => {
    onAddPlayer(name);
    setName('');
  }

  return <div className='players'>
    {
      Object.keys(players).map(key => <Player key={key} player={{...players[key], key}} onDeletePlayer={onDeletePlayer} />)
    }
    <label>
      Player name <input onChange={({ target: { value } }) => setName(value)} />
    </label>
    <button onClick={onAddPlayerClick}>Add Player</button>
  </div>;
}
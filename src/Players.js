import React, { useState } from 'react';

export default ({ onAddPlayer }) => {
  const [name, setName] = useState('');

  const onAddPlayerClick = () => {
    onAddPlayer(name);
    setName('');
  }

  return <div className='players'>
    <label>
      Player name <input value={name} onChange={({ target: { value } }) => setName(value)} />
    </label>
    <button onClick={onAddPlayerClick}>Add Player</button>
  </div>;
}
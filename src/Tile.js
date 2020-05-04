import React from 'react';
import './Tile.css';

export default ({ tile: { color, key }, onClick }) => <div key={key} className={`tile tile--${color}`} onClick={onClick} />
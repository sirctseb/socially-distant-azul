import React from 'react';
import './Tile.css';

export default ({ tile: { color, key } }) => <div key={key} className={`tile tile--${color}`} />
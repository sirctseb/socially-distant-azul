import React from 'react';

import './Boards.css';

export default ({ children }) => <div className="boards">
  <div className="boards__title">Player Boards</div>
  <div className="boards__boards">
    { children }
  </div>
</div>;
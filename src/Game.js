import React, { useState, useEffect, useRef } from 'react';
import Bag from './Bag';
import firebase from './firebase';
import { resetGame } from './firebase/mutations';
import 'firebase/database';

export default () => {
  const [game, setGame] = useState({});
  const gameRef = useRef();
  gameRef.current = firebase.database().ref();
  useEffect(
    () => {
      gameRef.current.on('value', snapshot => setGame(snapshot.val()));
      return () => gameRef.current.off();
    },
    []);

  if (!game || !game.tiles) {
    return 'loading game';
  }

  return <div>
    <Bag game={game} />
    <button onClick={() => resetGame(gameRef.current)}>Reset game</button>
  </div>;
}
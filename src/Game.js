import React, { useState, useEffect, useRef } from 'react';
import Bag from './Bag';
import Players from './Players';
import firebase from './firebase';
import { resetGame, addPlayer, removePlayer } from './firebase/mutations';
import 'firebase/database';

export default () => {
  const [game, setGame] = useState({});
  const gameRef = useRef();
  gameRef.current = firebase.database().ref();
  const gameDb = gameRef.current;
  useEffect(
    () => {
      gameDb.on('value', snapshot => setGame(snapshot.val()));
      return () => gameDb.off();
    },
    [gameDb]);

  if (!game || !game.tiles) {
    return 'loading game';
  }

  const onDeletePlayer = key => removePlayer(gameDb, key);
  const onAddPlayer = name => addPlayer(gameDb, name);

  return <div>
    <Bag game={game} />
    <button onClick={() => resetGame(gameDb)}>Reset game</button>
    <Players game={game} onDeletePlayer={onDeletePlayer} onAddPlayer={onAddPlayer} />
  </div>;
}
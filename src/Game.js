import React, { useState, useEffect, useRef } from 'react';
import Bag from './Bag';
import Players from './Players';
import Discs from './Discs';
import firebase from './firebase';
import { resetGame, addPlayer, removePlayer, deal } from './firebase/mutations';
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
  const players = Object.keys(game.players).length > 1;

  return <div>
    {players && <Bag game={game} />}
    {players && <Discs game={game} />}
    <button onClick={() => deal(gameDb, game)}>Deal</button>
    <button onClick={() => resetGame(gameDb)}>Reset game</button>
    <Players game={game} onDeletePlayer={onDeletePlayer} onAddPlayer={onAddPlayer} />
  </div>;
}
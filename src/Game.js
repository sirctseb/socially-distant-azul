import React, { useState, useEffect, useRef } from 'react';
import Bag from './Bag';
import Players from './Players';
import Discs from './Discs';
import Board from './Board';
import Pot from './Pot';
import firebase from './firebase';
import { resetGame, addPlayer, removePlayer, deal, takeColorFromDisc, takeColorFromPot } from './firebase/mutations';
import 'firebase/database';
import 'firebase/auth';

export default () => {
  const [game, setGame] = useState({});
  const [user, setUser] = useState(null);
  const gameRef = useRef();
  gameRef.current = firebase.database().ref();
  const gameDb = gameRef.current;
  useEffect(
    () => {
      gameDb.on('value', snapshot => setGame(snapshot.val()));
      return () => gameDb.off();
    },
    [gameDb]);
  useEffect(
    () => {
      firebase.auth().signInAnonymously().then(({ user }) => setUser(user)).catch(() => console.log('error logging in'));
    },
    []
  );

  if (!game || !game.tiles) {
    return 'loading game';
  }

  const onDeletePlayer = key => removePlayer(gameDb, key);
  const onAddPlayer = name => addPlayer(gameDb, name, user.uid);
  const onChooseDiscTile = (disc, tile) => takeColorFromDisc(gameDb, game, disc, tile.color, user.uid);
  const onChoosePotTile = tile => takeColorFromPot(gameDb, game, tile.color, user.uid);
  const players = Object.keys(game.players || {}).length > 1;

  return <div>
    {players && <Bag game={game} />}
    {players && <Discs game={game} onChooseDiscTile={onChooseDiscTile} />}
    {players && <Pot game={game} onChooseTile={onChoosePotTile} />}
    <button onClick={() => deal(gameDb, game)}>Deal</button>
    <button onClick={() => resetGame(gameDb)}>Reset game</button>
    <Players game={game} onDeletePlayer={onDeletePlayer} onAddPlayer={onAddPlayer} />
    {players && <Board game={game} player={Object.values(game.players).find(({ uid }) => uid === user.uid)} />}
  </div>;
}
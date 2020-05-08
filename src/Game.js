import React, { useState, useEffect, useRef } from 'react';
import Bag from './Bag';
import Players from './Players';
import Discs from './Discs';
import Board from './Board';
import Pot from './Pot';
import firebase from './firebase';
import { resetGame, addPlayer, removePlayer, deal, takeColorFromDisc, takeColorFromPot, discardTileToLid, discardStarterTileToPot } from './firebase/mutations';
import entity from './entity';
import 'firebase/database';
import 'firebase/auth';

export default () => {
  const [game, setGame] = useState({});
  const [user, setUser] = useState(null);
  const [currentPlayerKey, setCurrentPlayerKey] = useState(null);
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

  const players = entity(game.players || {});
  const localPlayers = players.filter(player => player.uid === user.uid);
  const currentPlayer = players.find(player => player.key === currentPlayerKey) || (players.length < 0 ? players[0] : null);
  const enoughPlayers = players.length > 1;

  const onDeletePlayer = key => removePlayer(gameDb, key);
  const onAddPlayer = name => setCurrentPlayerKey(addPlayer(gameDb, name, user.uid));
  const onChooseDiscTile = (disc, tile) => takeColorFromDisc(gameDb, game, disc, tile.color, currentPlayer.key);
  const onChoosePotTile = tile => takeColorFromPot(gameDb, game, tile.color, currentPlayer.key);
  const onDiscardTile = tile => discardTileToLid(gameDb, tile);
  const onDiscardStarterTile = () => discardStarterTileToPot(gameDb);

  return <div>
    {enoughPlayers && <Bag game={game} />}
    {enoughPlayers && <Discs game={game} onChooseDiscTile={onChooseDiscTile} />}
    {enoughPlayers && <Pot game={game} onChooseTile={onChoosePotTile} />}
    <button onClick={() => deal(gameDb, game)}>Deal</button>
    <button onClick={() => resetGame(gameDb)}>Reset game</button>
    <Players players={players} onDeletePlayer={onDeletePlayer} onAddPlayer={onAddPlayer} />
    {
      enoughPlayers && localPlayers.map(player =>
        <Board key={player.key}
          current={!!currentPlayer && currentPlayer.key === player.key}
          game={game}
          player={player}
          onDiscardTile={onDiscardTile}
          onDiscardStarterTile={onDiscardStarterTile}
          onFocusPlayer={() => setCurrentPlayerKey(player.key)} />
      )
    }
  </div>;
}
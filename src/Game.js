import React, { useState, useEffect, useRef } from 'react';
import Bag from './Bag';
import Lid from './Lid';
import Header from './Header';
import Discs from './Discs';
import TopStuff from './TopStuff';
import Board from './Board';
import Pot from './Pot';
import firebase from './firebase';
import {
  resetGame,
  addPlayer,
  removePlayer,
  deal,
  takeColorFromDisc,
  takeColorFromPot,
  discardTileToLid,
  discardStarterTileToPot,
} from './firebase/mutations';
import entity from './entity';
import derivedState from './derivedState';
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

  const { pregame, discardState, dealable } = derivedState(game);

  const players = entity(game.players || {});

  const onDeletePlayer = key => removePlayer(gameDb, key);
  const onAddPlayer = name => addPlayer(gameDb, name, user.uid);
  const onChooseDiscTile = (disc, tile) => takeColorFromDisc(gameDb, game, disc, tile.color);
  const onChoosePotTile = tile => takeColorFromPot(gameDb, game, tile.color);
  const onDiscardTile = tile => discardTileToLid(gameDb, tile);
  const onDiscardStarterTile = () => discardStarterTileToPot(gameDb);

  return <div>
    <Header
      guide={
        pregame ? 'Deal when ready!' :
        discardState ? 'Move finished tiles to the lid' :
        /*drawState && */'Pick a color from a disc or the pot'
      }
      onReset={() => resetGame(gameDb)}
      onAddPlayer={players.length < 4 && onAddPlayer}
    />
    <TopStuff>
      <Lid game={game} />
      <Bag game={game} dealable={dealable} onDeal={() => deal(gameDb, game)} />
    </TopStuff>
    { !pregame && <Pot game={game} onChooseTile={onChoosePotTile} /> }
    { !pregame && <Discs game={game} onChooseDiscTile={onChooseDiscTile} /> }
    {
      players.map(player =>
        <Board key={player.key}
          currentPlayer={player.key === game.currentPlayer}
          localPlayer={player.uid === user.uid}
          game={game}
          player={player}
          onDiscardTile={onDiscardTile}
          onDiscardStarterTile={onDiscardStarterTile}
          onDeletePlayer={() => onDeletePlayer(player.key)} />
      )
    }
  </div>;
}
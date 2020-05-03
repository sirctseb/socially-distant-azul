import { useState, useEffect } from 'react';
import firebase from './firebase';
import 'firebase/database';

export default () => {
  const [game, setGame] = useState({});
  useEffect(
    () => {
      firebase.database().ref().on('value', snapshot => setGame(snapshot.val()));
      return () => firebase.database().ref().off();
    },
    []);

  return game && game.hello || null;
}
import { useState, useEffect } from 'react';
import firebase from './firebase';
import 'firebase/database';

export default () => {
  const [game, setGame] = useState({});
  useEffect(() => firebase.database().ref().once('value').then(snapshot => setGame(snapshot.val())), []);

  return game && game.hello || null;
}
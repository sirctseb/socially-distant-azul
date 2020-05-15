import { BAG, POT } from './constants';

const inDisc = location => [0,1,2,3,4,5,6,7,8].includes(location);

export default game => {

  const tiles = Object.values(game.tiles);
  const pregame = tiles.every(({ location }) => location === BAG);
  const drawState = tiles.some(({ location }) => location === POT || inDisc(location));
  const discardState = !pregame && !drawState;
  const dealable = !drawState && game.starter.location === POT;

  return {
    pregame,
    discardState,
    drawState: !pregame && !discardState,
    dealable,
  };
}
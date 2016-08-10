import { createAction } from 'reflux';

export const playerAction = createAction();
export const rotate = createAction();
export const moveLeft = createAction();
export const moveRight = createAction();

playerAction.listen(function(player, data) {
  switch(data.type) {
    case 'ROTATE':
      rotate(player);
      break;
    case 'LEFT':
      moveLeft(player);
      break;
    case 'RIGHT':
      moveRight(player);
      break;
  }
});

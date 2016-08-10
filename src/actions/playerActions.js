import { createAction } from 'reflux';

export const sendConnect = createAction();
export const sendMessage = createAction();
export const receiveMessage = createAction();
export const receiveConnect = createAction();

export default { receiveConnect, receiveMessage, sendConnect, sendMessage };

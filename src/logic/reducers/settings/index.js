import { createActions, createReducer } from 'reduxsauce';

import { setProp, updateProps } from '../shared';

const initialState = {};

export const { Creators, Types } = createActions(
  {
    setProp: ['key', 'payload'],
    updateProps: ['props'],
  },
  { prefix: 'settings/' },
);

export default createReducer(initialState, {
  [Types.SET_PROP]: setProp,
  [Types.UPDATE_PROPS]: updateProps,
});

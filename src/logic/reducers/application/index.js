import { createActions, createReducer } from 'reduxsauce';

import { setProp, updateProps } from '../shared';

const initialState = {};

export const { Creators, Types } = createActions(
  {
    generalFail: null,
    onLocationChange: null,
    rehydrated: null,
    reset: null,

    setProp: ['key', 'payload'],
    updateProps: ['props'],
  },
  { prefix: 'application/' },
);

export default createReducer(initialState, {
  [Types.SET_PROP]: setProp,
  [Types.UPDATE_PROPS]: updateProps,
});

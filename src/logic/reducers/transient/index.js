import { createActions, createReducer } from 'reduxsauce';

import { setProp, updateProps } from '../shared';

const initialState = {};

export const { Creators, Types } = createActions(
  {
    loading: ['props'],
    reset: null,
    setProp: ['key', 'payload'],
    updateProps: ['props'],
  },
  { prefix: 'transient/' },
);

const reset = () => initialState;

export default createReducer(initialState, {
  [Types.LOADING]: updateProps,
  [Types.RESET]: reset,
  [Types.SET_PROP]: setProp,
  [Types.UPDATE_PROPS]: updateProps,
});

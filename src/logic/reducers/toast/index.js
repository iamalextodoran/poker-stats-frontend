import { createActions, createReducer } from 'reduxsauce';

import { keyNotEqualToValue } from 'Helpers';

import { produce } from '../shared';

const initialState = {
  toasts: [],
};

export const { Creators, Types } = createActions(
  {
    createToasts: ['toasts'],

    popToasts: ['items'],
    pushToasts: ['items'],
  },
  { prefix: 'toast/' },
);

const popToasts = (state, { items }) =>
  produce(state, draft => {
    items.forEach(item => {
      draft.toasts = draft.toasts.filter(keyNotEqualToValue.bind(null, 'id', item.id));
    });
  });

const pushToasts = (state, { items }) =>
  produce(state, draft => {
    draft.toasts = [...state.toasts, ...items];
  });

export default createReducer(initialState, {
  [Types.POP_TOASTS]: popToasts,
  [Types.PUSH_TOASTS]: pushToasts,
});

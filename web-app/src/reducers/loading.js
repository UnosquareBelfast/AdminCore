import { SET_LOADING } from '../actionTypes';

export const initialState = {
  loading: false,
  startedAt: null,
};

// Reducer
export default function loadingReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

// Handlers
const ACTION_HANDLERS = {
  [SET_LOADING]: (state, action) => ({
    ...state,
    loading: action.payload.isLoading,
    startedAt: action.payload.startedAt,
  }),
};

// Private Selectors
export const isLoading = store => store.loading;
export const loadingSince = store => store.startedAt;

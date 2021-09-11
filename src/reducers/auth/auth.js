import {
  SIGN_IN,
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  LOG_OUT
} from '../../actions/action-type';

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {}
};

export const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      return { ...state, ...payload };
    case LOG_OUT:
      return { ...state, loading: false, isAuthenticated: false, user: {} };
    case GET_USER_PROFILE:
      return { ...state, ...payload };
    case GET_USER_PROFILE_FAIL:
      return { ...state, ...payload };
    default:
      return state;
  }
};

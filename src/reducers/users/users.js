import { GET_USER_LIST, DELETE_USER } from '../../actions/action-type';

const initialState = {
  loading: true,
  data: {}
};

export const users = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_LIST:
      return { ...state, ...payload };
    case DELETE_USER:
      return { ...state, data: { ...state.data, ...payload } };

    default:
      return state;
  }
};

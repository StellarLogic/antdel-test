import { GET_AGENT_LIST } from '../../actions/action-type';

const initialState = {
  loading: true,
  data: {}
};

export const agents = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_AGENT_LIST:
      console.log(payload);
      return { ...state, ...payload };

    default:
      return state;
  }
};

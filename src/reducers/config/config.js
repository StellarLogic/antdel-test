import {
  ADD_TAGS,
  GET_TAGS,
  DELETE_TAGS,
  GET_TEAMS,
  GET_COUNTRIES
} from '../../actions/action-type';

const initialState = {
  tags: {
    loading: true,
    list: []
  },
  teams: {
    loading: true,
    list: []
  },
  countries: {
    loading: true,
    list: []
  }
};

export const config = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TAGS:
      return { ...state, tags: { ...state.tags, list: payload } };
    case GET_TAGS:
      return { ...state, tags: { ...state.tags, ...payload } };
    case DELETE_TAGS:
      return { ...state, tags: { ...state.tags, list: payload } };
    case GET_TEAMS:
      return { ...state, teams: { ...state.teams, ...payload } };
    case GET_COUNTRIES:
      return { ...state, countries: { ...state.countries, ...payload } };
    default:
      return state;
  }
};

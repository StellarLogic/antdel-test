import { toast } from 'react-toastify';
import { notification } from '../../utils/notification';
import axios from '../../utils/axios';
import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_AGENT_LIST,
  UPDATE_USER_PROFILE
} from '../action-type';
import { handleResponseError } from '../../utils/handleResponseError';

export const addAgent = (payload) => async (dispatch) => {
  try {
    const { data, message } = await axios.post(`/user/agent_register`, payload);
    // notification.success(message);
    handleResponseError(data);

    return data;
  } catch (error) {
    console.log(`error`, error);
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload: { loading: false, isAuthenticated: true, user: {} }
    });
  }
};

export const getAgentListing = (currentPage, perPage) => async (dispatch) => {
  try {
    const { data } = await axios.get(`user/agent_listing?page=${currentPage}&per_page=${perPage}`);

    const callBack = () =>
      dispatch({
        type: GET_AGENT_LIST,
        payload: {
          loading: false,
          data: { ...data.data, total_page: data.total_page }
        }
      });

    handleResponseError(data, callBack);

    return data;
  } catch (error) {
    return console.log(`error`, error);
  }
};

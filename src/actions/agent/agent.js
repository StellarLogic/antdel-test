import { toast } from 'react-toastify';
import { notification } from '../../utils/notification';
import axios from '../../utils/axios';
import { GET_USER_PROFILE, GET_USER_PROFILE_FAIL, UPDATE_USER_PROFILE } from '../action-type';
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

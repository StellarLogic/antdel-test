import { toast } from 'react-toastify';
import { notification } from '../../utils/notification';
import axios from '../../utils/axios';
import { GET_USER_PROFILE, GET_USER_PROFILE_FAIL, UPDATE_USER_PROFILE } from '../action-type';
import { handleResponseError } from '../../utils/handleResponseError';

export const getUserProfile = async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_PROFILE,
      payload: {
        loading: true
      }
    });
    const { data } = await axios.get(`/user/profile`);
    dispatch({
      type: GET_USER_PROFILE,
      payload: {
        loading: false,
        isAuthenticated: true,
        user: data?.data
      }
    });
    return data;
  } catch (error) {
    localStorage.clear();
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload: { loading: false, isAuthenticated: false, user: {} }
    });
    const { data } = error.response;
    if (data?.error) return data.error.map((error) => notification.error(error?.msg));
  }
};

export const updateUserProfile = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/user/update-profile`, payload);
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: {
        user: data?.data
      }
    });
    return data;
  } catch (error) {
    const { data } = error.response;
    if (data?.error) return data.error.map((error) => notification.error(error?.msg));
  }
};

export const updatePassword = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/user/change-password`, payload);
    console.log(`data-2`, data);

    const callBack = () => {
      dispatch({
        type: GET_USER_PROFILE,
        payload: {
          loading: false,
          isAuthenticated: true,
          user: data?.data
        }
      });
    };

    handleResponseError(data, callBack);

    return data;
  } catch (error) {
    const { data } = error.response;
    if (data?.error) return data.error.map((error) => notification.error(error?.msg));
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload: { loading: false, isAuthenticated: true, user: {} }
    });
  }
};

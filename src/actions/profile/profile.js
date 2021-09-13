import { toast } from 'react-toastify';
import axios from '../../utils/axios';
import { GET_USER_PROFILE, GET_USER_PROFILE_FAIL, UPDATE_USER_PROFILE } from '../action-type';

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
    console.log(`error`, error);
  }
};

export const updatePassword = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/user/change-password`, payload);
    console.log(`data`, data);
    // dispatch({
    //   type: GET_USER_PROFILE,
    //   payload: {
    //     loading: false,
    //     isAuthenticated: true,
    //     user: data?.data
    //   }
    // });
    return data;
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload: { loading: false, isAuthenticated: true, user: {} }
    });
  }
};

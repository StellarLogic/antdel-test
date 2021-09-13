import { toast } from 'react-toastify';
import axios from '../../utils/axios';
import { SIGN_IN, LOG_OUT } from '../action-type';

export const logIn = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/user/login`, payload);
    if (data) {
      await localStorage.setItem('token', data?.token);
      dispatch({ type: SIGN_IN, payload: { loading: false, isAuthenticated: true } });
    } else {
      dispatch({ type: SIGN_IN, payload: { loading: false, isAuthenticated: false } });
    }
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: SIGN_IN, payload: { loading: false, isAuthenticated: false } });
  }
};

export const logOut = (dispatch) => {
  dispatch({ type: LOG_OUT });
  localStorage.clear();
};

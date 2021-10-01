import axios from '../../utils/axios';
import { GET_USER_LIST, DELETE_USER, GET_USER_FAILED } from '../action-type';
import { handleResponseError } from '../../utils/handleResponseError';

export const addUser = async (payload) => {
  try {
    const { data } = await axios.post(`/user/user_register`, payload);
    handleResponseError(data);

    return data;
  } catch (error) {
    return console.log(`error`, error);
  }
};

export const updateUser = async (agentId, payload) => {
  try {
    const { data } = await axios.post(`/user/user_register/${agentId}`, payload);
    handleResponseError(data);

    return data;
  } catch (error) {
    return console.log(`error`, error);
  }
};

export const getUserListing = (currentPage, perPage) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_LIST,
      payload: {
        loading: true
      }
    });
    const { data } = await axios.get(`/user/user_list?page=${currentPage}&per_page=${perPage}`);

    const callBack = () =>
      dispatch({
        type: GET_USER_LIST,
        payload: {
          loading: false,
          data: { ...data.data, total_page: data.total_page }
        }
      });

    handleResponseError(data, { callBack, showAlert: false });

    return data;
  } catch (error) {
    console.log(`error`, error);
    return dispatch({
      type: GET_USER_FAILED,
      payload: {
        loading: false,
        data: { content: [] }
      }
    });
  }
};

export const deleteUser = (agentId, updatedList) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/user/user_delete`, { data: { id: agentId } });

    const callBack = () =>
      dispatch({
        type: DELETE_USER,
        payload: { rows: updatedList }
      });

    handleResponseError(data, callBack);

    return data;
  } catch (error) {
    return console.log(`error`, error);
  }
};

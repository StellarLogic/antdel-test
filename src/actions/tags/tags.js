import axios from '../../utils/axios';
import { DELETE_TAGS, ADD_TAGS } from '../action-type';
import { handleResponseError } from '../../utils/handleResponseError';

export const addTag = async (payload) => {
  try {
    const { data } = await axios.post(`tags/create`, payload);

    return handleResponseError(data, {
      showAlert: true
    });
  } catch (error) {
    return console.log(`error`, error);
  }
};

export const deleteTags = (tagId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`tags/delete/${tagId}`);
    // const callBack = () => {
    //   dispatch({
    //     type: DELETE_TAGS,
    //     payload: list
    //   });
    // };

    return handleResponseError(data, { showAlert: true });
  } catch (error) {
    return console.log(`error`, error);
  }
};

export const updateTag = async (id, payload) => {
  try {
    const { data } = await axios.put(`tags/update/${id}`, payload);
    return handleResponseError(data, { showAlert: true });
  } catch (error) {
    return console.log(`error`, error);
  }
};

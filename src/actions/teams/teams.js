import axios from '../../utils/axios';
import { DELETE_TAGS, ADD_TAGS } from '../action-type';
import { handleResponseError } from '../../utils/handleResponseError';

export const addTeam = async (payload) => {
  try {
    const { data } = await axios.post(`team/create`, payload);

    return handleResponseError(data, {
      showAlert: true
    });
  } catch (error) {
    return console.log(`error`, error);
  }
};

export const deleteTeam = (tagId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`team/delete/${tagId}`);
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

export const updateTeam = async (id, payload) => {
  try {
    const { data } = await axios.put(`team/update/${id}`, payload);
    return handleResponseError(data, { showAlert: true });
  } catch (error) {
    return console.log(`error`, error);
  }
};

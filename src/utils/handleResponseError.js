import { notification } from './notification';

export const handleResponseError = (data = {}, { callBack = () => {}, showAlert = false } = {}) => {
  console.log(`handle`, { data, callBack, showAlert });
  // eslint-disable-next-line no-debugger
  // debugger;
  if (data.status === 0) {
    if (data.message !== Array) {
      return notification.error(data.message);
    }
    return data.error.map((error) => notification.error(error?.msg));
  }

  if (showAlert) {
    if (data.message !== Array) {
      notification.success(data.message);
      callBack();
      return data;
    }
    data.error.map((error) => notification.success(error?.msg));
    callBack();
    return data;
  }

  callBack();
  return data;
};

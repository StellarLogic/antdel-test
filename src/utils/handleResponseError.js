import { notification } from './notification';

export const handleResponseError = (data = {}, cb = () => {}) => {
  console.log(`handle`, data);
  if (data.status === 0) {
    if (data.message !== Array) {
      return notification.error(data.message);
    }
    return data.error.map((error) => notification.error(error?.msg));
  }
  return cb();
};

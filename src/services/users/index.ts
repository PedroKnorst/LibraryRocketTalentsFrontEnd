import { api } from '../api';

export const getUser = (acc: string) => {
  try {
    return api.get('/users/' + acc);
  } catch (err) {
    return Promise.reject(err);
  }
};

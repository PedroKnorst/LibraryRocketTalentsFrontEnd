import { api } from "../api";

export const getUsers = () => {
  try {
    return api.get("/users");
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getUser = (acc: string) => {
  try {
    return api.get("/users/" + acc);
  } catch (err) {
    return Promise.reject(err);
  }
};

import { api } from "../api";

export const getUsers = () => {
  try {
    return api.get("/users");
  } catch (err) {
    return Promise.reject(err);
  }
};

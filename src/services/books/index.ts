import { api } from "../api";

export const getBooks = () => {
  try {
    return api.get("/books");
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getUsers = () => {
  try {
    return api.get("/users");
  } catch (err) {
    return Promise.reject(err);
  }
};

export const postBook = (body: any) => {
  try {
    return api.post("books", { ...body });
  } catch (err) {
    return Promise.reject(err);
  }
};

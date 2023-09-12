import axios from "./customize-axios";

export const fetchUsersByPage = (page) => {
  return axios.get(`api/users?page=${page}`);
};

export const createUser = (name, job) => {
  return axios.post("api/users", { name, job });
};

export const updateUser = (id, name, job) => {
  return axios.put(`api/users/ + ${id}`, { name, job });
};

export const deleteUser = (id) => {
  return axios.delete(`api/users/${id}`);
};

import axios from "axios";

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const getFiles = () => {
  return axios.get("api/v1/documents")};
export const createFile = payload => axios.post("api/v1/documents", payload, config);
export const updateFile = (id, payload) =>
  axios.put(`api/v1/documents/${id}`, payload, config);
export const destroyFile = id => axios.delete(`api/v1/documents/${id}`);

import http from "../http-common";

const getAll = () => {
  return http.get("/employee");
};

const get = id => {
  return http.get(`/employee/${id}`);
};

const create = data => {
  return http.post("/employee", data);
};

const update = (id, data) => {
  return http.put(`/employee/${id}`, data);
};

const remove = id => {
  return http.delete(`/employee/${id}`);
};

const removeAll = () => {
  return http.delete(`/employee`);
};


export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

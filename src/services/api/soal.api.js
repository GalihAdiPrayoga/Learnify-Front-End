import axios from "./axios";

export const soalApi = {
  getAll: () => axios.get("/soal"),

  getById: (id) => axios.get(`/soal/${id}`),

  create: (data) => axios.post("/soal", data),

  update: (id, data) => axios.put(`/soal/${id}`, data),

  delete: (id) => axios.delete(`/soal/${id}`),

  getByMateri: (materiId) => axios.get(`/user/soal/materi/${materiId}`),

  checkSoalExists: (materiId) => axios.get(`/user/soal/materi/${materiId}`),
};

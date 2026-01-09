import axios from "./axios";

export const materiApi = {
  // Admin endpoints
  getAll: (kelasId) => {
    const url = kelasId ? `/materi?kelas_id=${kelasId}` : "/materi";
    return axios.get(url);
  },

  getById: (id) => axios.get(`/materi/${id}`),

  create: (data) => axios.post("/materi", data),

  update: (id, data) => axios.put(`/materi/${id}`, data),

  delete: (id) => axios.delete(`/materi/${id}`),

  // Admin menggunakan endpoint /materi/kelas/{kelasId}
  getByKelasAdmin: (kelasId) => axios.get(`/materi/kelas/${kelasId}`),

  // User menggunakan endpoint /user/materi/kelas/{kelasId}
  getByKelas: (kelasId) => axios.get(`/user/materi/kelas/${kelasId}`),

  // User detail endpoint (used by DetailMaterialPage)
  getDetailForUser: (id) => axios.get(`/user/materi/${id}`),
};

import axiosInstance from "./axios";

export const materiApi = {
  // Admin endpoints
  getAll: async (kelasId) => {
    const url = kelasId ? `/materi?kelas_id=${kelasId}` : `/materi`;
    const response = await axiosInstance.get(url);
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/materi/${id}`);
    return response.data;
  },

  create: async (materiData) => {
    const response = await axiosInstance.post("/materi", materiData);
    return response.data;
  },

  update: async (id, materiData) => {
    const response = await axiosInstance.put(`/materi/${id}`, materiData);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/materi/${id}`);
    return response.data;
  },

  // User endpoints
  getByKelas: async (kelasId) => {
    const response = await axiosInstance.get(`/user/materi/kelas/${kelasId}`);
    return response.data;
  },

  getDetailForUser: async (id) => {
    const response = await axiosInstance.get(`/user/materi/${id}`);
    return response.data;
  },
};

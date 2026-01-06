import axiosInstance from "./axios";

export const kelasApi = {
  // Admin endpoints
  getAll: async () => {
    const response = await axiosInstance.get("/kelas");
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/kelas/${id}`);
    return response.data;
  },

  create: async (kelasData) => {
    const formData = new FormData();
    if (kelasData.nama) formData.append("nama", kelasData.nama);

    // Jika user memilih file, append dengan key 'thumnail' sesuai backend
    if (kelasData.thumbnail instanceof File) {
      formData.append("thumnail", kelasData.thumbnail);
    }

    const response = await axiosInstance.post("/kelas", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  update: async (id, kelasData) => {
    const formData = new FormData();
    if (kelasData.nama) formData.append("nama", kelasData.nama);

    if (kelasData.thumbnail instanceof File) {
      formData.append("thumnail", kelasData.thumbnail);
    }

    formData.append("_method", "PUT");

    const response = await axiosInstance.post(`/kelas/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/kelas/${id}`);
    return response.data;
  },

  // User endpoints
  getAllForUser: async () => {
    const response = await axiosInstance.get("/user/kelas");
    return response.data;
  },

  // Additional user course endpoints
  getMyCourses: () => axiosInstance.get("/kelas/my-courses"),

  startCourse: (kelasId) => axiosInstance.post(`/kelas/${kelasId}/start`),

  cancelCourse: (kelasId) => axiosInstance.delete(`/kelas/${kelasId}/cancel`),

  toggleMaterial: (kelasId, materialId) =>
    axiosInstance.post(`/kelas/${kelasId}/toggle-material`, {
      material_id: materialId,
    }),
};

import axiosInstance from "./axios";

export const adminApi = {
  // Get admin profile
  getProfile: async () => {
    const id = localStorage.getItem("user_id");

    if (!id || id === "null" || id === "undefined") {
      throw new Error("User ID tidak ditemukan. Silakan login kembali.");
    }

    const response = await axiosInstance.get(`/profil/${id}`);
    return response.data;
  },

  // Update admin profile
  updateProfile: async (profileData) => {
    const id = localStorage.getItem("user_id");

    if (!id || id === "null" || id === "undefined") {
      throw new Error("User ID tidak ditemukan. Silakan login kembali.");
    }

    const formData = new FormData();

    // Sesuaikan dengan validation Laravel
    if (profileData.name) formData.append("name", profileData.name);
    if (profileData.username) formData.append("username", profileData.username);
    if (profileData.email) formData.append("email", profileData.email);

    // Laravel hanya menerima 'password' bukan 'new_password'
    if (profileData.password) formData.append("password", profileData.password);

    // Profile image
    if (profileData.profile instanceof File) {
      formData.append("profile", profileData.profile);
    }

    formData.append("_method", "PUT");

    const response = await axiosInstance.post(`/profil/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },
};

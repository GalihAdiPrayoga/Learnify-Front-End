import axiosInstance from "./axios";

export const userApi = {
  // Get user profile
  getProfile: async () => {
    const id = localStorage.getItem("user_id");

    if (!id || id === "null" || id === "undefined") {
      throw new Error("User ID tidak ditemukan. Silakan login kembali.");
    }

    const response = await axiosInstance.get(`/user/profil`);
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const formData = new FormData();

    // Append fields
    if (profileData.name) formData.append("name", profileData.name);
    if (profileData.username) formData.append("username", profileData.username);
    if (profileData.email) formData.append("email", profileData.email);
    if (profileData.password) formData.append("password", profileData.password);

    // Profile image
    if (profileData.profile instanceof File) {
      formData.append("profile", profileData.profile);
    }

    formData.append("_method", "PUT");

    const response = await axiosInstance.post(`/user/profil`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },
};

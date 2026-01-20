import axios from "./axios";

export const dashboardApi = {
  /**
   * Get dashboard statistics
   * @returns {Promise} Dashboard data including stats and charts
   */
  getStats: async () => {
    const response = await axios.get("/dashboard");
    return response.data;
  },
};

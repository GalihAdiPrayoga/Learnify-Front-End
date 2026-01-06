import { useState, useEffect } from "react";
import axiosInstance from "@/services/api/axios";

export const useCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/user/kelas");
      console.log("=== FULL RESPONSE ===", res.data);
      const data = res?.data?.data || [];
      console.log("=== COURSES DATA ===", data);
      console.log(
        "=== ENROLLED COURSES ===",
        data.filter((c) => c.isEnrolled)
      );
      console.log(
        "=== IN PROGRESS COURSES ===",
        data.filter((c) => c.isEnrolled && c.isInProgress)
      );
      setCourses(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err?.response?.data?.message || "Gagal memuat kelas");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
  };
};

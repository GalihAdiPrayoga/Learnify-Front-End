import { useState, useEffect } from "react";
import { userApi } from "@/services/api/user.api";

export const useDashboard = () => {
  const [userData, setUserData] = useState({
    name: "User",
    email: "",
    username: "",
    profile: null,
  });
  const [loading, setLoading] = useState(true);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await userApi.getProfile();
      const { data } = response;

      setUserData({
        name: data.name || "User",
        email: data.email || "",
        username: data.username || "",
        profile: data.profile || null,
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const getProfileImageUrl = () => {
    if (userData.profile) {
      const storageUrl =
        import.meta.env.VITE_STORAGE_URL || "http://localhost:8000/storage";
      return `${storageUrl}/${userData.profile}`;
    }
    return null;
  };

  const getInitials = () => {
    return userData.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleProfileUpdate = (updatedData) => {
    console.log("Profile updated with data:", updatedData);

    // Update local state dengan data baru
    setUserData({
      name: updatedData.name || userData.name,
      email: updatedData.email || userData.email,
      username: updatedData.username || userData.username,
      profile: updatedData.profile || userData.profile,
    });

    // Refresh data from server to ensure sync
    fetchUserData();

    setEditProfileOpen(false);
  };

  return {
    userData,
    loading,
    editProfileOpen,
    setEditProfileOpen,
    getProfileImageUrl,
    getInitials,
    handleProfileUpdate,
    refreshUserData: fetchUserData,
  };
};

import { useState, useEffect, useRef } from "react";
import { adminApi } from "@/services/api/admin.api";

export const useHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "Admin",
    email: "",
    profile: null,
  });
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await adminApi.getProfile();
        const { data } = response;

        setUserData({
          name: data.name || "Admin",
          email: data.email || "",
          profile: data.profile || null,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Get profile image URL
  const getProfileImageUrl = () => {
    if (userData.profile) {
      const storageUrl =
        import.meta.env.VITE_STORAGE_URL || "http://localhost:8000/storage";
      return `${storageUrl}/${userData.profile}`;
    }
    return null;
  };

  // Get initials from name
  const getInitials = () => {
    return userData.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return {
    dropdownOpen,
    setDropdownOpen,
    userData,
    loading,
    dropdownRef,
    getProfileImageUrl,
    getInitials,
  };
};

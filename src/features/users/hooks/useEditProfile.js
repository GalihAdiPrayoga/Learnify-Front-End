import { useState, useEffect, useRef, useCallback } from "react";
import { userApi } from "@/services/api/user.api";
import toastr from "toastr";

// Configure toastr
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 3000,
};

export const useEditProfile = (userData, onSuccess) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // keep ref to latest userData for resets
  const userRef = useRef(userData);
  useEffect(() => {
    userRef.current = userData;
  }, [userData]);

  // helper to set form from provided user data
  const setFromUserData = useCallback((ud = userRef.current) => {
    const u = ud || {};
    setFormData({
      fullName: u.name || "",
      username: u.username || "",
      email: u.email || "",
      password: "",
      confirmPassword: "",
    });
    setProfileFile(null);
    setProfilePreview(null);
  }, []);

  // Sync whenever userData changes (keeps form populated on re-open)
  useEffect(() => {
    if (userData) setFromUserData(userData);
  }, [userData, setFromUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        toastr.warning("Please upload an image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toastr.warning("Image size should be less than 2MB");
        return;
      }
      setProfileFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (formData.password || formData.confirmPassword) {
      if (!formData.password) {
        toastr.error("Password is required");
        return false;
      }
      if (formData.password.length < 6) {
        toastr.error("Password must be at least 6 characters");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        toastr.error("Passwords do not match");
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const profileData = {
        name: formData.fullName,
        username: formData.username,
        email: formData.email,
      };
      if (formData.password) profileData.password = formData.password;
      if (profileFile) profileData.profile = profileFile;

      const response = await userApi.updateProfile(profileData);
      toastr.success(response.message || "Profile updated successfully!");

      // invoke onSuccess with returned data if provided
      if (onSuccess) onSuccess(response.data || {});
      // sync local form to latest user
      setFromUserData(response.data || userRef.current);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile";
      toastr.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = useCallback(() => {
    setFromUserData();
  }, [setFromUserData]);

  return {
    formData,
    profileFile,
    profilePreview,
    loading,
    handleChange,
    handleImageUpload,
    handleSave,
    resetForm,
    setFromUserData, // expose to caller
  };
};

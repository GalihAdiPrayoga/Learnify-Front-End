import { useState, useEffect } from "react";
import { adminApi } from "@/services/api/admin.api";
import toastr from "toastr";

// Configure toastr
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 3000,
};

export const useSetting = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/120"
  );
  const [profileFile, setProfileFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await adminApi.getProfile();
        const { data } = response;

        setFormData({
          fullName: data.name || "",
          username: data.username || "",
          email: data.email || "",
          password: "",
          confirmPassword: "",
        });

        if (data.profile) {
          const storageUrl =
            import.meta.env.VITE_STORAGE_URL || "http://localhost:8000/storage";
          setProfileImage(`${storageUrl}/${data.profile}`);
        } else {
          // Set placeholder if no profile image
          setProfileImage("https://via.placeholder.com/120");
        }
      } catch (error) {
        const errorMsg = error.message || "Failed to load profile data";
        toastr.error(errorMsg);
        console.error(error);

        if (error.message?.includes("User ID tidak ditemukan")) {
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        }
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    // Validate password fields if password is filled
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

      // Add password if provided (sesuai Laravel validation)
      if (formData.password) {
        profileData.password = formData.password;
      }

      // Add profile image if provided
      if (profileFile) {
        profileData.profile = profileFile;
      }

      const response = await adminApi.updateProfile(profileData);

      toastr.success(response.message || "Profile updated successfully!");

      if (response.data?.profile) {
        const storageUrl =
          import.meta.env.VITE_STORAGE_URL || "http://localhost:8000/storage";
        setProfileImage(`${storageUrl}/${response.data.profile}`);
      }

      // Clear password fields
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));

      setProfileFile(null);
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

  return {
    formData,
    profileImage,
    loading,
    fetchLoading,
    handleChange,
    handleImageUpload,
    handleSave,
  };
};

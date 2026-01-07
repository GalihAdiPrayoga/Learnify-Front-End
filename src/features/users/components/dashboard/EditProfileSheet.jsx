import React, { useEffect } from "react";
import { Plus } from "lucide-react";
import { InputField, PasswordField } from "@/components/fields";
import Button from "@/components/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { useEditProfile } from "../../hooks/useEditProfile";

export default function EditProfileSheet({
  open,
  onOpenChange,
  userData,
  onSuccess,
}) {
  const {
    formData,
    profilePreview,
    loading,
    handleChange,
    handleImageUpload,
    handleSave,
    resetForm,
    setFromUserData,
  } = useEditProfile(userData, (updatedData) => {
    onSuccess(updatedData);
    onOpenChange(false);
  });

  // Sync form when sheet opens
  useEffect(() => {
    if (open) {
      setFromUserData(userData);
    } else {
      resetForm();
    }
  }, [open, userData, setFromUserData, resetForm]);

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const getProfileImageUrl = () => {
    if (profilePreview) return profilePreview;
    if (userData?.profile) {
      const storageUrl =
        import.meta.env.VITE_STORAGE_URL || "http://localhost:8000/storage";
      return `${storageUrl}/${userData.profile}`;
    }
    return "https://via.placeholder.com/120";
  };

  const getInitials = () => {
    return (userData?.name || "User")
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Debug: Log userData when sheet opens
  useEffect(() => {
    if (open) {
      console.log("EditProfileSheet userData:", userData);
      console.log("EditProfileSheet formData:", formData);
    }
  }, [open, userData, formData]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetClose onClick={handleClose} />

        <div className="px-6 py-6">
          <SheetHeader className="mb-6">
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Update your profile information and settings
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                  <img
                    src={getProfileImageUrl()}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-600 to-gray-700"
                    style={{ display: getProfileImageUrl() ? "none" : "flex" }}
                  >
                    <span className="text-white text-xl font-bold">
                      {getInitials()}
                    </span>
                  </div>
                </div>
                <label className="absolute bottom-0 right-0 bg-zinc-950 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-gray-700 transition">
                  <Plus size={16} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(e.target.files?.[0] || null)
                    }
                    disabled={loading}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">
                Click the + icon to change your profile picture
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <InputField
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Username
                </label>
                <InputField
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <InputField
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>

              {/* Change Password Section */}
              <div className="pt-4 border-t">
                <h3 className="text-sm font-semibold mb-3">Change Password</h3>
                <p className="text-xs text-gray-500 mb-4">
                  Leave blank if you don't want to change password
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      New Password
                    </label>
                    <PasswordField
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter new password (min 6 characters)"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Confirm New Password
                    </label>
                    <PasswordField
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SheetFooter className="mt-8 flex justify-end gap-2 w-full">
            <Button
              type="button"
              onClick={handleSave}
              disabled={loading}
              loading={loading}
              className="h-10 px-6"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

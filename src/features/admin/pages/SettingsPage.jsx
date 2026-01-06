import React, { useState } from "react";
import { useSetting } from "../hooks/useSetting";
import { Plus } from "lucide-react";
import { InputField, PasswordField } from "@/components/fields";
import Loading from "@/components/Loading"; // added import
import Button from "@/components/button"; // use shared Button component

export default function AdminProfileSettings() {
  const {
    formData,
    profileImage,
    loading,
    fetchLoading,
    handleChange,
    handleImageUpload,
    handleSave,
  } = useSetting();

  const [imageBroken, setImageBroken] = useState(false);

  if (fetchLoading) {
    return <Loading />; // use Loading component
  }

  const initialChar =
    (formData.username || formData.fullName || "A")
      .toString()
      .trim()
      .charAt(0)
      .toUpperCase() || "A";

  return (
    <div className="p-6">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-full">
        {/* Profile Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            {profileImage && !imageBroken ? (
              <img
                src={profileImage}
                className="w-28 h-28 rounded-full object-cover border shadow"
                alt="Profile"
                onError={() => setImageBroken(true)}
              />
            ) : (
              <div className="w-28 h-28 rounded-full flex items-center justify-center bg-zinc-900 text-white text-2xl font-bold border shadow">
                {initialChar}
              </div>
            )}

            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer shadow hover:bg-blue-700 transition">
              <Plus size={16} />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  setImageBroken(false);
                  handleImageUpload(e.target.files?.[0] || null);
                }}
                disabled={loading}
              />
            </label>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {formData.fullName || "Admin"}
            </h2>
            <p className="text-gray-500 text-sm">
              Update your personal information
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
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
            <label className="block text-sm font-medium mb-2">Username</label>
            <InputField
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>

          <div className="md:col-span-2">
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
        </div>

        {/* Change Password Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <p className="text-sm text-gray-500 mb-4">
            Leave blank if you don't want to change password
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Save Button at bottom-right */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={loading}
            loading={loading}
            variant="primary"
            className="h-10 px-6"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

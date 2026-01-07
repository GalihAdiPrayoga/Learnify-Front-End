import React from "react";
import { Edit } from "lucide-react";

const ProfileCard = ({
  userData,
  loading,
  firstInitial,
  getProfileImageUrl,
  onEdit,
}) => {
  return (
    <button
      onClick={onEdit}
      className="bg-linear-to-br from-zinc-900 to-zinc-800 text-white p-6 rounded-lg shadow-xl flex flex-col items-center relative overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group w-full h-full"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all"></div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-sm rounded-full p-2">
        <Edit className="w-4 h-4 text-white" />
      </div>

      <h2 className="text-xl font-semibold mb-4 relative z-10">User Profile</h2>

      {loading ? (
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden ring-4 ring-white/10 group-hover:ring-white/20 transition-all">
          {getProfileImageUrl() ? (
            <img
              src={getProfileImageUrl()}
              alt={userData.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="w-full h-full flex items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-900"
            style={{ display: getProfileImageUrl() ? "none" : "flex" }}
          >
            <span className="text-white text-xl font-bold">{firstInitial}</span>
          </div>
        </div>
      )}

      <div className="mt-4 w-full space-y-2 text-center relative z-10">
        {loading ? (
          <>
            <div className="h-3 bg-gray-400 rounded-full mx-auto w-3/4"></div>
            <div className="h-3 bg-gray-500 rounded-full mx-auto w-2/3"></div>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold">{userData.name}</p>
            <p className="text-sm text-gray-300">@{userData.username}</p>
            <p className="text-xs text-gray-400">{userData.email}</p>
            <p className="text-xs text-blue-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to edit profile
            </p>
          </>
        )}
      </div>
    </button>
  );
};

export default ProfileCard;

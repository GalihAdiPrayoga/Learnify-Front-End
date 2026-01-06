import { useDashboard } from "../hooks/useDashboard";
import { Link } from "react-router-dom";
import { BookOpen, Edit, Eye } from "lucide-react";
import EditProfileSheet from "../components/EditProfileSheet";
import Loading from "@/components/Loading";
import { useCourse } from "../hooks/useCourse";
import button from "@/components/button";

export default function UserDashboard() {
  const {
    userData,
    loading,
    editProfileOpen,
    setEditProfileOpen,
    getProfileImageUrl,
    handleProfileUpdate,
  } = useDashboard();

  const { courses, loading: coursesLoading } = useCourse();
  const coursesInProgressList = (courses || []).filter(
    (c) => c.isEnrolled && c.isInProgress
  );

  const firstInitial =
    userData && userData.name && userData.name.split(" ")[0]
      ? userData.name.split(" ")[0].charAt(0).toUpperCase()
      : "D";

  if (loading || coursesLoading) {
    return <Loading />;
  }

  const handleOpenEditProfile = () => {
    setEditProfileOpen(true);
  };

  return (
    <>
      <div className="space-y-8 relative">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/3 rounded-full blur-3xl"></div>
        </div>

        {/* Welcome Section */}
        <section className="bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white p-10 w-full shadow-xl pb-24 text-start relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-zinc-800/40 via-transparent to-transparent pointer-events-none"></div>
          <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg relative z-10">
            Selamat Datang {userData.name}!
          </h1>
          <p className="text-lg mt-3 text-zinc-300 font-medium relative z-10">
            Semoga aktivitas belajarmu menyenangkan.
          </p>
        </section>

        {/* Temukan Kelas Card */}
        <div className="bg-white text-zinc-800 rounded-lg p-5 max-w-7xl w-full shadow-xl mx-auto -mt-16 relative z-20 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Temukan Kelas</h2>
                <p className="text-sm mt-1 text-gray-600">
                  Jelajahi berbagai kelas menarik untuk meningkatkan skill-mu
                </p>
              </div>
            </div>
            <Link
              to="/user/courses"
              className="bg-linear-to-r from-zinc-800 to-zinc-900 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
            >
              Lihat Kelas
            </Link>
          </div>
        </div>

        {/* Profile + Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 mt-10">
          {/* Profile Card */}
               {/* Profile Card - Clickable */}
          <button
            onClick={handleOpenEditProfile}
            className="bg-linear-to-br from-zinc-900 to-zinc-800 text-white p-6 rounded-lg shadow-xl flex flex-col items-center relative overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all"></div>

            {/* Edit Icon - Shows on hover */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-sm rounded-full p-2">
              <Edit className="w-4 h-4 text-white" />
            </div>

            <h2 className="text-xl font-semibold mb-4 relative z-10">
              User Profile
            </h2>

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
                  <span className="text-white text-xl font-bold">
                    {firstInitial}
                  </span>
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

          {/* Activities List */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-xl border border-gray-100 relative overflow-hidden">
            <h2 className="text-lg font-semibold mb-4">
              Ongoing Activities List
            </h2>

            <div className="space-y-4">
              {coursesInProgressList.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Belum ada kelas yang sedang dipelajari</p>
                  <Link
                    to="/user/courses"
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    Mulai belajar sekarang
                  </Link>
                </div>
              ) : (
                coursesInProgressList.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between bg-linear-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center justify-between">
                        <h3
                          className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                          onClick={() =>
                            window.location.assign(
                              `/user/courses/${course.id}/materials`
                            )
                          }
                        >
                          {course.nama}
                        </h3>
                        <div className="text-sm text-gray-500 font-medium">
                          {course.progress ?? 0}%
                        </div>
                      </div>

                      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-linear-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress ?? 0}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {course.totalMaterials || 0} materi ·{" "}
                        {course.completedMaterials?.length || 0} selesai
                      </p>
                    </div>
                    <button
                      type="button"
                      variant="secondary"
                      title="lihat"
                      className="p-2 h-9 w-9 rounded-lg border border-gray-200 bg-white text-indigo-600 shadow-sm hover:bg-indigo-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      onClick={() =>
                        window.location.assign(
                          `/user/courses/${course.id}/materials`
                        )
                      }
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <EditProfileSheet
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        userData={userData}
        onSuccess={handleProfileUpdate}
      />
    </>
  );
}

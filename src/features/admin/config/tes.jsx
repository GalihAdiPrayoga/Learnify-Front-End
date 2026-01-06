 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 mt-10">
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
                  className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-600 to-gray-700"
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
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-linear-to-br from-gray-50/50 to-blue-50/30 -z-10"></div>

            <h2 className="text-lg font-semibold mb-4 relative z-10">
              Ongoing Activities List
            </h2>

            <div className="space-y-4 relative z-10">
              {coursesInProgressList.length === 0
                ? [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-linear-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="h-3 bg-gray-300 rounded-full w-3/4"></div>
                      <div className="h-8 w-20 bg-gray-300 rounded-lg"></div>
                    </div>
                  ))
                : coursesInProgressList.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between bg-linear-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center justify-between">
                          <h3
                            className="font-semibold text-gray-900 cursor-pointer"
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
                          {
                            progressStorage.getCourseProgress(course.id)
                              .completedMaterials.length
                          }{" "}
                          selesai
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="secondary"
                          className="p-2 h-9 w-9 rounded-full border border-gray-200 bg-white text-indigo-600 shadow-sm hover:bg-indigo-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-200"
                           onClick={() =>
                            window.location.assign(
                              `/user/courses/${course.id}/materials`
                            )
                          }
                        >
                          <Eye size={16} />
                        </Button>
                        {/* <button
                         
                          className="px-4 py-2 bg-zinc-900 text-white rounded-lg"
                        >
                          Lihat
                        </button> */}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
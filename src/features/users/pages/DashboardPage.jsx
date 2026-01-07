import { useDashboard } from "../hooks/useDashboard";
import Loading from "@/components/Loading";
import { useCourse } from "../hooks/useCourse";
import { useNavigate } from "react-router-dom";

// added component imports
import DashboardHero from "../components/dashboard/DashboardHero";
import ProfileCard from "../components/dashboard/ProfileCard";
import OngoingActivities from "../components/dashboard/OngoingActivities";
import EditProfileSheet from "../components/dashboard/EditProfileSheet";

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
  const navigate = useNavigate();

  const coursesInProgressList = (() => {
    const list = (courses || []).filter((c) => c.isEnrolled && c.isInProgress);
    const getTimestamp = (c) => {
      const t = Date.parse(
        c.updated_at ||
          c.updatedAt ||
          c.lastActivity ||
          c.lastProgress ||
          c.enrolledAt ||
          c.created_at ||
          c.createdAt ||
          ""
      );
      return isNaN(t) ? 0 : t;
    };
    list.sort((a, b) => getTimestamp(b) - getTimestamp(a));
    return list.slice(0, 3);
  })();

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

        {/* Hero + CTA */}
        <DashboardHero userName={userData.name} />

        {/* Profile + Activities Responsive Layout (reduced bottom gap) */}
        <div className="flex flex-col md:flex-row gap-6 p-6 mt-6 w-full min-h-[calc(100vh-280px)]">
          <div className="w-full md:w-1/3 h-full">
            <ProfileCard
              userData={userData}
              loading={loading}
              firstInitial={firstInitial}
              getProfileImageUrl={getProfileImageUrl}
              onEdit={handleOpenEditProfile}
            />
          </div>

          <div className="w-full md:w-2/3 h-full">
            <OngoingActivities
              courses={coursesInProgressList}
              onOpen={(id) => navigate(`/user/courses/${id}/materials`)}
            />
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

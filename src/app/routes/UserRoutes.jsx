import React from "react";
import UserLayouts from "../layouts/UserLayouts";
import ProtectedRoute from "../helpers/ProtectedRoute";
import Loading from "@/components/Loading";

// Lazy-load pages
const LandingPage = React.lazy(() => import("@/features/users/pages/LandingPage"));
const UserDashboard = React.lazy(() => import("@/features/users/pages/DashboardPage"));
const UserCourse = React.lazy(() => import("@/features/users/pages/CoursePage"));
const ProgressPage = React.lazy(() => import("@/features/users/pages/ProgressPage"));
const MaterialPage = React.lazy(() => import("@/features/users/pages/MaterialPage"));
const DetailMaterialPage = React.lazy(() => import("@/features/users/pages/DetailMaterialPage"));


// Buat wrapper component agar Suspense tidak menghasilkan elemen langsung pada level modul
const LandingWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <LandingPage {...props} />
  </React.Suspense>
);

const DashboardWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <UserDashboard {...props} />
  </React.Suspense>
);

const CourseWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <UserCourse {...props} />
  </React.Suspense>
);

const ProgressWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <ProgressPage {...props} />
  </React.Suspense>
);

const MaterialWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <MaterialPage {...props} />
  </React.Suspense>
);

const DetailMaterialWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <DetailMaterialPage {...props} />
  </React.Suspense>
);

export const UserRoutes = [
  {
    path: "user",
    element: <UserLayouts />,
    children: [
      { path: "landing", element: <ProtectedRoute requiredRole="user"><LandingWrapper /></ProtectedRoute> },
      { path: "dashboard", element: <ProtectedRoute requiredRole="user"><DashboardWrapper /></ProtectedRoute> },
      { path: "courses", element: <ProtectedRoute requiredRole="user"><CourseWrapper /></ProtectedRoute> },
      { path: "progress", element: <ProtectedRoute requiredRole="user"><ProgressWrapper /></ProtectedRoute> },
      { path: "courses/:kelasId/materials", element: <ProtectedRoute requiredRole="user"><MaterialWrapper /></ProtectedRoute> },
      { path: "courses/:kelasId/materials/:materialId", element: <ProtectedRoute requiredRole="user"><DetailMaterialWrapper /></ProtectedRoute> },
    ],
  },
];

export default UserRoutes;

import React from "react";
import UserLayouts from "../layouts/UserLayouts";
import ProtectedRoute from "../helpers/ProtectedRoute";
import Loading from "@/components/Loading";

// Lazy-load pages
const LandingPage = React.lazy(() =>
  import("@/features/users/pages/LandingPage")
);
const UserDashboard = React.lazy(() =>
  import("@/features/users/pages/DashboardPage")
);
const UserCourse = React.lazy(() =>
  import("@/features/users/pages/CoursePage")
);
const ProgressPage = React.lazy(() =>
  import("@/features/users/pages/ProgressPage")
);
const MaterialPage = React.lazy(() =>
  import("@/features/users/pages/MaterialPage")
);
const DetailMaterialPage = React.lazy(() =>
  import("@/features/users/pages/DetailMaterialPage")
);
const ExamPage = React.lazy(() => import("@/features/users/pages/ExamPage"));
const HistoryPage = React.lazy(() =>
  import("@/features/users/pages/HistoryPage")
);
const ResultPage = React.lazy(() =>
  import("@/features/users/pages/ResultPage")
);

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
const ExamWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <ExamPage {...props} />
  </React.Suspense>
);
const HistoryWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <HistoryPage {...props} />
  </React.Suspense>
);
const ResultWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <ResultPage {...props} />
  </React.Suspense>
);

export const UserRoutes = [
  {
    path: "user",
    element: <UserLayouts />,
    children: [
      {
        path: "landing",
        element: (
          <ProtectedRoute requiredRole="user">
            <LandingWrapper />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute requiredRole="user">
            <DashboardWrapper />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses",
        element: (
          <ProtectedRoute requiredRole="user">
            <CourseWrapper />
          </ProtectedRoute>
        ),
      },
      {
        path: "progress",
        element: (
          <ProtectedRoute requiredRole="user">
            <ProgressWrapper />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses/:kelasId/materials",
        element: (
          <ProtectedRoute requiredRole="user">
            <MaterialWrapper />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses/:kelasId/materials/:materialId",
        element: (
          <ProtectedRoute requiredRole="user">
            <DetailMaterialWrapper />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses/:kelasId/materials/:materialId/exam",
        element: (
          <ProtectedRoute requiredRole="user">
            <ExamWrapper />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses/:kelasId/materials/:materialId/result/:hasilUjianId",
        element: (
          <ProtectedRoute requiredRole="user">
            <ResultWrapper />
          </ProtectedRoute>
        ),
      },
      {
        path: "history",
        element: (
          <ProtectedRoute requiredRole="user">
            <HistoryWrapper />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default UserRoutes;

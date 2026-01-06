import React from "react";
import AdminLayouts from "../layouts/AdminLayouts";
import ProtectedRoute from "../helpers/ProtectedRoute";
import Loading from "@/components/Loading";

// Lazy-load admin pages
const DashboardPage = React.lazy(() =>import("@/features/admin/pages/DashboardPage"));
const SettingsPage = React.lazy(() =>import("@/features/admin/pages/SettingsPage"));
const SoalPage = React.lazy(() => import("@/features/admin/pages/SoalPage"));
const KelasPage = React.lazy(() => import("@/features/admin/pages/KelasPage"));
const MateriPage = React.lazy(() =>import("@/features/admin/pages/MateriPage"));
const HasilUjian = React.lazy(() =>import("@/features/admin/pages/HasilUjian"));
const MateriFormPage = React.lazy(() =>import("@/features/admin/form/MateriFormPage"));

const DashboardWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <DashboardPage {...props} />
  </React.Suspense>
);
const SettingsWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <SettingsPage {...props} />
  </React.Suspense>
);
const SoalWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <SoalPage {...props} />
  </React.Suspense>
);
const KelasWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <KelasPage {...props} />
  </React.Suspense>
);
const MateriWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <MateriPage {...props} />
  </React.Suspense>
);
const HasilUjianWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <HasilUjian {...props} />
  </React.Suspense>
);
const MateriFormWrapper = (props) => (
  <React.Suspense fallback={<Loading />}>
    <MateriFormPage {...props} />
  </React.Suspense>
);

export const AdminRoutes = [
  {
    path: "admin",
    element: <AdminLayouts />,
    children: [
      { path: "dashboard", element: <ProtectedRoute requiredRole="admin"><DashboardWrapper /></ProtectedRoute> },
      { path: "settings", element: <ProtectedRoute requiredRole="admin"><SettingsWrapper /></ProtectedRoute> },
      { path: "soal", element: <ProtectedRoute requiredRole="admin"><SoalWrapper /></ProtectedRoute> },
      { path: "kelas", element: <ProtectedRoute requiredRole="admin"><KelasWrapper /></ProtectedRoute> },
      { path: "materi", element: <ProtectedRoute requiredRole="admin"><MateriWrapper /></ProtectedRoute> },
      { path: "materi/new", element: <ProtectedRoute requiredRole="admin"><MateriFormWrapper /></ProtectedRoute> },
      { path: "materi/:id/edit", element: <ProtectedRoute requiredRole="admin"><MateriFormWrapper /></ProtectedRoute> },
      { path: "hasil-ujian", element: <ProtectedRoute requiredRole="admin"><HasilUjianWrapper /></ProtectedRoute> },
    ],
  },
];

export default AdminRoutes;

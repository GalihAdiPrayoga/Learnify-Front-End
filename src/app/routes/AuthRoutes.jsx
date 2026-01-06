import React from "react";
import { Navigate } from "react-router-dom";
import Loading from "@/components/Loading";

// Lazy-load komponen pages (gunakan path relatif untuk menghindari alias issues)
const LoginPage = React.lazy(() =>
  import("@/features/auth/pages/LoginPage")
);
const RegistrasiPage = React.lazy(() =>
  import("@/features/auth/pages/Registrasi")
);

// Suspense wrapper helper
const withSuspense = (Component) => (
  <React.Suspense fallback={<Loading />}>
    <Component />
  </React.Suspense>
);

// Export named & default untuk kompatibilitas dengan index router
export const AuthRoutes = [
  {
    index: true,
    element: <Navigate to="/login" replace />,
  },
  {
    path: "login",
    element: withSuspense(LoginPage),
  },
  {
    path: "register",
    element: withSuspense(RegistrasiPage),
  },
];

export default AuthRoutes;

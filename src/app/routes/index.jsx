import { createBrowserRouter, Outlet } from "react-router-dom";
import * as AuthRoutesModule from "./AuthRoutes";
import * as AdminRoutesModule from "./AdminRoutes";
import * as UserRoutesModule from "./UserRoutes";

// tambahkan import helper baru
import { buildChildrenRoutes } from "../helpers/routeUtils";

import ErrorPage from "@/features/error/ErrorPage";

// ganti blok getRoutes + dev warnings dengan satu panggilan helper
const children = buildChildrenRoutes([
  { mod: AuthRoutesModule, name: "AuthRoutes" },
  { mod: AdminRoutesModule, name: "AdminRoutes" },
  { mod: UserRoutesModule, name: "UserRoutes" },
]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,  
    children: [...children],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";

import LoginPage from "@/pages/login/page";
import DashboardPage from "@/pages/dashboard/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

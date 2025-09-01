import { createBrowserRouter } from "react-router-dom";

import LoginPage from "@/pages/login/page";
import DashboardPage from "@/pages/dashboard/page";
import NotFoundPage from "@/pages/404/page";
import ProtectedRoute from "./protected-route";
import DashboardLayout from "@/components/layouts/dashboard-layout";

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
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "trabajadores",
        element: <div>Página de Trabajadores - En construcción</div>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

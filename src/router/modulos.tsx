import { PanelRight, Calendar } from "lucide-react";

// Categorías de módulos
export const moduleCategories = [
  {
    id: "analitica",
    title: "Analítica",
    modules: [
      {
        id: 1,
        name: "Dashboard",
        path: "/dashboard",
        icon: <PanelRight size={20} />,
        roles: ["Administrador", "Ingeniero", "Comercial"],
      },
    ],
  },
  {
    id: "modulos",
    title: "Módulos",
    modules: [
      {
        id: 2,
        name: "Trabajadores",
        path: "/dashboard/trabajadores",
        icon: <Calendar size={20} />,
        roles: ["Administrador", "Ingeniero", "Comercial"],
      },
    ],
  },
];

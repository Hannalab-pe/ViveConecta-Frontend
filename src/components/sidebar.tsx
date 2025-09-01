import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, ChevronLeft, Settings } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { moduleCategories } from "@/router/modulos";

const Sidebar = () => {
  const location = useLocation();
  // Inicializar estado desde localStorage, por defecto true
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const navigate = useNavigate();

  // Guardar estado en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  // Obtener información del usuario desde el contexto de autenticación
  const { user, logout } = useAuth();

  // Filtrar módulos según el rol del usuario
  const userRole = user?.rol?.nombre || user?.role || "";

  // Filtrar categorías y sus módulos según el rol del usuario
  const filteredCategories = moduleCategories
    .map((category) => ({
      ...category,
      modules: category.modules.filter((module) =>
        module.roles.includes(userRole)
      ),
    }))
    .filter((category) => category.modules.length > 0);

  // Función para cerrar sesión
  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  // Función para navegar a un módulo
  const navigateToModule = (path: string) => {
    navigate(path);
    // En móviles, cerrar el sidebar después de navegar
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Botón toggle para móviles */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden flex items-center justify-center w-11 h-11 
                   bg-[var(--primary)] text-[var(--white)] rounded-lg shadow-lg 
                   transition-all duration-300 hover:shadow-xl active:scale-95"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Botón toggle para escritorio */}
      <button
        className={`
          fixed top-4 z-50 hidden md:flex items-center justify-center w-10 h-10 
          bg-white text-gray-700 rounded-lg shadow-md border border-gray-200
          transition-all duration-300 hover:bg-gray-50 hover:text-[var(--primary)]
          ${isSidebarOpen ? "left-[280px]" : "left-4"}
        `}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={
          isSidebarOpen ? "Ocultar barra lateral" : "Mostrar barra lateral"
        }
      >
        {isSidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
      </button>

      {/* Sidebar */}
      {isSidebarOpen && (
        <aside
          className="
          w-72 h-full bg-white border-r border-gray-200
          flex flex-col transition-all duration-500 ease-out
          fixed top-0 left-0 z-40
          translate-x-0 shadow-xl
        "
        >
          {/* Header profesional */}
          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 bg-[var(--primary)] rounded-lg flex items-center justify-center shadow-sm">
                  <div className="w-6 h-6 bg-[var(--white)] rounded-sm"></div>
                </div>
                <div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--secondary)] rounded-full 
                            border-2 border-white"
                ></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-[var(--primary)]">
                  ViveConecta
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  Gestión de Edificios
                </p>
              </div>
            </div>

            {/* User info card */}
            {user && (
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 bg-[var(--primary)] 
                              rounded-lg flex items-center justify-center text-[var(--white)] font-semibold 
                              text-sm"
                  >
                    {(user.nombre || user.name)?.charAt(0) || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user.nombre || user.name || "Usuario"}
                    </p>
                    <p className="text-xs text-[var(--primary)] font-medium">
                      {userRole}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navegación profesional */}
          <nav className="flex-1 p-4 overflow-y-auto">
            {userRole ? (
              <div className="space-y-6">
                {filteredCategories.map((category, categoryIndex) => (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center gap-2 px-2 mb-3">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          categoryIndex === 0
                            ? "bg-[var(--secondary)]"
                            : categoryIndex === 1
                            ? "bg-[var(--yellow)]"
                            : categoryIndex === 2
                            ? "bg-[var(--red)]"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        {category.title}
                      </h3>
                    </div>

                    <div className="space-y-1">
                      {category.modules.map((module) => {
                        const isActive = location.pathname === module.path;
                        return (
                          <button
                            key={module.id}
                            onClick={() => navigateToModule(module.path)}
                            className={`
                            w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium 
                            text-sm transition-all duration-200 cursor-pointer
                            ${
                              isActive
                                ? "bg-[var(--primary)] text-[var(--white)] shadow-sm"
                                : "text-gray-700 hover:bg-gray-100 hover:text-[var(--primary)]"
                            }
                          `}
                          >
                            <div
                              className={`
                            flex items-center justify-center w-7 h-7 rounded-md transition-all duration-200
                            ${
                              isActive
                                ? "bg-white/15 text-[var(--white)]"
                                : "bg-gray-200 text-gray-600 group-hover:bg-[var(--secondary)]/20 group-hover:text-[var(--primary)]"
                            }
                          `}
                            >
                              {module.icon}
                            </div>
                            <span className="flex-1 text-left font-medium">
                              {module.name}
                            </span>

                            {/* Indicador activo */}
                            {isActive && (
                              <div className="w-1.5 h-1.5 bg-[var(--secondary)] rounded-full"></div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <Settings size={20} />
                </div>
                <p className="text-sm font-medium">
                  No hay módulos disponibles
                </p>
              </div>
            )}
          </nav>

          {/* Footer profesional */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[var(--red)] rounded-lg text-[var(--white)] hover:bg-red-600 duration-200 transition-all"
            >
              <div className="flex items-center justify-center w-7 h-7 bg-white/15 rounded-md">
                <LogOut size={16} />
              </div>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </aside>
      )}

      {/* Overlay para móviles */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden
                     animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Contenido principal */}
      <main
        className={`
        flex-1 overflow-y-auto transition-all duration-500 ease-out bg-gray-50
        ${isSidebarOpen ? "md:ml-72" : "md:ml-0"}
      `}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;

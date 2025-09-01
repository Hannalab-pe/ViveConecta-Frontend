import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Página no encontrada
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida. Verifica la URL o regresa a una página segura.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center gap-3 px-6 py-3
                     bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl
                     font-semibold shadow-lg shadow-blue-500/25 transition-all duration-200
                     hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/30
                     hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg"
          >
            <Home size={20} />
            Ir al Dashboard
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center gap-2 px-4 py-3
                       bg-white text-gray-700 rounded-xl font-medium border border-gray-200
                       shadow-sm transition-all duration-200 hover:bg-gray-50 hover:border-gray-300
                       hover:shadow-md active:scale-95"
            >
              <ArrowLeft size={18} />
              Volver
            </button>

            <button
              onClick={handleGoLogin}
              className="flex items-center justify-center gap-2 px-4 py-3
                       bg-white text-gray-700 rounded-xl font-medium border border-gray-200
                       shadow-sm transition-all duration-200 hover:bg-gray-50 hover:border-gray-300
                       hover:shadow-md active:scale-95"
            >
              Login
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            ¿Necesitas ayuda? Contacta al administrador del sistema
          </p>
        </div>
      </div>
    </div>
  );
}

import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Label, InputError, FormGroup } from "@/components/ui";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "sellostore@company.com",
      password: "Sellostore.",
      rememberMe: false,
    },
  });

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location.state]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success("¡Logged in successfully!");

      // Redirigir a la página de donde venía o al dashboard
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid credentials. Please try again.");
      setError("password", {
        type: "manual",
        message: "Invalid email or password",
      });
    }
  };

  // Mostrar loading si está verificando autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--white)]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[var(--white)] relative">
      {/* Logo en la esquina superior izquierda */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
        <img
          src="/images/logo.png"
          alt="ViveConecta Logo"
          className="w-16 h-16 object-contain rounded-lg"
        />
        <span className="text-lg font-semibold text-[var(--primary)]">
          ViveConecta
        </span>
      </div>

      {/* Panel izquierdo - Formulario */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo y título */}
          <div className="mb-8 text-center">
            {/* <div className="flex justify-center mb-6">
              <img
                src="/images/logo.png"
                alt="ViveConecta Logo"
                className="w-48 h-48 object-contain rounded-xl"
              />
            </div> */}
            <h1 className="text-4xl font-bold text-[var(--primary)] mb-2">
              Bienvenido de Vuelta
            </h1>
            <p className="text-sm text-gray-600">
              Ingresa tu correo y contraseña para acceder al sistema de gestión.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormGroup>
              <Label htmlFor="email" required>
                Correo
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@correo.com"
                error={!!errors.email}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <InputError error={errors.email} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password" required>
                Contraseña
              </Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                error={!!errors.password}
                icon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 pointer-events-auto"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <InputError error={errors.password} />
            </FormGroup>

            {/* Remember me y Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--secondary)] border-gray-300 rounded"
                  {...register("rememberMe")}
                />
                <Label
                  htmlFor="remember-me"
                  className="ml-2 mb-0 text-sm text-gray-700"
                >
                  Recuerdame
                </Label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[var(--secondary)] hover:text-[var(--primary)]"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            {/* Botón de submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-[var(--white)] bg-[var(--primary)] hover:bg-[var(--primary)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>

            {/* Demo credentials */}
            <div className="mt-4 p-4 bg-[var(--secondary)]/10 rounded-lg border border-[var(--secondary)]/20">
              <p className="text-sm text-[var(--primary)] font-semibold mb-2">
                Credenciales de Demostración:
              </p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  sellostore@company.com
                </p>
                <p>
                  <span className="font-medium">Contraseña:</span> Sellostore.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Panel derecho - Información */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-[var(--primary)] flex items-center justify-center p-12">
          <div className="max-w-md text-[var(--white)]">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[var(--secondary)] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <div className="w-8 h-8 bg-[var(--white)] rounded-sm"></div>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Sistema de Gestión de Edificios
              </h2>
              <p className="text-[var(--white)]/80 mb-8 leading-relaxed">
                Accede a tu plataforma de administración para gestionar
                inquilinos, mantenimiento y servicios del edificio de manera
                eficiente.
              </p>
            </div>

            {/* Características del sistema */}
            <div className="bg-[var(--white)]/10 backdrop-blur-sm rounded-xl p-6 border border-[var(--white)]/20">
              <h3 className="text-lg font-semibold mb-4 text-[var(--white)]">
                Funciones Principales:
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--secondary)] rounded-full"></div>
                  <span className="text-sm text-[var(--white)]/90">
                    Gestión de inquilinos y contratos
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--yellow)] rounded-full"></div>
                  <span className="text-sm text-[var(--white)]/90">
                    Control de mantenimiento
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--secondary)] rounded-full"></div>
                  <span className="text-sm text-[var(--white)]/90">
                    Reportes y estadísticas
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--yellow)] rounded-full"></div>
                  <span className="text-sm text-[var(--white)]/90">
                    Gestión financiera
                  </span>
                </div>
              </div>
            </div>

            {/* Footer info */}
            <div className="mt-8 text-center">
              <p className="text-xs text-[var(--white)]/60">
                © 2025 ViveConecta. Sistema seguro y confiable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

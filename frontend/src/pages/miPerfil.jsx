import { useState, useEffect } from "react";
import { LogOut, Mail, User, Calendar, Clock, Shield } from "lucide-react";
import { CambiarPasswordModal } from "./CambiarPasswordModal";
import { fetchPerfilUsuario } from "../services/usuarios.api";
import { PageHeader } from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authProvider";

export function MiPerfil() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  const { logout } = useAuth();

  const mapPerfil = (data) => ({
    email: data.email,
    rol: data.rol,
    estado: data.estado ? "Activo" : "Inactivo",
    fechaCreacion: data.created_at,
    ultimaActualizacion: data.updated_at,
    ultimoInicio: data.last_login_at || null,
  });

  const formatFecha = (fecha) => {
    if (!fecha) return "No disponible";

    const date = new Date(fecha);

    if (isNaN(date.getTime())) {
      return "No disponible";
    }

    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    fetchPerfilUsuario()
      .then((data) => setPerfil(mapPerfil(data)))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    console.log("Logging out...");
    await logout();
    Navigate("/", { replace: true });
    // Aquí se manejaría el cierre de sesión
  };

  const getEstadoBadge = (estado = "") =>
    estado === "Activo"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800";

  const getRolBadge = (rol) => {
    switch (rol) {
      case "Admin":
        return "bg-purple-100 text-purple-800";
      case "Cobrador":
        return "bg-green-100 text-green-800";
      case "Cliente":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div className="p-6">Cargando perfil...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Mi Perfil"
        description="Dashboard → Mi Perfil"
        actionButton={{
          label: "Cerrar Sesión",
          icon: <LogOut className="w-5 h-5" />,
          onClick: handleLogout,
          variant: "outline",
        }}
        className="max-w-[1400px] mx-auto"
      />

      {/* Centered Content Container */}
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Card 1 - Información Personal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-gray-900 mb-6">Información Personal</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Correo electrónico */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Correo electrónico</p>
                <p className="text-sm text-gray-900">{perfil.email}</p>
              </div>
            </div>

            {/* Rol del usuario */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Rol del usuario</p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getRolBadge(
                    perfil.rol
                  )}`}
                >
                  {perfil.rol}
                </span>
              </div>
            </div>

            {/* Estado del usuario */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Estado del usuario</p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                    perfil.estado
                  )}`}
                >
                  {perfil.estado}
                </span>
              </div>
            </div>

            {/* Fecha de creación */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Fecha de creación</p>
                <p className="text-sm text-gray-900">
                  {new Date(perfil.fechaCreacion).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Última actualización */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Última actualización</p>
                <p className="text-sm text-gray-900">
                  {formatFecha(perfil.updated_at)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 - Seguridad de la Cuenta */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-gray-900 mb-6">Seguridad de la Cuenta</h2>

          <div className="space-y-4">
            {/* Security Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Información de seguridad:</span>{" "}
                Mantén tu cuenta segura actualizando tu contraseña regularmente.
                Te recomendamos usar una contraseña fuerte que incluya letras
                mayúsculas, minúsculas, números y símbolos especiales.
              </p>
            </div>

            {/* Change Password Button */}
            <div className="pt-1">
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Cambiar Contraseña
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Cambiar Contraseña */}
      {isPasswordModalOpen && (
        <CambiarPasswordModal onClose={() => setIsPasswordModalOpen(false)} />
      )}
    </div>
  );
}

import { X } from "lucide-react";

export function UsuarioViewModal({ usuario, onClose }) {
  const getEstadoBadge = (estado) => {
    return estado === "Activo"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800";
  };

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

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
            <div>
              <h2 className="text-gray-900">Detalles del Usuario</h2>
              <p className="text-sm text-gray-500 mt-1">
                Información completa del usuario
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* ID */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">ID</label>
              <p className="text-gray-900">{usuario.id}</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Correo electrónico
              </label>
              <p className="text-gray-900">{usuario.email}</p>
            </div>

            {/* Rol */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Rol</label>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getRolBadge(
                  usuario.rol
                )}`}
              >
                {usuario.rol}
              </span>
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Estado</label>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                  usuario.estado
                )}`}
              >
                {usuario.estado}
              </span>
            </div>

            {/* Fecha de creación */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Fecha de creación
              </label>
              <p className="text-gray-900">
                {new Date(usuario.fechaCreacion).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* Última actualización (por ahora igual a fechaCreacion) */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Última actualización
              </label>
              <p className="text-gray-900">
                {new Date(usuario.fechaCreacion).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* Botón */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

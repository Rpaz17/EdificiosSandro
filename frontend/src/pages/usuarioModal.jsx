import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";

export function UsuarioModal({ usuario, onClose, onSave }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rol: "Cliente",
    estado: "Activo",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (usuario) {
      setFormData({
        email: usuario.email,
        password: "",
        rol: usuario.rol,
        estado: usuario.estado,
      });
    }
  }, [usuario]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
              <h2 className="text-gray-900">
                {usuario ? "Editar Usuario" : "Nuevo Usuario"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {usuario
                  ? "Actualiza la información del usuario"
                  : "Completa los datos del nuevo usuario"}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Correo electrónico <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="usuario@edificiossandro.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                {usuario ? "Nueva contraseña" : "Contraseña"}{" "}
                {!usuario && <span className="text-red-500">*</span>}
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={!usuario}
                  placeholder={
                    usuario
                      ? "Dejar en blanco para mantener la actual"
                      : "Ingrese una contraseña segura"
                  }
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {usuario && (
                <p className="text-xs text-gray-500 mt-1">
                  Dejar en blanco para mantener la contraseña actual
                </p>
              )}
            </div>

            {/* Rol */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Rol del usuario <span className="text-red-500">*</span>
              </label>

              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Admin">Admin</option>
                <option value="Cobrador">Cobrador</option>
                <option value="Cliente">Cliente</option>
              </select>
            </div>

            {/* Info Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <span className="font-medium">
                  {usuario ? "Actualizado por" : "Creado por"}:
                </span>{" "}
                Este campo será asignado por el sistema automáticamente
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {usuario ? "Guardar Cambios" : "Crear Usuario"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function ClienteModal({ cliente, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    identificacion: "",
    telefono: "",
    correo: "",
    estado: "Activo",
    sucursal: "Sucursal Centro",
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        identificacion: cliente.identificacion,
        telefono: cliente.telefono,
        correo: cliente.correo,
        estado: cliente.estado,
        sucursal: cliente.sucursal,
      });
    }
  }, [cliente]);

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
        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
            <div>
              <h2 className="text-gray-900">
                {cliente ? "Editar Cliente" : "Nuevo Cliente"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {cliente
                  ? "Actualiza la información del cliente"
                  : "Completa los datos del nuevo cliente"}
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
            {/* Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese el nombre"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese el apellido"
                />
              </div>
            </div>

            {/* Identification */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Identificación (DNI/ID) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="identificacion"
                value={formData.identificacion}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese el número de identificación"
              />
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 555-0000"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Correo Electrónico <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="correo@email.com"
                />
              </div>
            </div>

            {/* Sucursal & Estado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Sucursal Asignada <span className="text-red-500">*</span>
                </label>
                <select
                  name="sucursal"
                  value={formData.sucursal}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option>Sucursal Centro</option>
                  <option>Sucursal Norte</option>
                  <option>Sucursal Sur</option>
                  <option>Sucursal Este</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Estado <span className="text-red-500">*</span>
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {cliente ? "Guardar Cambios" : "Crear Cliente"}
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

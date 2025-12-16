import React, { useState } from "react";
import { X } from "lucide-react";

export function CreateApartamentoModal({ onClose, onSave, sucursales = [] }) {
  const [formData, setFormData] = useState({
    numero: "",
    sucursal: "",
    precioMensual: "",
    estado: "Disponible",
    descripcion: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id_sucursal: Number(formData.sucursal),
      numero_apartamento: Number(formData.numero),
      descripcion: formData.descripcion,
      precio_mensual: Number(formData.precioMensual),
      estado_ocupacion: formData.estado,
    };
    onSave(payload);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-gray-900">Crear Apartamento</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {/* Número de Apartamento */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Número de Apartamento <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="numero"
                  required
                  value={formData.numero}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Apt 301"
                />
              </div>

              {/* Sucursal */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Sucursal <span className="text-red-600">*</span>
                </label>
                <select
                  name="sucursal"
                  required
                  value={formData.sucursal}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">
                    {
                      //sucursalesLoading ? "Cargando..." :
                      "Todas las sucursales"
                    }
                  </option>
                  {sucursales.map((s) => (
                    <option key={s.id} value={String(s.id)}>
                      {s.nombre ?? s.descripcion ?? `Sucursal ${s.id}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Precio Mensual */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Precio Mensual <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                    US$
                  </span>
                  <input
                    type="number"
                    name="precioMensual"
                    step="0.01"
                    min="0"
                    required
                    value={formData.precioMensual}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Estado del Apartamento */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Estado del Apartamento <span className="text-red-600">*</span>
                </label>
                <select
                  name="estado"
                  required
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Disponible</option>
                  <option>Ocupado</option>
                  <option>Mantenimiento</option>
                </select>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Descripción detallada del apartamento..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Crear Apartamento
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

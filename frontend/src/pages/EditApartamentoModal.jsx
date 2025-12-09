import React, { useState } from 'react';
import { X } from 'lucide-react';

// Se eliminan las interfaces y las anotaciones de tipos.

export function EditApartamentoModal({ apartamento, onClose, onSave }) {
  const [formData, setFormData] = useState({
    numero: apartamento.numero,
    torre: apartamento.torre,
    sucursal: apartamento.sucursal,
    tipo: apartamento.tipo,
    // Convertimos números a string para los inputs de formulario
    habitaciones: String(apartamento.habitaciones),
    banos: String(apartamento.banos),
    metrosCuadrados: String(apartamento.tamano),
    piso: String(apartamento.piso),
    precioMensual: String(apartamento.precioMensual),
    estado: apartamento.estado,
    descripcion: apartamento.descripcion || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSave recibe el objeto formData
    onSave(formData);
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
            <div>
              <h2 className="text-gray-900">Editar Apartamento</h2>
              <p className="text-sm text-gray-600 mt-1">{apartamento.numero}</p>
            </div>
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
                />
              </div>

              {/* Torre / Edificio */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Torre / Edificio <span className="text-red-600">*</span>
                </label>
                <select
                  name="torre"
                  required
                  value={formData.torre}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Torre A</option>
                  <option>Torre B</option>
                  <option>Torre C</option>
                </select>
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
                  <option>Centro</option>
                  <option>Norte</option>
                  <option>Sur</option>
                  <option>Este</option>
                </select>
              </div>

              {/* Tipo de Apartamento */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Tipo de Apartamento <span className="text-red-600">*</span>
                </label>
                <select
                  name="tipo"
                  required
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Estudio</option>
                  <option>1 Habitación</option>
                  <option>2 Habitaciones</option>
                  <option>3 Habitaciones</option>
                  <option>Penthouse</option>
                </select>
              </div>

              {/* Habitaciones */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Habitaciones <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="habitaciones"
                  min="0"
                  required
                  value={formData.habitaciones}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Baños */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Baños <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="banos"
                  min="0"
                  required
                  value={formData.banos}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Metros² */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Metros² <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="metrosCuadrados"
                  min="0"
                  step="0.01"
                  required
                  value={formData.metrosCuadrados}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Piso */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Piso <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="piso"
                  min="0"
                  required
                  value={formData.piso}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Precio Mensual */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Precio Mensual <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">US$</span>
                  <input
                    type="number"
                    name="precioMensual"
                    step="0.01"
                    min="0"
                    required
                    value={formData.precioMensual}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <label className="block text-sm text-gray-700 mb-2">Descripción</label>
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
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
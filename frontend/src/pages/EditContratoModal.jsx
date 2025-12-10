import React, { useState } from 'react';
import { X } from 'lucide-react';

export function EditContratoModal({ contrato, onClose, onSave }) {
  const [formData, setFormData] = useState({
    cliente: contrato.cliente,
    apartamento: contrato.apartamento,
    fechaInicio: contrato.fechaInicio,
    fechaFin: contrato.fechaFin,
    montoMensual: String(contrato.montoMensual),
    deposito: String(contrato.deposito),
    estado: contrato.estado,
    notas: contrato.notas || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-gray-900">Editar Contrato</h2>
              <p className="text-sm text-gray-600 mt-1">{contrato.codigoContrato}</p>
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
            {/* Cliente (Disabled) */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Cliente</label>
              <input
                type="text"
                disabled
                value={formData.cliente}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Apartamento */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Apartamento <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.apartamento}
                onChange={(e) => setFormData({ ...formData, apartamento: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Apt 301 - Torre A</option>
                <option>Apt 502 - Torre B</option>
                <option>Apt 105 - Torre A</option>
                <option>Apt 208 - Torre C</option>
                <option>Apt 410 - Torre B</option>
              </select>
            </div>

            {/* Fecha de inicio y fin */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Fecha de inicio <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fechaInicio}
                  onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Fecha de fin <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fechaFin}
                  onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Monto mensual y depósito */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Monto mensual <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">US$</span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.montoMensual}
                    onChange={(e) => setFormData({ ...formData, montoMensual: e.target.value })}
                    className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Depósito</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">US$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.deposito}
                    onChange={(e) => setFormData({ ...formData, deposito: e.target.value })}
                    className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Estado del contrato */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Estado del contrato <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Activo</option>
                <option>Próximo a vencer</option>
                <option>Finalizado</option>
                <option>Cancelado</option>
              </select>
            </div>

            {/* Notas */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Notas</label>
              <textarea
                value={formData.notas}
                onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Añade notas adicionales sobre el contrato..."
              />
            </div>

            {/* Última actualización */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600">
                Última actualización: {contrato.ultimaActualizacion}
              </p>
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
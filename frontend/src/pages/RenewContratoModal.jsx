import React, { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';

export function RenewContratoModal({ contrato, onClose, onRenew }) {
  const [formData, setFormData] = useState({
    nuevaFechaInicio: '',
    nuevaFechaFin: '',
    nuevoMontoMensual: String(contrato.montoMensual),
    nuevoDeposito: String(contrato.deposito),
    notasRenovacion: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRenew(formData);
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
              <h2 className="text-gray-900">Renovar Contrato</h2>
              <p className="text-sm text-gray-600 mt-1">{contrato.codigoContrato}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Info Card */}
          <div className="m-6 bg-green-50 border border-green-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-green-900">Renovación de Contrato</h4>
                <p className="text-sm text-green-700 mt-1">
                  Estás a punto de renovar el contrato de **{contrato.cliente}** para{' '}
                  **{contrato.apartamento}**
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
            {/* Nueva fecha de inicio y fin */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Nueva fecha de inicio <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.nuevaFechaInicio}
                  onChange={(e) => setFormData({ ...formData, nuevaFechaInicio: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Nueva fecha de fin <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.nuevaFechaFin}
                  onChange={(e) => setFormData({ ...formData, nuevaFechaFin: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Nuevo monto mensual y depósito */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Nuevo monto mensual (opcional)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">US$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.nuevoMontoMensual}
                    onChange={(e) => setFormData({ ...formData, nuevoMontoMensual: e.target.value })}
                    className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Nuevo depósito (opcional)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">US$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.nuevoDeposito}
                    onChange={(e) => setFormData({ ...formData, nuevoDeposito: e.target.value })}
                    className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Notas de renovación */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Notas de renovación</label>
              <textarea
                value={formData.notasRenovacion}
                onChange={(e) => setFormData({ ...formData, notasRenovacion: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Añade notas sobre la renovación del contrato..."
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
                className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Renovar Contrato
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
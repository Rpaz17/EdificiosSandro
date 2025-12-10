import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export function FinalizeContratoModal({ contrato, onClose, onFinalize }) {
  const [formData, setFormData] = useState({
    fechaFinalizacion: '',
    motivoFinalizacion: '',
    notasAdicionales: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onFinalize(formData);
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
              <h2 className="text-gray-900">Finalizar Contrato</h2>
              <p className="text-sm text-gray-600 mt-1">{contrato.codigoContrato}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Warning Card */}
          <div className="m-6 bg-red-50 border border-red-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-red-900">Advertencia: Finalizar Contrato</h4>
                <p className="text-sm text-red-700 mt-1">
                  Esta acción finalizará el contrato de manera permanente. Asegúrate de revisar todos
                  los detalles antes de continuar.
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mx-6 mb-6 bg-gray-50 rounded-xl p-5">
            <h4 className="text-gray-900 mb-3">Resumen del Contrato</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block text-gray-600 mb-1">Cliente</label>
                <p className="text-gray-900">{contrato.cliente}</p>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Apartamento</label>
                <p className="text-gray-900">{contrato.apartamento}</p>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Fecha de inicio</label>
                <p className="text-gray-900">{contrato.fechaInicio}</p>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Fecha de fin</label>
                <p className="text-gray-900">{contrato.fechaFin}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
            {/* Fecha de finalización */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Fecha de finalización <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.fechaFinalizacion}
                onChange={(e) => setFormData({ ...formData, fechaFinalizacion: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Motivo de finalización */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Motivo de finalización <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.motivoFinalizacion}
                onChange={(e) => setFormData({ ...formData, motivoFinalizacion: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccionar motivo</option>
                <option>Finalización natural del contrato</option>
                <option>Solicitud del cliente</option>
                <option>Incumplimiento de contrato</option>
                <option>Falta de pago</option>
                <option>Otros</option>
              </select>
            </div>

            {/* Notas adicionales */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Notas adicionales</label>
              <textarea
                value={formData.notasAdicionales}
                onChange={(e) => setFormData({ ...formData, notasAdicionales: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Añade notas adicionales sobre la finalización del contrato..."
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
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Finalizar Contrato
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
import React from "react";
import { X, AlertTriangle } from "lucide-react";

// Se eliminan las interfaces y las anotaciones de tipos.

export function DeleteApartamentoModal({ apartamento, onClose, onDelete }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Llama a la función onDelete (eliminación)
    onDelete();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-gray-900">Eliminar Apartamento</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Warning Card */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-900">
                    Advertencia: Acción Irreversible
                  </h4>
                  <p className="text-sm text-red-700 mt-1">
                    Estás a punto de eliminar este apartamento de forma
                    permanente. Esta acción no se puede deshacer. Asegúrate de
                    revisar todos los detalles antes de continuar.
                  </p>
                </div>
              </div>
            </div>

            {/* Apartment Details */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="text-gray-900 mb-4">
                Información del Apartamento
              </h3>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-gray-600 mb-1">
                    Estado actual
                  </label>
                  <p className="text-gray-900">{apartamento.estado}</p>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">
                    Nombre del apartamento
                  </label>
                  <p className="text-gray-900">{apartamento.numero}</p>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Sucursal</label>
                  <p className="text-gray-900">{apartamento.sucursal}</p>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Precio Mensual
                  </label>
                  {/* Aseguramos que toFixed(2) se pueda llamar si es un número */}
                  <p className="text-gray-900">
                    {typeof apartamento.precioMensual === "number"
                      ? apartamento.precioMensual.toFixed(2)
                      : apartamento.precioMensual}{" "}
                    US$
                  </p>
                </div>
              </div>

              {/* Contract Warning */}
              {apartamento.contratoActivo && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-900">
                      <strong>Atención:</strong> Este apartamento tiene un
                      contrato activo asociado ({apartamento.contratoActivo}).
                      Eliminar el apartamento podría afectar el contrato.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Confirmation */}
            <div className="bg-white border border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                ¿Estás seguro de que deseas eliminar el apartamento{" "}
                <strong>{apartamento.numero}</strong>? Esta acción no se puede
                revertir.
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
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Eliminar Apartamento
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

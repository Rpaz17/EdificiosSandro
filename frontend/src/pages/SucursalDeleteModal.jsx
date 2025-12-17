import { AlertTriangle, Building2 } from "lucide-react";

export function SucursalDeleteModal({ sucursal, onConfirm, onCancel }) {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl">
          {/* Icon & Title */}
          <div className="px-6 pt-6 pb-4 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>

            <h2 className="text-gray-900 mb-2">Eliminar Sucursal</h2>

            <p className="text-sm text-gray-600">
              ¿Está seguro de que desea eliminar esta sucursal? Esta acción
              marcará la sucursal como inactiva, pero podrá restaurarse en el
              futuro.
            </p>
          </div>

          {/* Summary Card */}
          <div className="px-6 pb-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-5 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-red-200">
                <Building2 className="w-5 h-5 text-red-700" />
                <h3 className="text-sm text-red-900">
                  Información de la Sucursal
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-red-700 mb-1">Nombre</p>
                  <p className="text-sm text-red-900">{sucursal.nombre}</p>
                </div>

                <div>
                  <p className="text-xs text-red-700 mb-1">Ciudad</p>
                  <p className="text-sm text-red-900">
                    {sucursal.ciudad || "No especificada"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-red-700 mb-1">Sector</p>
                  <p className="text-sm text-red-900">
                    {sucursal.sector || "No especificado"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-red-700 mb-1">Calle</p>
                  <p className="text-sm text-red-900">
                    {sucursal.calle || "No especificada"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6 flex items-center gap-3">
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
              Eliminar
            </button>

            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

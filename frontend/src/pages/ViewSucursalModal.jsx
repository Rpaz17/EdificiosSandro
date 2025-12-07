import { X, MapPin, Building2, Navigation, Calendar } from "lucide-react";

export function ViewSucursalModal({ sucursal, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full h-full max-w-2xl max-h-[90vh] min-w-[500px] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 flex items-center justify-between rounded-t-xl border-b border-blue-200 flex-shrink-0">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-gray-900">Detalles de la Sucursal</h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  Información completa de la sucursal
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:bg-blue-200 rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 flex-1 overflow-y-auto">
            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-2">
                  Nombre de la Sucursal
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm text-gray-900 break-words flex-1">
                    {sucursal.nombre}
                  </span>
                </div>
              </div>

              {/* Ciudad */}
              <div>
                <label className="block text-xs text-gray-500 mb-2">
                  Ciudad
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span className="text-sm text-gray-900 flex-1 break-words">
                    {sucursal.ciudad || "No especificada"}
                  </span>
                </div>
              </div>

              {/* Sector */}
              <div>
                <label className="block text-xs text-gray-500 mb-2">
                  Sector
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <Navigation className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span className="text-sm text-gray-900 flex-1 break-words">
                    {sucursal.sector || "No especificado"}
                  </span>
                </div>
              </div>

              {/* Calle */}
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-2">
                  Calle
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <Building2 className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <span className="text-sm text-gray-900 flex-1 break-words">
                    {sucursal.calle || "No especificada"}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Metadata */}
            <div>
              <h3 className="text-xs text-gray-500 mb-3">
                Información de Registro
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Creation Date */}
                <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600">Fecha de Creación</p>
                    <p className="text-sm text-gray-900">
                      {sucursal.fechaCreacion}
                    </p>
                  </div>
                </div>

                {/* Last Update */}
                <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600">
                      Última Actualización
                    </p>
                    <p className="text-sm text-gray-900">
                      {sucursal.updatedAt || sucursal.fechaCreacion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

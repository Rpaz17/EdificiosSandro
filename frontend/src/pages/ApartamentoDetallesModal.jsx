import React from "react"; // Es buena práctica importar React en .jsx, aunque no siempre sea necesario en las últimas versiones.
import {
  X,
  Home,
  Building2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Layers,
  DollarSign,
  ExternalLink,
  Edit,
  RefreshCw,
  Trash2,
} from "lucide-react";

// Se eliminan las interfaces 'Apartamento' y 'ApartamentoDetailPanelProps'
// y las anotaciones de tipos de la función y sus props.

export function ApartamentoDetailPanel({
  apartamento,
  onClose,
  onEdit,
  onChangeEstado,
  onDelete,
}) {
  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "Ocupado":
        return "bg-blue-100 text-blue-800";
      case "Disponible":
        return "bg-green-100 text-green-800";
      case "Mantenimiento":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-gray-900">Detalle de Apartamento</h2>
            <p className="text-sm text-gray-600 mt-1">{apartamento.numero}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 flex flex-col ">
          {/* Estado Badge */}
          <div>
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs ${getEstadoBadge(
                apartamento.estado
              )}`}
            >
              {apartamento.estado}
            </span>
          </div>

          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="text-gray-900">Información Básica</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">
                    Apartamento
                  </label>
                  <p className="text-sm text-gray-900">{apartamento.numero}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">
                    Sucursal
                  </label>
                  <p className="text-sm text-gray-900">
                    {apartamento.sucursal}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Información de Precios */}
          <div className="space-y-4">
            <h3 className="text-gray-900">Información de Precios</h3>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <label className="block text-sm text-gray-600">
                  Precio Mensual
                </label>
                <p className="text-sm text-gray-900">
                  {apartamento.precioMensual.toFixed(2)} US$
                </p>
              </div>
            </div>
          </div>

          {/* Acciones */}
        </div>
        <footer className="mt-auto  p-4">
          <div className="space-y-3 w-full ">
            <button
              onClick={() => onEdit(apartamento)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Edit className="w-5 h-5" />
              Editar Apartamento
            </button>

            <button
              onClick={() => onChangeEstado(apartamento)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Cambiar Estado
            </button>

            <button
              onClick={() => onDelete(apartamento)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Eliminar Apartamento
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}

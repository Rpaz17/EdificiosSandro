import React from 'react';
import { X, FileText, Edit, RefreshCw, XCircle } from 'lucide-react';


export function ContratoDetailPanel({
  contrato,
  onClose,
  onEdit,
  onRenew,
  onFinalize,
}) {
  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'próximo a vencer':
        return 'bg-yellow-100 text-yellow-800';
      case 'finalizado':
        return 'bg-gray-100 text-gray-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-gray-900">Detalles del Contrato</h2>
            <p className="text-sm text-gray-600 mt-1">{contrato.codigoContrato}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Información Principal */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-900">Información Principal</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Cliente</label>
                <p className="text-sm text-gray-900">{contrato.cliente}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Estado</label>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                    contrato.estado
                  )}`}
                >
                  {contrato.estado}
                </span>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Apartamento</label>
                <p className="text-sm text-gray-900">{contrato.apartamento}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Sucursal</label>
                <p className="text-sm text-gray-900">{contrato.sucursal}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tipo de contrato</label>
                <p className="text-sm text-gray-900">{contrato.tipoContrato}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Monto mensual</label>
                {/* Aseguramos la llamada a toFixed(2) si es un número */}
                <p className="text-sm text-gray-900">{typeof contrato.montoMensual === 'number' ? contrato.montoMensual.toFixed(2) : contrato.montoMensual} US$</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Depósito</label>
                 {/* Aseguramos la llamada a toFixed(2) si es un número */}
                <p className="text-sm text-gray-900">{typeof contrato.deposito === 'number' ? contrato.deposito.toFixed(2) : contrato.deposito} US$</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Duración</label>
                <p className="text-sm text-gray-900">{contrato.duracion}</p>
              </div>
            </div>
          </div>

          {/* Fechas Importantes */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-900">Fechas Importantes</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-600">Fecha de inicio</label>
                <p className="text-sm text-gray-900">{contrato.fechaInicio}</p>
              </div>
              <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-600">Fecha de fin</label>
                <p className="text-sm text-gray-900">{contrato.fechaFin}</p>
              </div>
              <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-600">Fecha de creación</label>
                <p className="text-sm text-gray-900">{contrato.fechaCreacion}</p>
              </div>
              <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-600">Última actualización</label>
                <p className="text-sm text-gray-900">{contrato.ultimaActualizacion}</p>
              </div>
            </div>
          </div>

          {/* Notas del Contrato */}
          {contrato.notas && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-gray-900 mb-3">Notas del Contrato</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">{contrato.notas}</p>
              </div>
            </div>
          )}

          {/* Historial de Cambios */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-900">Historial de Cambios</h3>
            </div>
            
            <div className="space-y-4">
              {/* Ejemplo de entrada en el historial */}
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Contrato creado</p>
                  <p className="text-xs text-gray-600 mt-1">14 de mayo de 2024 • Admin Sandro</p>
                </div>
              </div>
              {/* Ejemplo de entrada en el historial */}
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Contrato activado</p>
                  <p className="text-xs text-gray-600 mt-1">31 de mayo de 2024 • Admin Sandro</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => onEdit(contrato)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-5 h-5" />
              Ver Detalle Completo
            </button>
            
            <button
              onClick={() => onEdit(contrato)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Edit className="w-5 h-5" />
              Editar Contrato
            </button>
            
            <button
              onClick={() => onRenew(contrato)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Renovar Contrato
            </button>
            
            <button
              onClick={() => onFinalize(contrato)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <XCircle className="w-5 h-5" />
              Finalizar Contrato
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
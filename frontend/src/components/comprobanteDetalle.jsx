import {
  X,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  AlertTriangle,
  Image,
} from "lucide-react";
import { useState } from "react";

export function ComprobanteDetalle({
  comprobante,
  onClose,
  onValidate,
  onReject,
}) {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: null,
  });

  const handleValidate = () => {
    setConfirmDialog({ isOpen: false, type: null });
    onValidate(comprobante.codigo);
  };

  const handleReject = () => {
    setConfirmDialog({ isOpen: false, type: null });
    onReject(comprobante.codigo);
  };

  const openConfirmDialog = (type) => {
    setConfirmDialog({ isOpen: true, type });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ isOpen: false, type: null });
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      Pendiente: "bg-yellow-100 text-yellow-800",
      Validado: "bg-green-100 text-green-800",
      Rechazado: "bg-red-100 text-red-800",
    };
    return badges[estado] || "";
  };

  return (
    <>
      {/* Overlay */}
      <div
        className=" fixed backdrop-blur-sm
 inset-0 z-40 bg-black/20"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto ">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900">Detalle del Comprobante</h2>
            <p className="text-sm text-gray-500 mt-1">{comprobante.codigo}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Estado actual:</span>
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm ${getEstadoBadge(
                comprobante.estado
              )}`}
            >
              {comprobante.estado}
            </span>
          </div>

          {/* Client Information */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="text-sm text-gray-900">Información del Cliente</h3>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Cliente</p>
                <p className="text-sm text-gray-900">{comprobante.cliente}</p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-900">Detalles del Pago</h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Código */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Código</p>
                  <p className="text-sm text-gray-900">{comprobante.codigo}</p>
                </div>
              </div>

              {/* Monto */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Monto</p>
                  <p className="text-sm text-gray-900">
                    ${comprobante.monto.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Fecha */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Fecha de Envío</p>
                  <p className="text-sm text-gray-900">
                    {comprobante.fechaEnvio}
                  </p>
                </div>
              </div>

              {/* Método de Pago */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Método de Pago</p>
                  <p className="text-sm text-gray-900">
                    {comprobante.metodoPago}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Preview */}
          <div className="space-y-3">
            <h3 className="text-sm text-gray-900">Imagen del Comprobante</h3>
            <div
              className="w-full h-32 bg-gray-50 border-2 border-dashed border-blue-500 rounded-2xl 
            flex items-center justify-center"
            >
              <Image className="w-20 h-20 text-blue-500" />
            </div>
            <p className="text-xs text-gray-500 text-center">
              Haz clic en la imagen para ampliar
            </p>
          </div>

          {/* Action Buttons */}
          {comprobante.estado === "Pendiente" && (
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <button
                onClick={() => openConfirmDialog("validate")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                Validar Comprobante
              </button>

              <button
                onClick={() => openConfirmDialog("reject")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <XCircle className="w-5 h-5" />
                Rechazar Comprobante
              </button>

              <button
                onClick={onClose}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
            </div>
          )}

          {comprobante.estado !== "Pendiente" && (
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>

        {/* Confirm Dialog */}
        {confirmDialog.isOpen && (
          <div className="fixed inset-0 z-[60] bg-[rgba(0,0,0,0.4)] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              {/* Dialog Header */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-4 flex items-center gap-3 rounded-t-xl border-b border-orange-200">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900">Confirmar Acción</h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Esta acción no se puede deshacer
                  </p>
                </div>
              </div>

              {/* Dialog Content */}
              <div className="p-6">
                <p className="text-sm text-gray-700">
                  {confirmDialog.type === "validate"
                    ? "¿Está seguro que desea validar este comprobante? Esta acción marcará el comprobante como verificado y aprobado."
                    : "¿Está seguro que desea rechazar este comprobante? Esta acción marcará el comprobante como rechazado."}
                </p>
              </div>

              {/* Dialog Footer */}
              <div className="px-6 pb-6 flex gap-3">
                <button
                  onClick={closeConfirmDialog}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  onClick={
                    confirmDialog.type === "validate"
                      ? handleValidate
                      : handleReject
                  }
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-white rounded-lg transition-colors ${
                    confirmDialog.type === "validate"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {confirmDialog.type === "validate" ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Validar
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      Rechazar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

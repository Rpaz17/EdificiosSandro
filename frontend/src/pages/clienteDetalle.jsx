import {
  X,
  User,
  Mail,
  Phone,
  CreditCard,
  Building2,
  Calendar,
  Edit,
  UserX,
  UserCheck,
  FileText,
  DollarSign,
} from "lucide-react";

export function ClienteDetalle({ cliente, onClose, onEdit, onToggleEstado }) {
  const getEstadoBadge = (estado) => {
    return estado === "Activo"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  // Mock data for contracts and payments (you can replace with real API later)
  const mockContratos = [
    {
      id: "CT-2024-089",
      apartamento: "Apto 301",
      monto: "$850/mes",
      estado: "Activo",
    },
    {
      id: "CT-2023-045",
      apartamento: "Apto 205",
      monto: "$920/mes",
      estado: "Finalizado",
    },
  ];

  const mockPagos = [
    {
      fecha: "2024-11-15",
      monto: "$850",
      estado: "Pagado",
      concepto: "Renta Noviembre",
    },
    {
      fecha: "2024-10-15",
      monto: "$850",
      estado: "Pagado",
      concepto: "Renta Octubre",
    },
    {
      fecha: "2024-09-15",
      monto: "$850",
      estado: "Pagado",
      concepto: "Renta Septiembre",
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div
        className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900">Detalles del Cliente</h2>
            <p className="text-sm text-gray-500 mt-1">
              {cliente.nombre} {cliente.apellido}
            </p>
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
          {/* Estado */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Estado actual:</span>
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm ${getEstadoBadge(
                cliente.estado
              )}`}
            >
              {cliente.estado}
            </span>
          </div>

          {/* Información Personal */}
          <div className="bg-gray-50 rounded-lg p-5 space-y-4">
            <h3 className="text-sm text-gray-900">Información Personal</h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Nombre */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Nombre Completo</p>
                  <p className="text-sm text-gray-900">
                    {cliente.nombre} {cliente.apellido}
                  </p>
                </div>
              </div>

              {/* Identificación */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Identificación</p>
                  <p className="text-sm text-gray-900">
                    {cliente.identificacion}
                  </p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Teléfono</p>
                  <p className="text-sm text-gray-900">{cliente.telefono}</p>
                </div>
              </div>

              {/* Correo */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Correo Electrónico</p>
                  <p className="text-sm text-gray-900">{cliente.correo}</p>
                </div>
              </div>

              {/* Sucursal */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Sucursal</p>
                  <p className="text-sm text-gray-900">{cliente.sucursal}</p>
                </div>
              </div>

              {/* Fecha */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Fecha de Registro</p>
                  <p className="text-sm text-gray-900">
                    {cliente.fechaRegistro}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contratos Asociados */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="text-sm text-gray-900">Contratos Asociados</h3>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {mockContratos.map((contrato) => (
                <div
                  key={contrato.id}
                  className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-sm text-gray-900">{contrato.id}</p>
                    <p className="text-xs text-gray-600">
                      {contrato.apartamento}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-900">{contrato.monto}</p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                        contrato.estado === "Activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {contrato.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historial de Pagos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-600" />
              <h3 className="text-sm text-gray-900">
                Historial de Pagos Recientes
              </h3>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {mockPagos.map((pago, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-sm text-gray-900">{pago.concepto}</p>
                    <p className="text-xs text-gray-600">{pago.fecha}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-900">{pago.monto}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                      {pago.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <button
              onClick={() => onEdit(cliente)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-5 h-5" />
              Editar Cliente
            </button>

            <button
              onClick={() => onToggleEstado(cliente.id)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                cliente.estado === "Activo"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {cliente.estado === "Activo" ? (
                <>
                  <UserX className="w-5 h-5" />
                  Desactivar Cliente
                </>
              ) : (
                <>
                  <UserCheck className="w-5 h-5" />
                  Reactivar Cliente
                </>
              )}
            </button>

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

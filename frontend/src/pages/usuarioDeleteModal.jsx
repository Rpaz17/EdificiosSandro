import { X, AlertTriangle } from "lucide-react";

export function UsuarioDeleteModal({ usuario, onClose, onConfirm }) {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
            <h2 className="text-gray-900">Eliminar Usuario</h2>

            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Warning Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            {/* Warning Message */}
            <div className="text-center space-y-2">
              <p className="text-gray-900">
                ¿Estás seguro de que deseas eliminar este usuario?
              </p>
              <p className="text-sm text-gray-600">
                Esta acción lo marcará como eliminado y desactivará su estado.
              </p>
            </div>

            {/* Usuario Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ID:</span>
                <span className="text-sm text-gray-900">{usuario.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Correo:</span>
                <span className="text-sm text-gray-900">{usuario.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Rol:</span>
                <span className="text-sm text-gray-900">{usuario.rol}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Eliminar Usuario
              </button>

              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

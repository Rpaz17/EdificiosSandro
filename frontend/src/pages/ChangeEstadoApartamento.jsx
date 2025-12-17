import React, { useState } from "react";
import { X, Circle } from "lucide-react";

// Se eliminan las interfaces y las anotaciones de tipos.

export function ChangeEstadoApartamentoModal({ apartamento, onClose, onSave }) {
  // Inicializamos el estado usando el valor actual del apartamento
  const [selectedEstado, setSelectedEstado] = useState(apartamento.estado);
  const [motivo, setMotivo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSave recibe un objeto con el nuevo estado y el motivo
    onSave({ estado: selectedEstado, motivo });
  };

  const estados = [
    {
      value: "Disponible", // Se elimina 'as const'
      label: "Disponible",
      description: "El apartamento está disponible para alquiler",
      color: "green",
    },
    {
      value: "Ocupado", // Se elimina 'as const'
      label: "Ocupado",
      description: "El apartamento está actualmente ocupado",
      color: "blue",
    },
    {
      value: "Mantenimiento", // Se elimina 'as const'
      label: "Mantenimiento",
      description: "El apartamento requiere mantenimiento",
      color: "yellow",
    },
  ];

  const getColorClass = (color, selected) => {
    if (color === "green") {
      return selected
        ? "border-green-500 bg-green-50"
        : "border-gray-300 hover:border-green-300";
    }
    if (color === "blue") {
      return selected
        ? "border-blue-500 bg-blue-50"
        : "border-gray-300 hover:border-blue-300";
    }
    if (color === "yellow") {
      return selected
        ? "border-yellow-500 bg-yellow-50"
        : "border-gray-300 hover:border-yellow-300";
    }
    return "border-gray-300";
  };

  const getIndicatorColor = (color) => {
    if (color === "green") return "text-green-600";
    if (color === "blue") return "text-blue-600";
    if (color === "yellow") return "text-yellow-600";
    return "text-gray-600";
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
            <div>
              <h2 className="text-gray-900">Cambiar Estado del Apartamento</h2>
              <p className="text-sm text-gray-600 mt-1">
                {apartamento.numero} - {apartamento.torre}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Current Estado */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <label className="block text-sm text-gray-600 mb-1">
                Estado actual
              </label>
              <p className="text-sm text-gray-900">{apartamento.estado}</p>
            </div>

            {/* Estado Options */}
            <div>
              <label className="block text-sm text-gray-700 mb-3">
                Seleccionar nuevo estado <span className="text-red-600">*</span>
              </label>
              <div className="space-y-3">
                {estados.map((estado) => (
                  <button
                    key={estado.value}
                    type="button"
                    onClick={() => setSelectedEstado(estado.value)}
                    className={`w-full p-4 border-2 rounded-lg transition-all text-left ${getColorClass(
                      estado.color,
                      selectedEstado === estado.value
                    )}`}
                  >
                    <div className="flex items-start gap-3">
                      <Circle
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          selectedEstado === estado.value ? "fill-current" : ""
                        } ${getIndicatorColor(estado.color)}`}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{estado.label}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {estado.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Motivo del cambio */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Motivo del cambio <span className="text-red-600">*</span>
              </label>
              <textarea
                required
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe el motivo del cambio de estado..."
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
                className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Actualizar Estado
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

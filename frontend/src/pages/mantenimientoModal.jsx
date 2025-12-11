import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function MantenimientoModal({
  modalMode = "create", // 'create' | 'edit'
  selectedMantenimiento,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    tipo: "",
    descripcion: "",
    apartamento: "",
    cliente: "",
    prioridad: "",
    estado: "Pendiente",
    fechaReporte: new Date().toISOString().split("T")[0],
  });

  // Load existing data when editing
  useEffect(() => {
    if (modalMode === "edit" && selectedMantenimiento) {
      setFormData({
        tipo: selectedMantenimiento.tipo || "",
        descripcion: selectedMantenimiento.descripcion || "",
        apartamento: selectedMantenimiento.apartamento || "",
        cliente: selectedMantenimiento.cliente || "",
        prioridad: selectedMantenimiento.prioridad || "",
        estado: selectedMantenimiento.estado || "Pendiente",
        fechaReporte:
          selectedMantenimiento.fechaReporte ||
          new Date().toISOString().split("T")[0],
      });
    }
  }, [modalMode, selectedMantenimiento]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-gray-900">
              {modalMode === "create"
                ? "Nuevo Mantenimiento"
                : "Editar Mantenimiento"}
            </h2>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Tipo */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Tipo de mantenimiento
              </label>
              <input
                type="text"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                placeholder="Ej: Plomería, Electricidad, etc."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describe el problema o mantenimiento requerido"
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Apartamento */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Apartamento
              </label>
              <select
                name="apartamento"
                value={formData.apartamento}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar apartamento</option>
                <option>A101</option>
                <option>A205</option>
                <option>B203</option>
                <option>C305</option>
                <option>D102</option>
              </select>
            </div>

            {/* Cliente */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Cliente
              </label>
              <select
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar cliente</option>
                <option>Juan Pérez</option>
                <option>Ana Martínez</option>
                <option>Roberto Silva</option>
                <option>Carmen López</option>
                <option>Miguel Rodríguez</option>
              </select>
            </div>

            {/* Prioridad */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Prioridad
              </label>
              <select
                name="prioridad"
                value={formData.prioridad}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar prioridad</option>
                <option>Alta</option>
                <option>Media</option>
                <option>Baja</option>
              </select>
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Estado</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option>Pendiente</option>
                <option>En proceso</option>
                <option>Completado</option>
              </select>
            </div>

            {/* Fecha */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Fecha de reporte
              </label>
              <input
                type="date"
                name="fechaReporte"
                value={formData.fechaReporte}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {selectedMantenimiento
                  ? "Guardar Cambios"
                  : "Crear Mantenimiento"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

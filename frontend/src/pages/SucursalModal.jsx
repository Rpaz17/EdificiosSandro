import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function SucursalModal({ sucursal, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nombre: "",
    ciudad: "",
    sector: "",
    calle: "",
    createdBy: "Admin Principal",
    updatedBy: "Admin Principal",
  });

  useEffect(() => {
    if (sucursal) {
      setFormData({
        nombre: sucursal.nombre,
        ciudad: sucursal.ciudad,
        sector: sucursal.sector,
        calle: sucursal.calle,
        createdBy: sucursal.createdBy || "Admin Principal",
        updatedBy: "Admin Principal",
      });
    }
  }, [sucursal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
            <div>
              <h2 className="text-gray-900">
                {sucursal ? "Editar Sucursal" : "Registrar Sucursal"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {sucursal
                  ? "Actualiza la información de la sucursal"
                  : "Completa los datos de la nueva sucursal"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm text-gray-700 mb-2"
              >
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="Ej: Sucursal Centro"
              />
            </div>

            <div className="border-t border-gray-100"></div>

            {/* Ciudad */}
            <div>
              <label
                htmlFor="ciudad"
                className="block text-sm text-gray-700 mb-2"
              >
                Ciudad
              </label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="Ej: Santo Domingo"
              />
            </div>

            {/* Sector */}
            <div>
              <label
                htmlFor="sector"
                className="block text-sm text-gray-700 mb-2"
              >
                Sector
              </label>
              <input
                type="text"
                id="sector"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="Ej: Piantini"
              />
            </div>

            {/* Calle */}
            <div>
              <label
                htmlFor="calle"
                className="block text-sm text-gray-700 mb-2"
              >
                Calle
              </label>
              <input
                type="text"
                id="calle"
                name="calle"
                value={formData.calle}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="Ej: Av. Abraham Lincoln #45"
              />
            </div>

            {/* Botones */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                {sucursal ? "Guardar Cambios" : "Guardar"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

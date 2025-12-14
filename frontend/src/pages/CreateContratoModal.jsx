import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
//import { fetchClientes } from "../services/clientes.api";
import { fetchApartamentos } from "../services/apartamentoServices";

export function CreateContratoModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    id_cliente: "",
    id_apartamento: "",
    periodo_inicio: "",
    periodo_fin: "",
    monto: "",
    deposito: "",
    estado: "Activo",
    notas: "",
  });

  const [clientes, setClientes] = useState([]);
  const [apartamentos, setApartamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const [clientesData, aptRes] = await Promise.all([
          fetchClientes(),
          fetchApartamentos(), 
        ]);

        setClientes(Array.isArray(clientesData) ? clientesData : []);

        // aptRes.data es array de aptos
        const apts = Array.isArray(aptRes.data) ? aptRes.data : [];

        const disponibles = apts.filter(
          (a) => (a.estado_ocupacion || "").toLowerCase() !== "ocupado" && a.is_deleted === false
        );

        setApartamentos(disponibles);
      } catch (error) {
        console.error(error);
        alert("Error cargando clientes/apartamentos");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Payload EXACTO que espera tu backend
    const payload = {
      id_cliente: Number(formData.id_cliente),
      id_apartamento: Number(formData.id_apartamento),
      periodo_inicio: formData.periodo_inicio,
      periodo_fin: formData.periodo_fin,
      monto: Number(formData.monto),
      deposito: formData.deposito === "" ? null : Number(formData.deposito),
      estado: formData.estado,
    };

    onSave(payload);
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-gray-900">Crear Nuevo Contrato</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Cliente */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Cliente <span className="text-red-600">*</span>
            </label>
            <select
              name="id_cliente"
              required
              value={formData.id_cliente}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{loading ? "Cargando..." : "Seleccionar cliente"}</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {/* Ajusta el campo nombre real del cliente */}
                  {c.nombre ?? c.nombre_completo ?? `Cliente ${c.id}`}
                </option>
              ))}
            </select>
          </div>

          {/* Apartamento */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Apartamento <span className="text-red-600">*</span>
            </label>
            <select
              name="id_apartamento"
              required
              value={formData.id_apartamento}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{loading ? "Cargando..." : "Seleccionar apartamento"}</option>
              {apartamentos.map((a) => (
                <option key={a.id} value={a.id}>
                  {`Apt ${a.numero_apartamento} (Sucursal ${a.id_sucursal})`}
                </option>
              ))}
            </select>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Fecha de inicio <span className="text-red-600">*</span>
              </label>
              <input
                name="periodo_inicio"
                type="date"
                required
                value={formData.periodo_inicio}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Fecha de fin <span className="text-red-600">*</span>
              </label>
              <input
                name="periodo_fin"
                type="date"
                required
                value={formData.periodo_fin}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Monto y depósito */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Monto mensual <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">US$</span>
                <input
                  name="monto"
                  type="number"
                  step="0.01"
                  required
                  value={formData.monto}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Depósito (opcional)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">US$</span>
                <input
                  name="deposito"
                  type="number"
                  step="0.01"
                  value={formData.deposito}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Estado inicial del contrato <span className="text-red-600">*</span>
            </label>
            <select
              name="estado"
              required
              value={formData.estado}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Activo</option>
              <option>Próximo a vencer</option>
              <option>Finalizado</option>
              <option>Cancelado</option>
            </select>
          </div>

          {/* Notas (no se guardan aún) */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Notas</label>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Añade notas adicionales sobre el contrato..."
            />
            <p className="text-xs text-gray-500 mt-2">
              *Nota: “Notas” todavía no se guardan en la BD porque el modelo Contrato no tiene ese campo.
            </p>
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
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              Crear Contrato
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

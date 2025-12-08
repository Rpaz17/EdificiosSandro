import { useState } from "react";
import {
  Search,
  Calendar,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Filters } from "../components/Filters";
import { ComprobanteDetalle } from "../components/comprobanteDetalle";

/**
 * @typedef {Object} Comprobante
 * @property {string} codigo
 * @property {string} cliente
 * @property {number} monto
 * @property {string} metodoPago
 * @property {string} fechaEnvio
 * @property {'Pendiente' | 'Validado' | 'Rechazado'} estado
 * @property {string} imagenUrl
 */

/** @type {Comprobante[]} */
const filters = [
  {
    id: "estado",
    label: "Estado",
    placeholder: "Todos",
    options: [
      { label: "Pendiente", value: 1 },
      { label: "Rechazado", value: 2 },
      { label: "Validado", value: 3 },
    ],
  },
  {
    id: "sucursal",
    label: "Sucursal",
    placeholder: "Todas",
    options: [
      { label: "Centro", value: "1" },
      { label: "Norte", value: "2" },
      { label: "Sur", value: "3" },
      { label: "Este", value: "4" },
    ],
  },
];

const values = {
  sucursal: 2,
  torre: "A",
  estado: "1",
};

const mockComprobantes = [
  {
    codigo: "COMP-2024-156",
    cliente: "María González",
    monto: 850,
    metodoPago: "Transferencia",
    fechaEnvio: "2024-11-27",
    estado: "Pendiente",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
  },
  {
    codigo: "COMP-2024-155",
    cliente: "Carlos Ramírez",
    monto: 920,
    metodoPago: "Depósito",
    fechaEnvio: "2024-11-26",
    estado: "Validado",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
  },
  {
    codigo: "COMP-2024-154",
    cliente: "Ana Martínez",
    monto: 780,
    metodoPago: "Transferencia",
    fechaEnvio: "2024-11-25",
    estado: "Pendiente",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
  },
  {
    codigo: "COMP-2024-153",
    cliente: "Luis Pérez",
    monto: 1100,
    metodoPago: "Efectivo",
    fechaEnvio: "2024-11-24",
    estado: "Rechazado",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
  },
  {
    codigo: "COMP-2024-152",
    cliente: "Sofia Torres",
    monto: 695,
    metodoPago: "Transferencia",
    fechaEnvio: "2024-11-23",
    estado: "Validado",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
  },
  {
    codigo: "COMP-2024-151",
    cliente: "Roberto Díaz",
    monto: 1250,
    metodoPago: "Depósito",
    fechaEnvio: "2024-11-22",
    estado: "Pendiente",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
  },
  {
    codigo: "COMP-2024-150",
    cliente: "Patricia Gómez",
    monto: 875,
    metodoPago: "Transferencia",
    fechaEnvio: "2024-11-21",
    estado: "Validado",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
  },
];

export function Comprobantes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("Todos");

  const [selectedComprobante, setSelectedComprobante] = useState(null);
  const [comprobantes, setComprobantes] = useState(mockComprobantes);

  const filteredComprobantes = comprobantes.filter((comp) => {
    const matchesSearch =
      comp.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado =
      estadoFilter === "Todos" || comp.estado === estadoFilter;
    return matchesSearch && matchesEstado;
  });

  const getEstadoBadge = (estado) => {
    const badges = {
      Pendiente: "bg-yellow-100 text-yellow-800",
      Validado: "bg-green-100 text-green-800",
      Rechazado: "bg-red-100 text-red-800",
    };
    return badges[estado] || "";
  };
  const handleValidate = (codigo) => {
    setComprobantes((prev) =>
      prev.map((comp) =>
        comp.codigo === codigo ? { ...comp, estado: "Validado" } : comp
      )
    );
    if (selectedComprobante?.codigo === codigo) {
      setSelectedComprobante((prev) =>
        prev ? { ...prev, estado: "Validado" } : null
      );
    }
  };

  const handleReject = (codigo) => {
    setComprobantes((prev) =>
      prev.map((comp) =>
        comp.codigo === codigo ? { ...comp, estado: "Rechazado" } : comp
      )
    );
    if (selectedComprobante?.codigo === codigo) {
      setSelectedComprobante((prev) =>
        prev ? { ...prev, estado: "Rechazado" } : null
      );
    }
  };

  return (
    <div className="p-6 ">
      <div className="space-y-6">
        {" "}
        {/* Page Title */}
        <div>
          <PageHeader
            title={"Comprobantes"}
            description={
              "Revisa y valida los comprobantes de pago enviados por los clientes"
            }
          />
        </div>
        <div>
          <Filters
            title="comprobantes"
            filters={filters}
            values={values}
          ></Filters>
        </div>
        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando{" "}
            <span className="text-gray-900">{filteredComprobantes.length}</span>{" "}
            comprobantes
          </p>
        </div>
        {/* Comprobantes Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Código del Comprobante
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Cliente
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Monto
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Método de Pago
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Fecha de Envío
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredComprobantes.map((comp) => (
                  <tr
                    key={comp.codigo}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {comp.codigo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {comp.cliente}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${comp.monto.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {comp.metodoPago}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {comp.fechaEnvio}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                          comp.estado
                        )}`}
                      >
                        {comp.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedComprobante(comp)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver detalle"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedComprobante && (
        <ComprobanteDetalle
          comprobante={selectedComprobante}
          onClose={() => setSelectedComprobante(null)}
          onValidate={handleValidate}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

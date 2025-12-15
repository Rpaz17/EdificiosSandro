import { useEffect, useState } from "react";
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
import {
  aprobarComprobante,
  fetchComprobantes,
  rechazarComprobante,
} from "../services/comprobantes.api";

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
    id: "COMP-2024-156",
    cliente: "María González",
    monto: 850,
    metodoPago: "Transferencia",
    fechaEnvio: "2024-11-27",
    estado: "Pendiente",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
  },
  {
    id: "COMP-2024-155",
    nombre: "Carlos Ramírez",
    monto: 920,
    metodoPago: "Depósito",
    fechaEnvio: "2024-11-26",
    estado: "Validado",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
  },
  {
    id: "COMP-2024-154",
    nombre: "Ana Martínez",
    monto: 780,
    metodoPago: "Transferencia",
    fechaEnvio: "2024-11-25",
    estado: "Pendiente",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
  },
  {
    id: "COMP-2024-153",
    nombre: "Luis Pérez",
    monto: 1100,
    metodoPago: "Efectivo",
    fechaEnvio: "2024-11-24",
    estado: "Rechazado",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
  },
  {
    id: "COMP-2024-152",
    nombre: "Sofia Torres",
    monto: 695,
    metodoPago: "Transferencia",
    fechaEnvio: "2024-11-23",
    estado: "Validado",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
  },
  {
    id: "COMP-2024-151",
    nombre: "Roberto Díaz",
    monto: 1250,
    metodoPago: "Depósito",
    fechaEnvio: "2024-11-22",
    estado: "Pendiente",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
  },
  {
    id: "COMP-2024-150",
    nombre: "Patricia Gómez",
    monto: 875,
    metodoPago: "Transferencia",
    fechaEnvio: "2024-11-21",
    estado: "Validado",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
  },
];

export function Comprobantes() {
  const [selectedComprobante, setSelectedComprobante] = useState(null);
  const [comprobantes, setComprobantes] = useState([]);

  //useEffect
  useEffect(() => {
    //loadComprobantes
    const loadComprobantes = async () => {
      try {
        const comprobantesdb = await fetchComprobantes();
        console.log(comprobantesdb);
        setComprobantes(comprobantesdb);
      } catch (err) {
        console.error(err);
      }
    };
    loadComprobantes();
  }, []);

  const getEstadoBadge = (estado) => {
    const badges = {
      Pendiente: "bg-yellow-100 text-yellow-800",
      Validado: "bg-green-100 text-green-800",
      Rechazado: "bg-red-100 text-red-800",
    };
    return badges[estado] || "";
  };
  const handleValidate = async (id) => {
    //Actualizar en frontend
    setComprobantes((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, estado: "Validado" } : comp
      )
    );
    if (selectedComprobante?.id === id) {
      setSelectedComprobante((prev) =>
        prev ? { ...prev, estado: "Validado" } : null
      );
    }

    try {
      await aprobarComprobante(id);
      console.log("comprobante validado:", id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    setComprobantes((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, estado: "Rechazado" } : comp
      )
    );
    if (selectedComprobante?.id === id) {
      setSelectedComprobante((prev) =>
        prev ? { ...prev, estado: "Rechazado" } : null
      );
    }
    try {
      await rechazarComprobante(id);
      console.log("comprobante validado:", id);
    } catch (err) {
      console.error(err);
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
            Mostrando {comprobantes.length} comprobantes
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
                {comprobantes?.map((comp) => (
                  <tr
                    key={comp.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {comp.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {comp.cliente.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${comp.pago.monto.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {comp.pago.metodo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {comp.fecha_subido}
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

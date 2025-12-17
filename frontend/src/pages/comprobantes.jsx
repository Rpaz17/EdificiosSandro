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
import { listarSucursales } from "../services/sucursales.api";

export function Comprobantes() {
  const [selectedComprobante, setSelectedComprobante] = useState(null);
  const [comprobantes, setComprobantes] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const [filterValues, setFilterValues] = useState({
    estado: "",
    sucursal: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filters = [
    {
      id: "estado",
      label: "Estado",
      placeholder: "Todos",
      options: [
        { label: "Pendiente", value: "Pendiente" },
        { label: "Rechazado", value: "Rechazado" },
        { label: "Validado", value: "Validado" },
      ],
    },
    {
      id: "sucursal",
      label: "Sucursal",
      placeholder: "Todas",
      options: sucursales.map((s) => ({
        label: s.nombre,
        value: String(s.id),
      })),
    },
  ];

  const filteredComprobantes = comprobantes.filter((comp) => {
    const matchesSearch =
      searchTerm === "" ||
      comp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.cliente?.nombre?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEstado =
      !filterValues.estado || comp.estado === filterValues.estado;

    // Intentar buscar el ID de sucursal en varias ubicaciones posibles
    const compSucursalId = String(
      comp.sucursal_id || comp.sucursal?.id || comp.contrato?.sucursal_id || ""
    );
    const matchesSucursal =
      !filterValues.sucursal || compSucursalId === filterValues.sucursal;

    return matchesSearch && matchesEstado && matchesSucursal;
  });

  const handleFilterChange = (id, value) => {
    setFilterValues((prev) => ({ ...prev, [id]: value }));
  };

  //useEffect
  useEffect(() => {
    //loadComprobantes
    const loadComprobantes = async () => {
      try {
        const sucursales = await listarSucursales();
        setSucursales(sucursales);
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
      console.log("comprobante rechazado:", id);
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
            values={filterValues}
            onChange={handleFilterChange}
            searchValue={searchTerm}
            onSearch={setSearchTerm}
          ></Filters>
        </div>
        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {filteredComprobantes.length} comprobantes
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
                {filteredComprobantes?.map((comp) => (
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

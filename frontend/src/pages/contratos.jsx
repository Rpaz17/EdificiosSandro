import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { ContratoDetailPanel } from "./ContratoDetallesModal";
import { CreateContratoModal } from "./CreateContratoModal";
import { EditContratoModal } from "./EditContratoModal";
import { RenewContratoModal } from "./RenewContratoModal";
import { FinalizeContratoModal } from "./FinalizeContratoModal";
import {
  createContrato,
  fetchContratoById,
  fetchContratos,
  updateContrato,
  deleteContrato,
} from "../services/contratos.api";
import { fetchApartamentos } from "../services/apartamentoServices";
import { fetchClientes } from "../services/clientes.api";
import { PageHeader } from "../components/PageHeader";
import { listarSucursales } from "../services/sucursales.api";

const mockContratos = [
  {
    id: "1",
    cliente: "María González",
    codigoContrato: "CTR-2024-001",
    apartamento: "Apt 301 - Torre A",
    sucursal: "Centro",
    tipoContrato: "Anual",
    fechaInicio: "14 ene 2024",
    fechaFin: "14 ene 2025",
    montoMensual: 1500.0,
    deposito: 3000.0,
    estado: "Activo",
    duracion: "12 meses",
    notas: "Cliente preferencial, renovación automática acordada.",
    fechaCreacion: "14 de enero de 2024",
    ultimaActualizacion: "21 de noviembre de 2024",
  },
  {
    id: "2",
    cliente: "Carlos Ramírez",
    codigoContrato: "CTR-2024-002",
    apartamento: "Apt 502 - Torre B",
    sucursal: "Norte",
    tipoContrato: "Mensual",
    fechaInicio: "30 nov 2023",
    fechaFin: "30 dic 2024",
    montoMensual: 1200.0,
    deposito: 2400.0,
    estado: "Próximo a vencer",
    duracion: "13 meses",
    fechaCreacion: "30 de noviembre de 2023",
    ultimaActualizacion: "15 de noviembre de 2024",
  },
  {
    id: "3",
    cliente: "Ana Martínez",
    codigoContrato: "CTR-2024-003",
    apartamento: "Apt 105 - Torre A",
    sucursal: "Centro",
    tipoContrato: "Anual",
    fechaInicio: "29 feb 2024",
    fechaFin: "31 ago 2024",
    montoMensual: 800.0,
    deposito: 1600.0,
    estado: "Finalizado",
    duracion: "6 meses",
    fechaCreacion: "29 de febrero de 2024",
    ultimaActualizacion: "31 de agosto de 2024",
  },
  {
    id: "4",
    cliente: "Roberto Silva",
    codigoContrato: "CTR-2024-004",
    apartamento: "Apt 208 - Torre C",
    sucursal: "Sur",
    tipoContrato: "Anual",
    fechaInicio: "31 may 2024",
    fechaFin: "31 may 2025",
    montoMensual: 1800.0,
    deposito: 3600.0,
    estado: "Activo",
    duracion: "12 meses",
    fechaCreacion: "31 de mayo de 2024",
    ultimaActualizacion: "5 de diciembre de 2024",
  },
  {
    id: "5",
    cliente: "Lucía Fernández",
    codigoContrato: "CTR-2024-005",
    apartamento: "Apt 410 - Torre B",
    sucursal: "Norte",
    tipoContrato: "Mensual",
    fechaInicio: "31 ene 2024",
    fechaFin: "30 abr 2024",
    montoMensual: 950.0,
    deposito: 1900.0,
    estado: "Cancelado",
    duracion: "3 meses",
    fechaCreacion: "31 de enero de 2024",
    ultimaActualizacion: "15 de abril de 2024",
  },
  {
    id: "6",
    cliente: "Jorge Morales",
    codigoContrato: "CTR-2024-006",
    apartamento: "Apt 701 - Torre A",
    sucursal: "Centro",
    tipoContrato: "Anual",
    fechaInicio: "14 abr 2024",
    fechaFin: "14 abr 2025",
    montoMensual: 2000.0,
    deposito: 4000.0,
    estado: "Activo",
    duracion: "12 meses",
    fechaCreacion: "14 de abril de 2024",
    ultimaActualizacion: "1 de diciembre de 2024",
  },
  {
    id: "7",
    cliente: "Patricia Vargas",
    codigoContrato: "CTR-2024-007",
    apartamento: "Apt 315 - Torre C",
    sucursal: "Este",
    tipoContrato: "Anual",
    fechaInicio: "30 abr 2024",
    fechaFin: "30 abr 2025",
    montoMensual: 1350.0,
    deposito: 2700.0,
    estado: "Activo",
    duracion: "12 meses",
    fechaCreacion: "30 de abril de 2024",
    ultimaActualizacion: "28 de noviembre de 2024",
  },
];

export function Contratos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [sucursalFilter, setSucursalFilter] = useState("Todas las sucursales");
  const [estadoFilter, setEstadoFilter] = useState("Todos");
  const [tipoFilter, setTipoFilter] = useState("Todos");

  const [contratos, setContratos] = useState(mockContratos);

  const [selectedContrato, setSelectedContrato] = useState(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);
  const [sucursales, setSucursales] = useState([]);
  const [sucursalesLoading, setSucursalesLoading] = useState(false);
  useEffect(() => {
    loadContratos();
    loadSucursales();
  }, []);
    const loadSucursales = async() => {
    setSucursalesLoading(true);
    try{
      const res = await listarSucursales();
      const data = res?.data ?? res;
      setSucursales(data || []);
    }catch(error){
      console.error("Error loading sucursales:", error);
    }finally{
      setSucursalesLoading(false);
    }
  };

  const loadContratos = async () => {
    try {
      const [contratosApi, clientesApi, aptsRes] = await Promise.all([
        fetchContratos(),
        fetchClientes(),
        fetchApartamentos(),
      ]);

      const aptsApi = aptsRes.data;

      const clientesById = new Map(clientesApi.map((c) => [String(c.id), c]));
      const aptsById = new Map(aptsApi.map((a) => [String(a.id), a]));

      const mapped = (contratosApi || []).map((c) => {
        const cliente = clientesById.get(String(c.id_cliente));
        const apt = aptsById.get(String(c.id_apartamento));

        const nombreCliente =
          cliente?.nombre ??
          cliente?.nombre_completo ??
          cliente?.nombres ??
          `Cliente ${c.id_cliente}`;

        const aptLabel = apt
          ? `Apt ${apt.numero_apartamento}`
          : `Apartamento ${c.id_apartamento}`;

        const sucursalLabel = apt?.id_sucursal
          ? `Sucursal ${apt.id_sucursal}`
          : "-";

        return {
          id: String(c.id),

          cliente: nombreCliente,

          codigoContrato: `CTR-${String(c.id).padStart(4, "0")}`,

          apartamento: aptLabel,
          sucursal: sucursalLabel,

          fechaInicio: c.periodo_inicio || "",
          fechaFin: c.periodo_fin || "",
          montoMensual: Number(c.monto) || 0,
          deposito: Number(c.deposito) || 0,
          estado: c.estado || "—",

          tipoContrato: "-",
          duracion: "-",
          fechaCreacion: c.created_at || "",
          ultimaActualizacion: c.updated_at || "",

          id_cliente: c.id_cliente,
          id_apartamento: c.id_apartamento,
        };
      });

      setContratos(mapped);
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.mensaje || "Error cargando contratos");
    }
  };

  const filteredContratos = useMemo(() => {
    return contratos.filter((contrato) => {
      const matchesSearch =
        (contrato.cliente || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (contrato.codigoContrato || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesSucursal =
        sucursalFilter === "Todas las sucursales" ||
        contrato.sucursal === sucursalFilter;

      const matchesEstado =
        estadoFilter === "Todos" || contrato.estado === estadoFilter;
      const matchesTipo =
        tipoFilter === "Todos" || contrato.tipoContrato === tipoFilter;

      // fechas (opcional; si luego guardas fechas como string YYYY-MM-DD funciona)
      const matchesFechaInicio =
        !fechaInicio || contrato.fechaInicio >= fechaInicio;
      const matchesFechaFin = !fechaFin || contrato.fechaFin <= fechaFin;

      return (
        matchesSearch &&
        matchesSucursal &&
        matchesEstado &&
        matchesTipo &&
        matchesFechaInicio &&
        matchesFechaFin
      );
    });
  }, [
    contratos,
    searchTerm,
    sucursalFilter,
    estadoFilter,
    tipoFilter,
    fechaInicio,
    fechaFin,
  ]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setFechaInicio("");
    setFechaFin("");
    setSucursalFilter("Todas las sucursales");
    setEstadoFilter("Todos");
    setTipoFilter("Todos");
  };

  const handleViewDetails = (contrato) => {
    setSelectedContrato(contrato);
    setIsDetailPanelOpen(true);
  };

  const handleEdit = (contrato) => {
    setSelectedContrato(contrato);
    setIsEditModalOpen(true);
  };

  const handleRenew = (contrato) => {
    setSelectedContrato(contrato);
    setIsRenewModalOpen(true);
  };

  const handleFinalize = (contrato) => {
    setSelectedContrato(contrato);
    setIsFinalizeModalOpen(true);
  };

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "activo":
        return "bg-green-100 text-green-800";
      case "próximo a vencer":
        return "bg-yellow-100 text-yellow-800";
      case "finalizado":
        return "bg-gray-100 text-gray-800";
      case "cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Contratos"
        description="Gestiona y supervisa todos los contratos de alquiler"
        actionButton={{
          label: "Nuevo Contrato",
          icon: <Plus className="w-5 h-5" />,
          onClick: () => setIsCreateModalOpen(true),
        }}
      />

      {/* Filters Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Filtros de Contratos</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Fecha de inicio */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Fecha de inicio
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Fecha de fin */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Fecha de fin
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Sucursal */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Sucursal</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={sucursalFilter}
                onChange={(e) => setSucursalFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="ALL">
                  {sucursalesLoading ? "Cargando..." : "Todas las sucursales"}
                </option>

                {sucursales.map((s) => (
                  <option key={s.id} value={String(s.id)}>
                    {s.nombre ?? s.descripcion ?? `Sucursal ${s.id}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Estado del contrato */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Estado del contrato
            </label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={estadoFilter}
                onChange={(e) => setEstadoFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option>Todos</option>
                <option>Activo</option>
                <option>Finalizado</option>
                <option>Próximo a vencer</option>
                <option>Cancelado</option>
              </select>
            </div>
          </div>

          {/* Tipo de contrato */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Tipo de contrato
            </label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={tipoFilter}
                onChange={(e) => setTipoFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option>Todos</option>
                <option>Mensual</option>
                <option>Anual</option>
                <option>Renovado</option>
              </select>
            </div>
          </div>

          {/* Buscar */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por cliente o número de contrato"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3">
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Aplicar Filtros
          </button>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Contratos Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-gray-200">
          <h3 className="text-gray-900">Listado de Contratos</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">
                  Apartamento
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">
                  Fecha de inicio
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">
                  Fecha de fin
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">
                  Monto mensual
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">
                  Depósito
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
              {filteredContratos.map((contrato) => (
                <tr
                  key={contrato.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">
                        {contrato.cliente}
                      </div>
                      <div className="text-sm text-gray-600">
                        {contrato.codigoContrato}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {contrato.apartamento}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-900">
                    {contrato.fechaInicio}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {contrato.fechaFin}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-900">
                    {Number(contrato.montoMensual).toFixed(2)} US$
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-900">
                    {Number(contrato.deposito).toFixed(2)} US$
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                        contrato.estado
                      )}`}
                    >
                      {contrato.estado}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(contrato)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleEdit(contrato)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredContratos.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No hay contratos para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {filteredContratos.length} contrato(s)
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {isDetailPanelOpen && selectedContrato && (
        <ContratoDetailPanel
          contrato={selectedContrato}
          onClose={() => {
            setIsDetailPanelOpen(false);
            setSelectedContrato(null);
          }}
          onEdit={(contrato) => {
            setIsDetailPanelOpen(false);
            handleEdit(contrato);
          }}
          onRenew={(contrato) => {
            setIsDetailPanelOpen(false);
            handleRenew(contrato);
          }}
          onFinalize={(contrato) => {
            setIsDetailPanelOpen(false);
            handleFinalize(contrato);
          }}
        />
      )}

      {/* Create Modal */}
      {isCreateModalOpen && (
        <CreateContratoModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={async (contratoData) => {
            try {
              await createContrato(contratoData);
              setIsCreateModalOpen(false);
              loadContratos();
            } catch (Error) {
              console.error(error);
              alert(error?.response?.data?.mensaje || "Error creando contrato");
            }
          }}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedContrato && (
        <EditContratoModal
          contrato={selectedContrato}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedContrato(null);
          }}
          onSave={async (contratoData) => {
            try {
              await updateContrato(selectedContrato.id, contratoData);
              setIsEditModalOpen(false);
              setSelectedContrato(null);
              await loadContratos();
            } catch (error) {
              console.error(error);
              alert(
                error?.response?.data?.mensaje || "Error actualizando contrato"
              );
            }
          }}
        />
      )}

      {/* Renew Modal */}
      {isRenewModalOpen && selectedContrato && (
        <RenewContratoModal
          contrato={selectedContrato}
          onClose={() => {
            setIsRenewModalOpen(false);
            setSelectedContrato(null);
          }}
          onRenew={(renewData) => {
            setIsRenewModalOpen(false);
            setSelectedContrato(null);
          }}
        />
      )}

      {/* Finalize Modal */}
      {isFinalizeModalOpen && selectedContrato && (
        <FinalizeContratoModal
          contrato={selectedContrato}
          onClose={() => {
            setIsFinalizeModalOpen(false);
            setSelectedContrato(null);
          }}
          onFinalize={(finalizeData) => {
            setIsFinalizeModalOpen(false);
            setSelectedContrato(null);
          }}
        />
      )}
    </div>
  );
}

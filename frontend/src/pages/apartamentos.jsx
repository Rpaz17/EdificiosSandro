import { useEffect } from "react";
import {
  fetchApartamentos,
  createApartamento,
  updateApartamento,
  deleteApartamento,
} from "../services/apartamentoServices";
import { useState } from "react";
import { Search, Filter, Plus, Edit, Trash2, Home, Eye, AlertOctagon } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CreateApartamentoModal } from "./CreateApartamentoModal";
import { EditApartamentoModal } from "./EditApartamentoModal";
import { ChangeEstadoApartamentoModal } from "./ChangeEstadoApartamento";
import { ApartamentoDetailPanel } from "./ApartamentoDetallesModal";
import { DeleteApartamentoModal } from "./DeleteApartamentoModal";
import api from "../services/api";
import { listarSucursales } from "../services/sucursales.api";

/**
 * Modelo de datos de un Apartamento
 * @typedef {Object} Apartamento
 * @property {string} id
 * @property {string} numero
 * @property {string} torre
 * @property {string} sucursal
 * @property {string} tipo
 * @property {"Disponible" | "Ocupado" | "Mantenimiento"} estado
 * @property {number} precioMensual
 * @property {number} habitaciones
 * @property {number} banos
 * @property {number} tamano
 * @property {number} piso
 * @property {string} [descripcion]
 * @property {string} [notas]
 * @property {number} [ocupantesMaximos]
 * @property {number} [deposito]
 * @property {string} [contratoActivo]
 * @property {string} fechaCreacion
 * @property {string} ultimaActualizacion
 */

export function Apartamentos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sucursalFilter, setSucursalFilter] = useState("Todas las sucursales");
  const [torreFilter, setTorreFilter] = useState("Todas las torres");
  const [estadoFilter, setEstadoFilter] = useState("Todos los estados");
  const [tipoFilter, setTipoFilter] = useState("Todos los tipos");
  const [apartamentos, setApartamentos] = useState([]);
  const [selectedApartamento, setSelectedApartamento] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangeEstadoModalOpen, setIsChangeEstadoModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [sucursales, setSucursales] = useState([]);
  const [sucursalesLoading, setSucursalesLoading] = useState(false);

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

  const filteredApartamentos = apartamentos.filter((apt) => {
    const matchesSearch = apt.numero
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSucursal =
      sucursalFilter === "Todas las sucursales" ||
      String(apt.sucursal) === String(sucursalFilter);
    const matchesTorre =
      torreFilter === "Todas las torres" || apt.torre === torreFilter;
    const matchesEstado =
      estadoFilter === "Todos los estados" || apt.estado === estadoFilter;
    const matchesTipo =
      tipoFilter === "Todos los tipos" || apt.tipo === tipoFilter;
    return (
      matchesSearch &&
      matchesSucursal &&
      matchesTorre &&
      matchesEstado &&
      matchesTipo
    );
  });

  const loadApartamentos = async () => {
    const res = await fetchApartamentos();
    const apiApts = res.data;

    const mapped = apiApts.map((apt) => ({
      id: String(apt.id),
      numero: `Apt ${apt.numero_apartamento}`,
      sucursal: `Sucursal ${apt.id_sucursal}`,
      estado: apt.estado_ocupacion,
      precioMensual: Number(apt.precio_mensual) || 0,
      descripcion: apt.descripcion || "",
      fechaCreacion: apt.createdAt || "",
      ultimaActualizacion: apt.updatedAt || "",
    }));

    setApartamentos(mapped);
  };

  useEffect(() => {
    loadApartamentos();
    loadSucursales();
  }, []);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSucursalFilter("Todas las sucursales");
    setTorreFilter("Todas las torres");
    setEstadoFilter("Todos los estados");
    setTipoFilter("Todos los tipos");
  };

  const handleViewDetails = (apartamento) => {
    setSelectedApartamento(apartamento);
    setIsDetailPanelOpen(true);
  };

  const handleEdit = (apartamento) => {
    setSelectedApartamento(apartamento);
    setIsEditModalOpen(true);
  };

  const handleChangeEstado = (apartamento) => {
    setSelectedApartamento(apartamento);
    setIsChangeEstadoModalOpen(true);
  };

  const handleDelete = (apartamento) => {
    setSelectedApartamento(apartamento);
    setIsDeleteModalOpen(true);
  };

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "ocupado":
        return "bg-blue-100 text-blue-800";
      case "disponible":
        return "bg-green-100 text-green-800";
      case "mantenimiento":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 ">
      <div className="space-y-6">
        {" "}
        <PageHeader
          title="Apartamentos"
          description="Gestiona y supervisa todos los apartamentos disponibles para alquiler"
          actionButton={{
            label: "Nuevo Apartamento",
            icon: <Plus className="w-4 h-4" />,
            onClick: () => setIsCreateModalOpen(true),
          }}
        />
        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-gray-900">Filtros de Apartamentos</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Sucursal */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Sucursal
              </label>
              <select
                value={sucursalFilter}
                onChange={(e) => setSucursalFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
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

            {/* Estado */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Estado del Apartamento
              </label>
              <select
                value={estadoFilter}
                onChange={(e) => setEstadoFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
              >
                <option>Todos los estados</option>
                <option>Disponible</option>
                <option>Ocupado</option>
                <option>Mantenimiento</option>
              </select>
            </div>

            {/* Buscar */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Número de apto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          {/* Botones filtros */}
          <div className="flex gap-3">
            <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Aplicar Filtros
            </button>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 flex items-center justify-between border-b border-gray-200">
            <h3 className="text-gray-900">Listado de Apartamentos</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Apartamento
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Sucursal
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Precio Mensual
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApartamentos.map((apartamento) => (
                  <tr
                    key={apartamento.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Home className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-900">
                            {apartamento.numero}
                          </div>
                          <div className="text-sm text-gray-600">
                            {apartamento.torre}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {apartamento.sucursal}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                          apartamento.estado
                        )}`}
                      >
                        {apartamento.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {apartamento.precioMensual.toFixed(2)} US$
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(apartamento)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleEdit(apartamento)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleChangeEstado(apartamento)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Cambiar estado"
                        >
                          E
                        </button>

                        <button
                          onClick={() => handleDelete(apartamento)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Mostrando 1 a {filteredApartamentos.length} de{" "}
              {apartamentos.length} apartamentos
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Anterior
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Siguiente
              </button>
            </div>
          </div>
        </div>{" "}
      </div>

      {/* Panel lateral de detalle */}
      {isDetailPanelOpen && selectedApartamento && (
        <ApartamentoDetailPanel
          apartamento={selectedApartamento}
          onClose={() => {
            setIsDetailPanelOpen(false);
            setSelectedApartamento(null);
          }}
          onViewFull={() => {}}
          onEdit={(apt) => {
            setIsDetailPanelOpen(false);
            handleEdit(apt);
          }}
          onChangeEstado={(apt) => {
            setIsDetailPanelOpen(false);
            handleChangeEstado(apt);
          }}
          onDelete={(apt) => {
            setIsDetailPanelOpen(false);
            handleDelete(apt);
          }}
        />
      )}

      {/* Modales */}
      {isCreateModalOpen && (
        <CreateApartamentoModal
          sucursales={sucursales}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={async (data) => {
            try {
              await createApartamento(data);
              setIsCreateModalOpen(false);
              await loadApartamentos();
            } catch (error) {
              console.error(error);
              alert(
                error?.response?.data?.error || "Error al crear el apartamento"
              );
            }
          }}
        />
      )}

      {isEditModalOpen && selectedApartamento && (
        <EditApartamentoModal
          apartamento={selectedApartamento}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedApartamento(null);
          }}
          onSave={async (data) => {
            try {
              await updateApartamento(selectedApartamento.id, data);
              setIsEditModalOpen(false);
              setSelectedApartamento(null);
              await loadApartamentos();
            } catch (error) {
              console.error(error);
              alert(
                error?.response?.data?.error ||
                  "Error al actualizar el apartamento"
              );
            }
          }}
        />
      )}

      {isChangeEstadoModalOpen && selectedApartamento && (
        <ChangeEstadoApartamentoModal
          apartamento={selectedApartamento}
          onClose={() => {
            setIsChangeEstadoModalOpen(false);
            setSelectedApartamento(null);
          }}
          onSave={async (data) => {
            try {
              await updateApartamento(selectedApartamento.id, {
                estado_ocupacion: data.estado,
              });
              setIsChangeEstadoModalOpen(false);
              setSelectedApartamento(null);
              await loadApartamentos();
            } catch (error) {
              console.error(error);
              alert(
                error?.response?.data?.error ||
                  "Error al cambiar el estado del apartamento"
              );
            }
          }}
        />
      )}

      {isDeleteModalOpen && selectedApartamento && (
        <DeleteApartamentoModal
          apartamento={selectedApartamento}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedApartamento(null);
          }}
          onDelete={async () => {
            try {
              await deleteApartamento(selectedApartamento.id);
              setIsDeleteModalOpen(false);
              setSelectedApartamento(null);
              await loadApartamentos();
            } catch (error) {
              console.error(error);
              alert(
                error?.response?.data?.error ||
                  "Error al eliminar el apartamento"
              );
            }
          }}
        />
      )}
    </div>
  );
}

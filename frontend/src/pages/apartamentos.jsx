import { useState } from "react";
import { Search, Filter, Plus, Edit, Trash2, Home } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
//import { CreateApartamentoModal } from "./CreateApartamentoModal";
//import { EditApartamentoModal } from "./EditApartamentoModal";
//import { ChangeEstadoApartamentoModal } from "./ChangeEstadoApartamentoModal";

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

const mockApartamentos = [
  {
    id: "1",
    numero: "Apt 301",
    torre: "Torre A",
    sucursal: "Centro",
    tipo: "2 Habitaciones",
    estado: "Ocupado",
    precioMensual: 1500.0,
    habitaciones: 2,
    banos: 2,
    tamano: 85,
    piso: 3,
    ocupantesMaximos: 4,
    deposito: 1500.0,
    contratoActivo: "CTR-2024-001",
    descripcion:
      "Apartamento moderno con vista panorámica, acabados de primera calidad, cocina equipada y balcón amplio.",
    notas: "Incluye 1 parqueo. No se permiten mascotas.",
    fechaCreacion: "15 de enero de 2024, 04:00",
    ultimaActualizacion: "28 de noviembre de 2024, 09:30",
  },
  {
    id: "2",
    numero: "Apt 502",
    torre: "Torre B",
    sucursal: "Norte",
    tipo: "3 Habitaciones",
    estado: "Disponible",
    precioMensual: 2000.0,
    habitaciones: 3,
    banos: 2,
    tamano: 120,
    piso: 5,
    ocupantesMaximos: 6,
    deposito: 2000.0,
    fechaCreacion: "20 de febrero de 2024, 10:15",
    ultimaActualizacion: "1 de diciembre de 2024, 14:20",
  },
  {
    id: "3",
    numero: "Apt 105",
    torre: "Torre A",
    sucursal: "Centro",
    tipo: "Estudio",
    estado: "Disponible",
    precioMensual: 900.0,
    habitaciones: 1,
    banos: 1,
    tamano: 45,
    piso: 1,
    ocupantesMaximos: 2,
    deposito: 900.0,
    fechaCreacion: "5 de marzo de 2024, 08:30",
    ultimaActualizacion: "30 de noviembre de 2024, 11:00",
  },
  {
    id: "4",
    numero: "Apt 208",
    torre: "Torre C",
    sucursal: "Sur",
    tipo: "1 Habitación",
    estado: "Mantenimiento",
    precioMensual: 1200.0,
    habitaciones: 1,
    banos: 1,
    tamano: 60,
    piso: 2,
    ocupantesMaximos: 3,
    deposito: 1200.0,
    fechaCreacion: "12 de abril de 2024, 15:45",
    ultimaActualizacion: "3 de diciembre de 2024, 16:30",
  },
  {
    id: "5",
    numero: "Apt 410",
    torre: "Torre B",
    sucursal: "Norte",
    tipo: "2 Habitaciones",
    estado: "Ocupado",
    precioMensual: 1650.0,
    habitaciones: 2,
    banos: 2,
    tamano: 90,
    piso: 4,
    ocupantesMaximos: 4,
    deposito: 1650.0,
    contratoActivo: "CTR-2024-002",
    fechaCreacion: "18 de mayo de 2024, 09:00",
    ultimaActualizacion: "2 de diciembre de 2024, 10:45",
  },
  {
    id: "6",
    numero: "Apt 701",
    torre: "Torre A",
    sucursal: "Este",
    tipo: "Penthouse",
    estado: "Disponible",
    precioMensual: 3500.0,
    habitaciones: 4,
    banos: 3,
    tamano: 200,
    piso: 7,
    ocupantesMaximos: 8,
    deposito: 3500.0,
    fechaCreacion: "25 de junio de 2024, 12:30",
    ultimaActualizacion: "4 de diciembre de 2024, 13:15",
  },
  {
    id: "7",
    numero: "Apt 315",
    torre: "Torre A",
    sucursal: "Centro",
    tipo: "2 Habitaciones",
    estado: "Ocupado",
    precioMensual: 1550.0,
    habitaciones: 2,
    banos: 2,
    tamano: 88,
    piso: 3,
    ocupantesMaximos: 4,
    deposito: 1550.0,
    contratoActivo: "CTR-2024-003",
    fechaCreacion: "8 de julio de 2024, 11:00",
    ultimaActualizacion: "5 de diciembre de 2024, 08:20",
  },
  {
    id: "8",
    numero: "Apt 120",
    torre: "Torre B",
    sucursal: "Norte",
    tipo: "1 Habitación",
    estado: "Disponible",
    precioMensual: 1100.0,
    habitaciones: 1,
    banos: 1,
    tamano: 55,
    piso: 1,
    ocupantesMaximos: 2,
    deposito: 1100.0,
    fechaCreacion: "14 de agosto de 2024, 16:20",
    ultimaActualizacion: "5 de diciembre de 2024, 09:40",
  },
];

export function Apartamentos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sucursalFilter, setSucursalFilter] = useState("Todas las sucursales");
  const [torreFilter, setTorreFilter] = useState("Todas las torres");
  const [estadoFilter, setEstadoFilter] = useState("Todos los estados");
  const [tipoFilter, setTipoFilter] = useState("Todos los tipos");
  const [apartamentos, setApartamentos] = useState(mockApartamentos);
  const [selectedApartamento, setSelectedApartamento] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangeEstadoModalOpen, setIsChangeEstadoModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredApartamentos = apartamentos.filter((apt) => {
    const matchesSearch = apt.numero
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSucursal =
      sucursalFilter === "Todas las sucursales" ||
      apt.sucursal === sucursalFilter;
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

  const handleClearFilters = () => {
    setSearchTerm("");
    setSucursalFilter("Todas las sucursales");
    setTorreFilter("Todas las torres");
    setEstadoFilter("Todos los estados");
    setTipoFilter("Todos los tipos");
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
      case "Ocupado":
        return "bg-blue-100 text-blue-800";
      case "Disponible":
        return "bg-green-100 text-green-800";
      case "Mantenimiento":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
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
            <label className="block text-sm text-gray-700 mb-2">Sucursal</label>
            <select
              value={sucursalFilter}
              onChange={(e) => setSucursalFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
            >
              <option>Todas las sucursales</option>
              <option>Centro</option>
              <option>Norte</option>
              <option>Sur</option>
              <option>Este</option>
            </select>
          </div>

          {/* Torre */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Torre o Edificio
            </label>
            <select
              value={torreFilter}
              onChange={(e) => setTorreFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
            >
              <option>Todas las torres</option>
              <option>Torre A</option>
              <option>Torre B</option>
              <option>Torre C</option>
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

          {/* Tipo */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Tipo de Apartamento
            </label>
            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
            >
              <option>Todos los tipos</option>
              <option>Estudio</option>
              <option>1 Habitación</option>
              <option>2 Habitaciones</option>
              <option>3 Habitaciones</option>
              <option>Penthouse</option>
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
                  Tipo
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
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {apartamento.tipo}
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
            Mostrando 1 a {filteredApartamentos.length} de {apartamentos.length}{" "}
            apartamentos
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
      </div>

      {/* Modales */}
      {isCreateModalOpen && (
        <CreateApartamentoModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={(data) => {
            // TODO: crear apartamento real
            setIsCreateModalOpen(false);
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
          onSave={(data) => {
            // TODO: actualizar apartamento real
            setIsEditModalOpen(false);
            setSelectedApartamento(null);
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
          onSave={(data) => {
            // TODO: cambiar estado real
            setIsChangeEstadoModalOpen(false);
            setSelectedApartamento(null);
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
          onDelete={() => {
            // TODO: eliminar apartamento real
            setIsDeleteModalOpen(false);
            setSelectedApartamento(null);
          }}
        />
      )}
    </div>
  );
}

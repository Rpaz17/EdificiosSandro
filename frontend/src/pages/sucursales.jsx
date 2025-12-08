import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { SucursalModal } from "./SucursalModal";
import { ViewSucursalModal } from "./ViewSucursalModal";
import { SucursalDeleteModal } from "./SucursalDeleteModal";
import { PageHeader } from "../components/PageHeader";

const mockSucursales = [
  {
    id: "1",
    nombre: "Sucursal Centro",
    ciudad: "Santo Domingo",
    sector: "Piantini",
    calle: "Av. Abraham Lincoln #45",
    estado: "Activo",
    fechaCreacion: "2024-01-15",
    createdBy: "Admin Principal",
    updatedBy: "Admin Principal",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    nombre: "Sucursal Norte",
    ciudad: "Santiago",
    sector: "Los Jardines",
    calle: "Calle del Sol #128",
    estado: "Activo",
    fechaCreacion: "2024-02-10",
    createdBy: "Admin Principal",
    updatedBy: "Carlos Ramírez",
    updatedAt: "2024-03-05",
  },
  {
    id: "3",
    nombre: "Sucursal Sur",
    ciudad: "Santo Domingo",
    sector: "La Esperilla",
    calle: "Av. Máximo Gómez #234",
    estado: "Activo",
    fechaCreacion: "2024-03-20",
    createdBy: "Admin Principal",
    updatedBy: "Admin Principal",
    updatedAt: "2024-03-20",
  },
  {
    id: "4",
    nombre: "Sucursal Este",
    ciudad: "La Romana",
    sector: "Centro",
    calle: "Calle Duarte #89",
    estado: "Activo",
    fechaCreacion: "2024-04-12",
    createdBy: "Admin Principal",
    updatedBy: "María González",
    updatedAt: "2024-05-01",
  },
  {
    id: "5",
    nombre: "Sucursal Antigua",
    ciudad: "Santo Domingo",
    sector: "Naco",
    calle: "Calle Principal #56",
    estado: "Eliminado",
    fechaCreacion: "2023-08-05",
    createdBy: "Admin Principal",
    updatedBy: "Admin Principal",
    updatedAt: "2024-06-15",
  },
];

export function Sucursales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("Activo");
  const [sucursales, setSucursales] = useState(mockSucursales);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSucursal, setEditingSucursal] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingSucursal, setViewingSucursal] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingSucursal, setDeletingSucursal] = useState(null);

  const filteredSucursales = sucursales.filter((sucursal) => {
    const matchesSearch =
      sucursal.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sucursal.ciudad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sucursal.sector.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEstado =
      estadoFilter === "Todas" || sucursal.estado === estadoFilter;

    return matchesSearch && matchesEstado;
  });

  const handleNewSucursal = () => {
    setEditingSucursal(null);
    setIsModalOpen(true);
  };

  const handleEdit = (sucursal) => {
    setEditingSucursal(sucursal);
    setIsModalOpen(true);
  };

  const handleViewDetails = (sucursal) => {
    setViewingSucursal(sucursal);
    setIsViewModalOpen(true);
  };

  const handleDelete = (sucursal) => {
    setDeletingSucursal(sucursal);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deletingSucursal) {
      setSucursales((prev) =>
        prev.map((s) =>
          s.id === deletingSucursal.id
            ? {
                ...s,
                estado: "Eliminado",
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : s
        )
      );
      setIsDeleteModalOpen(false);
      setDeletingSucursal(null);
    }
  };

  const handleSaveSucursal = (sucursalData) => {
    if (editingSucursal) {
      setSucursales((prev) =>
        prev.map((s) =>
          s.id === editingSucursal.id
            ? {
                ...s,
                ...sucursalData,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : s
        )
      );
    } else {
      const newSucursal = {
        ...sucursalData,
        id: String(sucursales.length + 1),
        estado: "Activo",
        fechaCreacion: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };

      setSucursales((prev) => [newSucursal, ...prev]);
    }

    setIsModalOpen(false);
    setEditingSucursal(null);
  };

  const getEstadoBadge = (estado) => {
    return estado === "Activo"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Title & Action Button */}
      <PageHeader
        title="Sucursales"
        description="Gestiona las sucursales del sistema"
        actionButton={{
          label: "Nueva Sucursal",
          icon: <Plus className="w-4 h-4" />,
          onClick: handleNewSucursal,
        }}
      />

      {/* Search & Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm text-gray-700 mb-2">
              Buscar Sucursal
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, ciudad o sector..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Estado Filter */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Estado</label>
            <select
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option>Activo</option>
              <option>Eliminado</option>
              <option>Todas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando{" "}
          <span className="text-gray-900">{filteredSucursales.length}</span>{" "}
          sucursales
        </p>
      </div>

      {/* Sucursales Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600">
                  Nombre
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">
                  Ciudad
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">
                  Sector
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">
                  Calle
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">
                  Fecha de Creación
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSucursales.map((sucursal, index) => (
                <tr
                  key={sucursal.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {sucursal.nombre}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {sucursal.ciudad}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {sucursal.sector}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {sucursal.calle}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                        sucursal.estado
                      )}`}
                    >
                      {sucursal.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {sucursal.fechaCreacion}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(sucursal)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(sucursal)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Editar"
                        disabled={sucursal.estado === "Eliminado"}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(sucursal)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Eliminar"
                        disabled={sucursal.estado === "Eliminado"}
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
      </div>

      {/* Modals */}
      {isModalOpen && (
        <SucursalModal
          sucursal={editingSucursal}
          onClose={() => {
            setIsModalOpen(false);
            setEditingSucursal(null);
          }}
          onSave={handleSaveSucursal}
        />
      )}

      {isViewModalOpen && viewingSucursal && (
        <ViewSucursalModal
          sucursal={viewingSucursal}
          onClose={() => {
            setIsViewModalOpen(false);
            setViewingSucursal(null);
          }}
        />
      )}

      {isDeleteModalOpen && deletingSucursal && (
        <SucursalDeleteModal
          sucursal={deletingSucursal}
          onConfirm={confirmDelete}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setDeletingSucursal(null);
          }}
        />
      )}
    </div>
  );
}

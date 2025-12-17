import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { SucursalModal } from "./SucursalModal";
import { ViewSucursalModal } from "./ViewSucursalModal";
import { SucursalDeleteModal } from "./SucursalDeleteModal";
import { PageHeader } from "../components/PageHeader";
import {
  listarSucursales,
  createSucursal,
  updateSucursal,
  deleteSucursal,
} from "../services/sucursales.api";

export function Sucursales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("Activo");
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSucursal, setEditingSucursal] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingSucursal, setViewingSucursal] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingSucursal, setDeletingSucursal] = useState(null);

  const filteredSucursales = sucursales.filter((sucursal) => {
    const matchesSearch =
      (sucursal.nombre ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (sucursal.ciudad ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (sucursal.sector ?? "").toLowerCase().includes(searchTerm.toLowerCase());

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

  const confirmDelete = async () => {
    if (!deletingSucursal) return;

    try {
      setError(null);
      await deleteSucursal(deletingSucursal.id);

      setIsDeleteModalOpen(false);
      setDeletingSucursal(null);

      await loadSucursales();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "No se pudo eliminar la sucursal");
    }
  };

  const handleSaveSucursal = async (sucursalData) => {
    try {
      setError(null);

      if (editingSucursal) {
        await updateSucursal(editingSucursal.id, sucursalData);
      } else {
        await createSucursal(sucursalData);
      }

      setIsModalOpen(false);
      setEditingSucursal(null);
      await loadSucursales();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "No se pudo guardar la sucursal");
    }
  };

  const getEstadoBadge = (estado) => {
    return estado === "Activo"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  async function loadSucursales() {
    try {
      setLoading(true);
      setError(null);

      const data = await listarSucursales();
      console.log("DATA DESDE SERVICE:", data);

      // Adaptar backend -> UI (estado/fechaCreacion)
      const mapped = (data || []).map((s) => ({
        id: String(s.id),
        nombre: s.nombre ?? "",
        ciudad: s.ciudad ?? "",
        sector: s.sector ?? "",
        calle: s.calle ?? "",
        // tu backend no tiene "estado", así que lo derivamos:
        estado: s.is_deleted ? "Eliminado" : "Activo",
        // tu UI usa fechaCreacion:
        fechaCreacion: s.created_at ? String(s.created_at).split("T")[0] : "",
        // opcional: si quieres mostrarlos luego
        created_by: s.created_by ?? null,
        updated_by: s.updated_by ?? null,
        updatedAt: s.updated_at ? String(s.updated_at).split("T")[0] : "",
      }));

      setSucursales(mapped);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Error al cargar sucursales");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSucursales();
  }, []);

  return (
    <div className="p-6">
      <div className="space-y-6">
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

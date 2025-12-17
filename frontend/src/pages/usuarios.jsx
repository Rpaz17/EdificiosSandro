import { Search, Filter, Plus, Edit, Eye, Trash2 } from "lucide-react";
import { UsuarioModal } from "./UsuarioModal";
import { UsuarioViewModal } from "./UsuarioViewModal";
import { UsuarioDeleteModal } from "./UsuarioDeleteModal";
import { useEffect, useState } from "react";
import {
  createUsuario,
  updateUsuario,
  getUsuarios,
  deleteUsuario,
} from "../services/usuarios.api";
import { PageHeader } from "../components/PageHeader";
import { asociarCliente } from "../services/clientes.api";

const mockUsuarios = [
  {
    id: "1",
    email: "admin@edificiossandro.com",
    rol: "Admin",
    estado: "Activo",
    fechaCreacion: "2024-01-10",
  },
  {
    id: "2",
    email: "cobrador1@edificiossandro.com",
    rol: "Cobrador",
    estado: "Activo",
    fechaCreacion: "2024-02-15",
  },
  {
    id: "3",
    email: "maria.gonzalez@email.com",
    rol: "Cliente",
    estado: "Activo",
    fechaCreacion: "2024-01-15",
  },
  {
    id: "4",
    email: "carlos.ramirez@email.com",
    rol: "Cliente",
    estado: "Activo",
    fechaCreacion: "2024-02-20",
  },
  {
    id: "5",
    email: "ana.martinez@email.com",
    rol: "Cliente",
    estado: "Inactivo",
    fechaCreacion: "2024-03-10",
  },
  {
    id: "6",
    email: "cobrador2@edificiossandro.com",
    rol: "Cobrador",
    estado: "Activo",
    fechaCreacion: "2024-04-05",
  },
  {
    id: "7",
    email: "luis.perez@email.com",
    rol: "Cliente",
    estado: "Activo",
    fechaCreacion: "2024-04-05",
  },
  {
    id: "8",
    email: "sofia.torres@email.com",
    rol: "Cliente",
    estado: "Activo",
    fechaCreacion: "2024-05-12",
  },
];

export function Usuarios() {
  const [emailSearch, setEmailSearch] = useState("");
  const [rolFilter, setRolFilter] = useState("Todos");
  const [estadoFilter, setEstadoFilter] = useState("Todos");

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [editingUsuario, setEditingUsuario] = useState(null);

  const filteredUsuarios = usuarios.filter((usuario) => {
    const matchesEmail = usuario.email
      .toLowerCase()
      .includes(emailSearch.toLowerCase());
    const matchesRol = rolFilter === "Todos" || usuario.rol === rolFilter;
    const matchesEstado =
      estadoFilter === "Todos" || usuario.estado === estadoFilter;
    return matchesEmail && matchesRol && matchesEstado;
  });

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getUsuarios();

        // Tu backend probablemente devuelve: [{ id, email, rol, estado, created_at, ... }]
        // Tu UI espera: fechaCreacion + rol en formato "Admin/Cobrador/Cliente" y estado "Activo/Inactivo"
        const mapped = (data || []).map((u) => ({
          id: String(u.id),
          email: u.email,
          rol:
            u.rol === "admin"
              ? "Admin"
              : u.rol === "cobrador"
              ? "Cobrador"
              : "Cliente",
          estado: u.estado ? "Activo" : "Inactivo",
          fechaCreacion: u.created_at || new Date().toISOString(),
        }));

        setUsuarios(mapped);
      } catch (e) {
        console.error(e);
        setError("No se pudieron cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  const cargarUsuarios = async () => {
    const data = await getUsuarios();

    const mapped = data.map((u) => ({
      id: String(u.id),
      email: u.email,
      rol:
        u.rol === "admin"
          ? "Admin"
          : u.rol === "cobrador"
          ? "Cobrador"
          : "Cliente",
      estado: u.estado ? "Activo" : "Inactivo",
      fechaCreacion: u.created_at,
    }));

    setUsuarios(mapped);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleApplyFilters = () => {
    console.log("Filters applied");
  };

  const handleClearFilters = () => {
    setEmailSearch("");
    setRolFilter("Todos");
    setEstadoFilter("Todos");
  };

  const handleNewUsuario = () => {
    setEditingUsuario(null);
    setIsModalOpen(true);
  };

  const handleViewUsuario = (usuario) => {
    setSelectedUsuario(usuario);
    setIsViewModalOpen(true);
  };

  const handleEditUsuario = (usuario) => {
    setEditingUsuario(usuario);
    setIsModalOpen(true);
  };

  const handleDeleteUsuario = (usuario) => {
    setSelectedUsuario(usuario);
    setIsDeleteModalOpen(true);
  };

  const handleSaveUsuario = async (usuarioData) => {
    try {
      const payload = {
        email: usuarioData.email,
        rol: usuarioData.rol.toLowerCase(), // Admin → admin
      };

      const payload2 = {
        correo: usuarioData.email,
      };

      // solo enviar password si el usuario escribió algo
      if (usuarioData.password) {
        payload.password = usuarioData.password;
      }

      if (editingUsuario) {
        await updateUsuario(editingUsuario.id, payload);
      } else {
        await createUsuario(payload);
        await asociarCliente(payload2);
      }

      await cargarUsuarios(); // refrescar tabla

      setIsModalOpen(false);
      setEditingUsuario(null);
    } catch (error) {
      console.error(error);
      alert("Error al guardar usuario");
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedUsuario) return;

    try {
      await deleteUsuario(selectedUsuario.id);

      await cargarUsuarios(); // refrescar tabla desde BD

      setIsDeleteModalOpen(false);
      setSelectedUsuario(null);
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el usuario");
    }
  };

  const getEstadoBadge = (estado) => {
    return estado === "Activo"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800";
  };

  const getRolBadge = (rol) => {
    switch (rol) {
      case "Admin":
        return "bg-purple-100 text-purple-800";
      case "Cobrador":
        return "bg-green-100 text-green-800";
      case "Cliente":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <PageHeader
          title="Usuarios"
          description="Dashboard → Usuarios"
          actionButton={{
            label: "Nuevo Usuario",
            icon: <Plus className="w-5 h-5" />,
            onClick: handleNewUsuario,
          }}
        />

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Email Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">
                Buscar por correo
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ingrese el correo electrónico"
                  value={emailSearch}
                  onChange={(e) => setEmailSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Rol */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Rol</label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={rolFilter}
                  onChange={(e) => setRolFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option>Todos</option>
                  <option>Admin</option>
                  <option>Cobrador</option>
                  <option>Cliente</option>
                </select>
              </div>
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Estado</label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={estadoFilter}
                  onChange={(e) => setEstadoFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option>Todos</option>
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Aplicar Filtros
            </button>

            <button
              onClick={handleClearFilters}
              className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {loading && (
              <p className="text-sm text-gray-500">Cargando usuarios...</p>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
            Mostrando{" "}
            <span className="text-gray-900">
              {filteredUsuarios.length}
            </span>{" "}
            usuarios
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Rol
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Fecha creación
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredUsuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{usuario.id}</td>
                    <td className="px-6 py-4 text-sm">{usuario.email}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getRolBadge(
                          usuario.rol
                        )}`}
                      >
                        {usuario.rol}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                          usuario.estado
                        )}`}
                      >
                        {usuario.estado}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(usuario.fechaCreacion).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Ver detalles"
                          onClick={() => handleViewUsuario(usuario)}
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Editar"
                          onClick={() => handleEditUsuario(usuario)}
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Eliminar"
                          onClick={() => handleDeleteUsuario(usuario)}
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
        <UsuarioModal
          usuario={editingUsuario}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUsuario(null);
          }}
          onSave={handleSaveUsuario}
        />
      )}

      {isViewModalOpen && selectedUsuario && (
        <UsuarioViewModal
          usuario={selectedUsuario}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedUsuario(null);
          }}
        />
      )}

      {isDeleteModalOpen && selectedUsuario && (
        <UsuarioDeleteModal
          usuario={selectedUsuario}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedUsuario(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

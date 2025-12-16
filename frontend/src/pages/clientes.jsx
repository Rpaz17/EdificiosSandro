import { PageHeader } from "../components/PageHeader";
import { Filters } from "../components/Filters";
import { Plus, Edit, Eye } from "lucide-react";
import { useState } from "react";
import { ClienteModal } from "./clienteModal";
import { ClienteDetalle } from "./clienteDetalle";
import {
  fetchClientes,
  updateCliente,
  createCliente,
  deleteCliente,
} from "../services/clientes.api";
import { useEffect } from "react";
import { listarSucursales } from "../services/sucursales.api";


export function Clientes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState("");
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState("");
  const [clientes, setClientes] = useState([]);
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
        { label: "Activo", value: "Activo" },
        { label: "Inactivo", value: "Inactivo" },
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

  const filteredClientes = clientes.filter((cliente) => {
    const term = searchTerm.toLowerCase();
    const nombreCompleto = `${cliente.nombre || ""} ${
      cliente.apellido || ""
    }`.toLowerCase();
    const identificacion = (cliente.identificacion || "").toLowerCase();
    const correo = (cliente.correo || "").toLowerCase();

    const matchesSearch =
      !searchTerm ||
      nombreCompleto.includes(term) ||
      identificacion.includes(term) ||
      correo.includes(term);

    const matchesEstado =
      !filterValues.estado || cliente.estado === filterValues.estado;

    // Ajustar chequeo de sucursal según formato
    const clienteSucursalId = String(
      cliente.sucursal_id || cliente.sucursal?.id || ""
    );
    const matchesSucursal =
      !filterValues.sucursal || clienteSucursalId === filterValues.sucursal;

    return matchesSearch && matchesEstado && matchesSucursal;
  });

  const handleFilterChange = (id, value) => {
    setFilterValues((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const loadClientes = async () => {
      try {
        const sucursales = await listarSucursales();
        setSucursales(sucursales);
        const clients = await fetchClientes();
        console.log(clients);
        setClientes(clients);
      } catch (err) {
        console.error(err);
      }
    };
    loadClientes();
  }, []);

  const handleToggleEstado = async (id) => {
    setClientes((prev) => prev.filter((cliente) => cliente.id !== id));
    //Eliminar del sistema
    try {
      await deleteCliente(id);
      console.log("cliente eliminado");
      setIsDetailPanelOpen(false);
      setSelectedCliente(null);
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setIsModalOpen(true);
  };
  const handleSaveCliente = async (clienteData) => {
    if (!editingCliente) {
      //Crear cliente
      try {
        await createCliente(clienteData);
        console.log("cliente creado");
        const clients = await fetchClientes();
        setClientes(clients);
      } catch (err) {
        console.error(err);
      }
    } else {
      const id = editingCliente.id;
      setClientes((prev) =>
        prev.map((client) =>
          client.id === id ? { ...client, ...clienteData } : client
        )
      );
      try {
        await updateCliente(id, clienteData);
        console.log("cliente actualizado");
      } catch (err) {
        console.error(err);
      }
    }
    console.log("Guardando cliente:", clienteData);
    setIsModalOpen(false);
    setEditingCliente(null);
  };
  const handleViewDetails = (cliente) => {
    setSelectedCliente(cliente);
    setIsDetailPanelOpen(true);
  };
  const getEstadoBadge = (estado) => {
    return estado === "Activo"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };
  const handleNewCliente = () => {
    setEditingCliente(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/** HEADER  */}
        <div>
          <PageHeader
            title="Clientes"
            description="Gestiona los clientes del sistema"
            actionButton={{
              label: "Nuevo Cliente",
              icon: <Plus className="w-4 h-4" />,
              onClick: () => {
                console.log("Nuevo Cliente clicked");
                handleNewCliente();
              },
            }}
          />
        </div>
        {/** FILTROS */}
        <div>
          <Filters
            title="clientes"
            filters={filters}
            values={filterValues}
            onChange={handleFilterChange}
            searchValue={searchTerm}
            onSearch={setSearchTerm}
          />
        </div>

        {/** TABLA CLIENTES */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs text-gray-600">
                      Nombre Completo
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-600">
                      Identificación
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-600">
                      Teléfono
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-600">
                      Correo Electrónico
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-600">
                      Sucursal
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
                  {filteredClientes.map((cliente) => (
                    <tr
                      key={cliente.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {cliente.nombre} {cliente.apellido}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {cliente.identificacion}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {cliente.telefono}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {cliente.correo}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {cliente.sucursal?.nombre}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                            cliente.estado
                          )}`}
                        >
                          {cliente.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(cliente)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(cliente)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
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
      </div>
      {/** MODALES  (Crear,editar,eliminar,ver detalles)*/}
      {isModalOpen && (
        <ClienteModal
          cliente={editingCliente}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCliente(null);
          }}
          onSave={handleSaveCliente}
        />
      )}

      {isDetailPanelOpen && selectedCliente && (
        <ClienteDetalle
          cliente={selectedCliente}
          onClose={() => {
            setIsDetailPanelOpen(false);
            setSelectedCliente(null);
          }}
          onEdit={(cliente) => {
            setIsDetailPanelOpen(false);
            handleEdit(cliente);
          }}
          onToggleEstado={handleToggleEstado}
        />
      )}
      <div></div>
    </div>
  );
}

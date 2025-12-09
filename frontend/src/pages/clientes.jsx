import { PageHeader } from "../components/PageHeader";
import { Filters } from "../components/Filters";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  UserX,
  UserCheck,
} from "lucide-react";
import { useState } from "react";

const filters = [
  {
    id: "estado",
    label: "Estado",
    placeholder: "Todos",
    options: [
      { label: "Activo", value: 1 },
      { label: "Inactivo", value: 2 },
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

  estado: "1",
};

const mockClientes = [
  {
    id: "1",
    nombre: "María",
    apellido: "González",
    identificacion: "12345678",
    telefono: "+1 555-0101",
    correo: "maria.gonzalez@email.com",
    estado: "Activo",
    sucursal: "Sucursal Centro",
    fechaRegistro: "2024-01-15",
  },
  {
    id: "2",
    nombre: "Carlos",
    apellido: "Ramírez",
    identificacion: "23456789",
    telefono: "+1 555-0102",
    correo: "carlos.ramirez@email.com",
    estado: "Activo",
    sucursal: "Sucursal Norte",
    fechaRegistro: "2024-02-20",
  },
  {
    id: "3",
    nombre: "Ana",
    apellido: "Martínez",
    identificacion: "34567890",
    telefono: "+1 555-0103",
    correo: "ana.martinez@email.com",
    estado: "Inactivo",
    sucursal: "Sucursal Sur",
    fechaRegistro: "2024-03-10",
  },
  {
    id: "4",
    nombre: "Luis",
    apellido: "Pérez",
    identificacion: "45678901",
    telefono: "+1 555-0104",
    correo: "luis.perez@email.com",
    estado: "Activo",
    sucursal: "Sucursal Centro",
    fechaRegistro: "2024-04-05",
  },
  {
    id: "5",
    nombre: "Sofia",
    apellido: "Torres",
    identificacion: "56789012",
    telefono: "+1 555-0105",
    correo: "sofia.torres@email.com",
    estado: "Activo",
    sucursal: "Sucursal Este",
    fechaRegistro: "2024-05-12",
  },
  {
    id: "6",
    nombre: "Roberto",
    apellido: "Díaz",
    identificacion: "67890123",
    telefono: "+1 555-0106",
    correo: "roberto.diaz@email.com",
    estado: "Activo",
    sucursal: "Sucursal Norte",
    fechaRegistro: "2024-06-18",
  },
  {
    id: "7",
    nombre: "Patricia",
    apellido: "Gómez",
    identificacion: "78901234",
    telefono: "+1 555-0107",
    correo: "patricia.gomez@email.com",
    estado: "Inactivo",
    sucursal: "Sucursal Sur",
    fechaRegistro: "2024-07-25",
  },
];
export function Clientes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState("");
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState("");

  const handleToggleEstado = (id) => {
    setClientes((prev) =>
      prev.map((cliente) =>
        cliente.id === id
          ? {
              ...cliente,
              estado: cliente.estado === "Activo" ? "Inactivo" : "Activo",
            }
          : cliente
      )
    );
  };
  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setIsModalOpen(true);
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
              },
            }}
          />
        </div>
        {/** FILTROS */}
        <div>
          <Filters title="clientes" filters={filters} values={values} />
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
                  {mockClientes.map((cliente) => (
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
                        {cliente.sucursal}
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
                          <button
                            onClick={() => handleToggleEstado(cliente.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              cliente.estado === "Activo"
                                ? "text-red-600 hover:bg-red-50"
                                : "text-green-600 hover:bg-green-50"
                            }`}
                            title={
                              cliente.estado === "Activo"
                                ? "Desactivar"
                                : "Reactivar"
                            }
                          >
                            {cliente.estado === "Activo" ? (
                              <UserX className="w-4 h-4" />
                            ) : (
                              <UserCheck className="w-4 h-4" />
                            )}
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
      <div></div>
    </div>
  );
}

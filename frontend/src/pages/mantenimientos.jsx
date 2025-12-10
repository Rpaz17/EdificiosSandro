import { PageHeader } from "../components/PageHeader";
import { Filters } from "../components/Filters";
import { Plus, Edit, Eye, Trash2 } from "lucide-react";

const filters = [
  {
    id: "estado",
    label: "Estado del mantenimiento",
    placeholder: "Todos",
    options: [
      { label: "Activo", value: 1 },
      { label: "Inactivo", value: 2 },
    ],
  },
  {
    id: "sucursal",
    label: "Prioridad",
    placeholder: "Todas",
    options: [
      { label: "Centro", value: "1" },
      { label: "Norte", value: "2" },
      { label: "Sur", value: "3" },
      { label: "Este", value: "4" },
    ],
  },
  {
    id: "apartamento",
    label: "Apartamento",
    placeholder: "Todos",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
    ],
  },
];

const values = {
  sucursal: 2,

  estado: "1",
};
const mockMantenimientos = [
  {
    id: 1,
    tipo: "Plomería",
    descripcion: "Fuga de agua en el baño principal",
    apartamento: "A101",
    cliente: "Juan Pérez",
    fechaReporte: "30/11/2024",
    prioridad: "Alta",
    estado: "En proceso",
  },
  {
    id: 2,
    tipo: "Electricidad",
    descripcion: "Problema con el interruptor de la sala",
    apartamento: "B203",
    cliente: "Ana Martínez",
    fechaReporte: "2/12/2024",
    prioridad: "Media",
    estado: "Pendiente",
  },
  {
    id: 3,
    tipo: "Aire Acondicionado",
    descripcion: "El aire acondicionado no enfría correctamente",
    apartamento: "C305",
    cliente: "Roberto Silva",
    fechaReporte: "27/11/2024",
    prioridad: "Media",
    estado: "Completado",
  },
  {
    id: 4,
    tipo: "Pintura",
    descripcion: "Mancha de humedad en la pared del dormitorio",
    apartamento: "A205",
    cliente: "Carmen López",
    fechaReporte: "3/12/2024",
    prioridad: "Baja",
    estado: "Pendiente",
  },
  {
    id: 5,
    tipo: "Cerrajería",
    descripcion: "Cerradura de la puerta principal con falla",
    apartamento: "D102",
    cliente: "Miguel Rodríguez",
    fechaReporte: "1/12/2024",
    prioridad: "Alta",
    estado: "En proceso",
  },
];
export function Mantenimientos() {
  const getEstadoBadge = (estado) => {
    return estado === "Activo"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };
  const handleViewDetails = (mantenimiento) => {
    console.log("Ver detalles de mantenimiento:", mantenimiento);
  };
  const handleEdit = (mantenimiento) => {
    console.log("Editar mantenimiento:", mantenimiento);
  };
  const handleDelete = (mantenimiento) => {
    console.log("Eliminar mantenimiento:", mantenimiento);
  };
  const handleNewMantenimiento = () => {
    console.log("Nuevo mantenimiento");
  };
  return (
    <div className="p-6">
      <div className="space-y-6">
        {/** HEADER  */}
        <div>
          <PageHeader
            title="Mantenimientos"
            description="Se gestionan los mantenimientos necesarios para cada apartamento"
            actionButton={{
              label: "Nuevo Mantenimiento",
              icon: <Plus className="w-4 h-4" />,
              onClick: () => {
                console.log("Nuevo Mantenimiento clicked");
                handleNewMantenimiento();
              },
            }}
          />
        </div>
        {/** FILTERS  */}
        <div>
          <Filters title="mantenimientos" filters={filters} values={values} />
        </div>
        {/** TABLE  */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs text-gray-600">
                      Tipo
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-600">
                      Descripcion
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-600">
                      Apartamento
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-600">
                      Cliente
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-600">
                      Fecha de Reporte
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-600">
                      Prioridad
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
                  {mockMantenimientos.map((mantenimiento) => (
                    <tr
                      key={mantenimiento.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {mantenimiento.tipo}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {mantenimiento.descripcion}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {mantenimiento.apartamento}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {mantenimiento.cliente}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {mantenimiento.fechaReporte}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                            mantenimiento.prioridad
                          )}`}
                        >
                          {mantenimiento.prioridad}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                            mantenimiento.estado
                          )}`}
                        >
                          {mantenimiento.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(mantenimiento)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(mantenimiento)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(mantenimiento)}
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
          </div>
        </div>
      </div>
    </div>
  );
}

import { PageHeader } from "../components/PageHeader";
import { Filters } from "../components/Filters";
import {
  Wrench,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  Calendar,
  User,
  Home,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Detalle } from "../components/detalle";
import { useState } from "react";
import { MantenimientoModal } from "./mantenimientoModal";

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
  const [selectedMantenimiento, setSelectedMantenimiento] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showCrear, setShowCrear] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [completado, setCompletado] = useState(false);
  const [confirmTxt, setConfirmTxt] = useState("Marcar como En Proceso");

  const getEstadoBadge = (estado) => {
    return estado === "Activo"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };
  const getPrioridadBadge = (prioridad) => {
    switch (prioridad) {
      case "Alta":
        return "bg-red-100 text-red-700";
      case "Media":
        return "bg-yellow-100 text-yellow-700";
      case "Baja":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const handleSaveMantenimiento = (data) => {
    console.log("Guardando mantenimiento:", data);
    setShowCrear(false);
    setShowEdit(false);
  };
  const handleViewDetails = (mantenimiento) => {
    console.log("Ver detalles de mantenimiento:", mantenimiento);
    setSelectedMantenimiento(mantenimiento);
    if (mantenimiento.estado === "Completado") {
      setCompletado(true);
    } else {
      setCompletado(false);
      const confirmTxt =
        mantenimiento.estado === "Pendiente"
          ? "Marcar como En Proceso"
          : "Marcar como Completado";
      setConfirmTxt(confirmTxt);
      console.log(confirmTxt);
    }

    setShowDetail(true);
  };
  const handleEdit = (mantenimiento) => {
    console.log("Editar mantenimiento:", mantenimiento);
    setSelectedMantenimiento(mantenimiento);
    setShowEdit(true);
  };
  const handleDelete = (mantenimiento) => {
    console.log("Eliminar mantenimiento:", mantenimiento);
    setSelectedMantenimiento(mantenimiento);
    setShowDelete(true);
  };
  const handleNewMantenimiento = () => {
    console.log("Nuevo mantenimiento");
    setShowCrear(true);
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
      {/** MODALS  */}
      {showDetail && (
        <Detalle
          title="Mantenimiento"
          onClose={() => setShowDetail(false)}
          onConfirmButton={
            !completado
              ? {
                  label: confirmTxt,
                  onClick: () => {
                    console.log("Confirm clicked");
                    setShowConfirm(true);
                  },
                }
              : null
          }
          onEditButton={{
            label: "Editar",

            onClick: () => {
              console.log("Editar clicked");

              setShowEdit(true);
              console.log(showDetail);
            },
          }}
          onDeleteButton={{
            label: "Eliminar",

            onClick: () => {
              console.log("Eliminar clicked");
              setShowDelete(true);
            },
          }}
        >
          {/* Información Principal */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h3 className="text-gray-900 mb-4">Información Principal</h3>

            {/* Tipo */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Wrench className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Tipo de mantenimiento</p>
                <p className="text-sm text-gray-900">
                  {selectedMantenimiento.tipo}
                </p>
              </div>
            </div>

            {/* Descripción */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Descripción</p>
                <p className="text-sm text-gray-900">
                  {selectedMantenimiento.descripcion}
                </p>
              </div>
            </div>

            {/* Estado */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Estado</p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                    selectedMantenimiento.estado
                  )}`}
                >
                  {selectedMantenimiento.estado}
                </span>
              </div>
            </div>

            {/* Prioridad */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Prioridad</p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getPrioridadBadge(
                    selectedMantenimiento.prioridad
                  )}`}
                >
                  {selectedMantenimiento.prioridad}
                </span>
              </div>
            </div>

            {/* Fecha de Reporte */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Fecha de reporte</p>
                <p className="text-sm text-gray-900">
                  {new Date(
                    selectedMantenimiento.fechaReporte
                  ).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Cliente */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Cliente</p>
                <p className="text-sm text-gray-900">
                  {selectedMantenimiento.cliente}
                </p>
              </div>
            </div>

            {/* Apartamento */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Apartamento</p>
                <p className="text-sm text-gray-900">
                  {selectedMantenimiento.apartamento}
                </p>
              </div>
            </div>

            {/* Reportado por */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Reportado por</p>
                <p className="text-sm text-gray-900">
                  {selectedMantenimiento.reportadoPor}
                </p>
              </div>
            </div>
          </div>
        </Detalle>
      )}
      {showEdit && (
        <MantenimientoModal
          modalMode={"edit"}
          selectedMantenimiento={selectedMantenimiento}
          onClose={() => setShowEdit(false)}
          onSave={handleSaveMantenimiento}
        />
      )}
      {showCrear && (
        <MantenimientoModal
          modalMode={"create"}
          onClose={() => setShowCrear(false)}
          onSave={handleSaveMantenimiento}
        />
      )}
    </div>
  );
}

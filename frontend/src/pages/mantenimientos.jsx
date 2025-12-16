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
import { useState, useEffect } from "react";
import { MantenimientoModal } from "./mantenimientoModal";
import { fetchMantenimientos } from "../services/mantenimientos.api";
import {
  createMantenimiento,
  updateMantenimiento,
  deleteMantenimiento,
} from "../services/mantenimientos.api";
import { fetchApartamentos } from "../services/apartamentoServices";

export function Mantenimientos() {
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null);
  const [mantenimientos, setMantenimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showCrear, setShowCrear] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [completado, setCompletado] = useState(false);
  const [confirmTxt, setConfirmTxt] = useState("Marcar como En Proceso");
  const [apartamentos, setApartamentos] = useState([]);

  const [filterValues, setFilterValues] = useState({
    estado: "",
    prioridad: "",
    apartamento: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filters = [
    {
      id: "estado",
      label: "Estado",
      placeholder: "Todos",
      options: [
        { label: "Pendiente", value: "pendiente" },
        { label: "En Proceso", value: "en_proceso" },
        { label: "Completado", value: "completado" },
      ],
    },
    {
      id: "prioridad",
      label: "Prioridad",
      placeholder: "Todas",
      options: [
        { label: "Alta", value: "3" },
        { label: "Media", value: "2" },
        { label: "Baja", value: "1" },
      ],
    },
    {
      id: "apartamento",
      label: "Apartamento",
      placeholder: "Todos",
      options: apartamentos.map((s) => ({
        label: s.numero_apartamento,
        value: String(s.id),
      })),
    },
  ];

  const filteredMantenimientos = mantenimientos.filter((m) => {
    const term = searchTerm.toLowerCase();
    const desc = (m.descripcion || "").toLowerCase();
    const apt = (m.apartamento?.numero_apartamento || "").toLowerCase();
    const clientName = m.cliente
      ? `${m.cliente.nombre} ${m.cliente.apellido}`.toLowerCase()
      : "";

    const matchesSearch =
      !searchTerm ||
      desc.includes(term) ||
      apt.includes(term) ||
      clientName.includes(term);

    const matchesEstado =
      !filterValues.estado || m.estado === filterValues.estado;

    const matchesPrioridad =
      !filterValues.prioridad || String(m.prioridad) === filterValues.prioridad;

    const matchesApt =
      !filterValues.apartamento ||
      String(m.apartamento_id || m.apartamento?.id) ===
        filterValues.apartamento;

    return matchesSearch && matchesEstado && matchesPrioridad && matchesApt;
  });

  const handleFilterChange = (id, value) => {
    setFilterValues((prev) => ({ ...prev, [id]: value }));
  };



  const ESTADO_LABELS = {
    pendiente: "Pendiente",
    en_proceso: "En proceso",
    completado: "Completado",
  };

  const PRIORIDAD_LABELS = {
    1: "Baja",
    2: "Media",
    3: "Alta",
  };

  // ✅ Ajustado para tus estados reales (Pendiente / En proceso / Completado)
  const getEstadoBadge = (estadoLabel) => {
    switch (estadoLabel) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "En proceso":
        return "bg-blue-100 text-blue-800";
      case "Completado":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPrioridadBadge = (prioridadLabel) => {
    switch (prioridadLabel) {
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

  const handleSaveMantenimiento = async (data) => {
    try {
      if (showEdit && selectedMantenimiento) {
        // EDITAR
        await updateMantenimiento(selectedMantenimiento.id, data);
      } else {
        // CREAR
        await createMantenimiento(data);
      }

      setShowCrear(false);
      setShowEdit(false);
      setSelectedMantenimiento(null);

      await reloadMantenimientos(); // 🔁 refresca tabla
    } catch (e) {
      console.error(e);
      alert("Error al guardar mantenimiento");
    }
  };

  const handleViewDetails = (mantenimiento) => {
    console.log("Ver detalles de mantenimiento:", mantenimiento);
    setSelectedMantenimiento(mantenimiento);

    const estadoLabel = ESTADO_LABELS[mantenimiento.estado];

    if (estadoLabel === "Completado") {
      setCompletado(true);
    } else {
      setCompletado(false);
      const nextTxt =
        estadoLabel === "Pendiente"
          ? "Marcar como En Proceso"
          : "Marcar como Completado";
      setConfirmTxt(nextTxt);
      console.log(nextTxt);
    }

    setShowDetail(true);
  };

  const handleEdit = (mantenimiento) => {
    console.log("Editar mantenimiento:", mantenimiento);
    setSelectedMantenimiento(mantenimiento);
    setShowEdit(true);
  };

  const handleDelete = async (mantenimiento) => {
    const confirm = window.confirm(
      "¿Seguro que deseas eliminar este mantenimiento?"
    );

    if (!confirm) return;

    try {
      await deleteMantenimiento(mantenimiento.id);
      setShowDelete(false);
      setSelectedMantenimiento(null);
      await reloadMantenimientos();
    } catch (e) {
      console.error(e);
      alert("Error al eliminar mantenimiento");
    }
  };

  const handleNewMantenimiento = () => {
    console.log("Nuevo mantenimiento");
    setShowCrear(true);
  };

  const reloadMantenimientos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMantenimientos();
      setMantenimientos(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError("No se pudieron cargar los mantenimientos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchMantenimientos();
        const apts = await fetchApartamentos();
        setApartamentos(apts.data);

        // Si tu API devuelve { mensaje, data: [] } cambia aquí a data.data
        setMantenimientos(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError("No se pudieron cargar los mantenimientos");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/** HEADER */}
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

        {/** FILTERS */}
        <div>
          <Filters
            title="mantenimientos"
            filters={filters}
            values={filterValues}
            onChange={handleFilterChange}
            searchValue={searchTerm}
            onSearch={setSearchTerm}
          />
        </div>

        {/** TABLE */}
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
                  {filteredMantenimientos.map((mantenimiento) => (
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
                        {mantenimiento.apartamento?.numero_apartamento || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {mantenimiento.cliente
                          ? `${mantenimiento.cliente.nombre} ${mantenimiento.cliente.apellido}`
                          : "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {mantenimiento.fecha_reporte
                          ? new Date(
                              mantenimiento.fecha_reporte
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getPrioridadBadge(
                            PRIORIDAD_LABELS[mantenimiento.prioridad]
                          )}`}
                        >
                          {PRIORIDAD_LABELS[mantenimiento.prioridad] || "-"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                            ESTADO_LABELS[mantenimiento.estado]
                          )}`}
                        >
                          {ESTADO_LABELS[mantenimiento.estado] || "-"}
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

                  {/** (Opcional) feedback visual si quieres */}
                  {loading && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-6 text-sm text-gray-600"
                      >
                        Cargando mantenimientos...
                      </td>
                    </tr>
                  )}

                  {!loading && error && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-6 text-sm text-red-600"
                      >
                        {error}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/** MODALS */}
      {showDetail && selectedMantenimiento && (
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
                    ESTADO_LABELS[selectedMantenimiento.estado]
                  )}`}
                >
                  {ESTADO_LABELS[selectedMantenimiento.estado] || "-"}
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
                    PRIORIDAD_LABELS[selectedMantenimiento.prioridad]
                  )}`}
                >
                  {PRIORIDAD_LABELS[selectedMantenimiento.prioridad] || "-"}
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
                  {selectedMantenimiento.fecha_reporte
                    ? new Date(
                        selectedMantenimiento.fecha_reporte
                      ).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "-"}
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
                  {selectedMantenimiento.cliente
                    ? `${selectedMantenimiento.cliente.nombre} ${selectedMantenimiento.cliente.apellido}`
                    : "-"}
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
                  {selectedMantenimiento.apartamento?.numero_apartamento || "-"}
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

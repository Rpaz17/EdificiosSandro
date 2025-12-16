import { useState } from "react";
import {
  Upload,
  Eye,
  Calendar,
  DollarSign,
  FileText,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { KPICard } from "./kpiCards";
import { useEffect } from "react";
import {
  fetchComprobantesCliente,
  fetchContratosCliente,
} from "../services/reportes.api";
import { uploadComprobante } from "../services/comprobantes.api";
import { capitalize } from "../utils/formatters";

const mockComprobantes = [
  {
    codigo: "COMP-2024-156",
    monto: 850,
    fechaPago: "2024-11-15",
    metodoPago: "Transferencia bancaria",
    comentario: "Pago correspondiente al mes de noviembre",
    estado: "Aprobado",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
    fechaEnvio: "2024-11-15",
  },
  {
    codigo: "COMP-2024-155",
    monto: 850,
    fechaPago: "2024-10-15",
    metodoPago: "Transferencia bancaria",
    estado: "Aprobado",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
    fechaEnvio: "2024-10-15",
  },
  {
    codigo: "COMP-2024-154",
    monto: 850,
    fechaPago: "2024-09-15",
    metodoPago: "Depósito bancario",
    estado: "Aprobado",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
    fechaEnvio: "2024-09-15",
  },
  {
    codigo: "COMP-2024-153",
    monto: 850,
    fechaPago: "2024-08-15",
    metodoPago: "Transferencia bancaria",
    estado: "Aprobado",
    imagenUrl:
      "https://images.unsplash.com/photo-1554224311-beee4ece91af?w=800",
    fechaEnvio: "2024-08-16",
  },
];

export function ClienteComprobantes() {
  const [comprobantes, setComprobantes] = useState(mockComprobantes);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedComprobante, setSelectedComprobante] = useState(null);
  const [contratoActual, setContrato] = useState([]);

  useEffect(() => {
    //Obtener el id con el token de alguna forma
    //Con el id obtener: reporte de comprobantes del cliente loggedin (Total,Pendientes,Validados)
    //Obtener un objeto con los ultimos 5 reportes que tenga: id,fecha,monto,metodo,estado,notas

    const loadComprobantes = async () => {
      try {
        const comprobantes = await fetchComprobantesCliente();
        console.log(comprobantes);
        const data = await fetchContratosCliente();
        console.log(data);
        setContrato(data.reporte.infoContrato);
        setComprobantes(comprobantes.reporte);
      } catch (err) {
        console.error(err);
      }
    };
    loadComprobantes();
  }, []);

  const [formData, setFormData] = useState({
    monto: "",
    fechaPago: "",
    metodoPago: "Transferencia bancaria",
    comentario: "",
    archivo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Subiendo Comprobante");

    try {
      await uploadComprobante({
        file: formData.archivo, // File object
        contratoId: contratoActual.id,
        monto: formData.monto,
        metodo: formData.metodoPago,
        notas: formData.comentario,
      });

      // const comprobantes = await fetchComprobantesCliente();
      // setComprobantes()
    } catch (err) {
      console.log(err);
    }

    setShowUploadModal(false);

    setFormData({
      monto: "",
      fechaPago: "",
      metodoPago: "Transferencia bancaria",
      comentario: "",
      archivo: null,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, archivo: e.target.files[0] });
    }
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      Pendiente: "bg-yellow-100 text-yellow-800",
      Aprobado: "bg-green-100 text-green-800",
      Rechazado: "bg-red-100 text-red-800",
    };
    return badges[estado] || "";
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Comprobantes"
        description="Sube y gestiona tus comprobantes de pago"
        actionButton={{
          label: "Subir Comprobante",
          icon: <Upload className="w-5 h-5" />,
          onClick: () => setShowUploadModal(true),
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard
          title="Total de comprobantes"
          value={comprobantes?.resumen?.total}
          icon={FileText}
          color="blue"
        />
        <KPICard
          title="Pendientes"
          value={comprobantes?.resumen?.pendientes}
          icon={Calendar}
          color="orange"
        />
        <KPICard
          title="Aprobados"
          value={comprobantes?.resumen?.validados}
          icon={FileText}
          color="green"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs">Código</th>
              <th className="px-6 py-4 text-left text-xs">Fecha</th>
              <th className="px-6 py-4 text-left text-xs">Monto</th>
              <th className="px-6 py-4 text-left text-xs">Método</th>
              <th className="px-6 py-4 text-left text-xs">Estado</th>
              <th className="px-6 py-4 text-left text-xs">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {comprobantes?.comprobantes?.map((c) => (
              <tr key={c.id}>
                <td className="px-6 py-4">C-0{c.id}</td>
                <td className="px-6 py-4">
                  {new Date(c.fecha).toLocaleDateString("es-ES")}
                </td>
                <td className="px-6 py-4">${c.monto}</td>
                <td className="px-6 py-4">{c.metodo}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                      c.estado
                    )}`}
                  >
                    {capitalize(c.estado)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedComprobante(c)}
                    className="text-blue-600"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-gray-900">Subir Comprobante de Pago</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Archivo */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Archivo del comprobante{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      {formData.archivo
                        ? formData.archivo.name
                        : "Haz clic para seleccionar un archivo"}
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG o PDF (Max. 5MB)
                    </p>
                  </label>
                </div>
              </div>

              {/* Monto */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Monto pagado <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    value={formData.monto}
                    onChange={(e) =>
                      setFormData({ ...formData, monto: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {/* Fecha de Pago */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Fecha de pago <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.fechaPago}
                    onChange={(e) =>
                      setFormData({ ...formData, fechaPago: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Método de Pago */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Método de pago <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.metodoPago}
                  onChange={(e) =>
                    setFormData({ ...formData, metodoPago: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option>Transferencia bancaria</option>
                  <option>Depósito bancario</option>
                  <option>Efectivo</option>
                  <option>Cheque</option>
                </select>
              </div>

              {/* Comentario */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Comentario (opcional)
                </label>
                <textarea
                  value={formData.comentario}
                  onChange={(e) =>
                    setFormData({ ...formData, comentario: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Agrega un comentario sobre este pago..."
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Subir Comprobante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedComprobante && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-gray-900">Detalle del Comprobante</h2>
              <button
                onClick={() => setSelectedComprobante(null)}
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedComprobante.ruta_archivo}
                  alt="Comprobante"
                  className="w-full h-auto"
                />
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Código</p>
                  <p className="text-sm text-gray-900">
                    {selectedComprobante.id}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Estado</p>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getEstadoBadge(
                      selectedComprobante.estado
                    )}`}
                  >
                    {capitalize(selectedComprobante.estado)}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Monto</p>
                  <p className="text-sm text-gray-900">
                    ${selectedComprobante.monto}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Método de pago</p>
                  <p className="text-sm text-gray-900">
                    {selectedComprobante.metodo}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1">Fecha de envío</p>
                  <p className="text-sm text-gray-900">
                    {new Date(selectedComprobante.fecha).toLocaleDateString(
                      "es-ES"
                    )}
                  </p>
                </div>
                {selectedComprobante.comentario && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-600 mb-1">Comentario</p>
                    <p className="text-sm text-gray-900">
                      {selectedComprobante.notas}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedComprobante(null)}
                className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

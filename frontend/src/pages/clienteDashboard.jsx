import {
  FileCheck,
  Calendar,
  DollarSign,
  CheckCircle,
  Bell,
} from "lucide-react";
import { KPICard } from "./kpiCards";
import { PageHeader } from "../components/PageHeader";
import { useEffect, useState } from "react";
import { fetchMiContrato } from "../services/clientesContrato.api";

const mockNotifications = [
  {
    id: "1",
    tipo: "recordatorio_pago",
    titulo: "Próximo pago vence pronto",
    mensaje: "Tu próximo pago vence pronto",
    fecha: "Hace 1 hora",
    prioridad: "alta",
  },
  {
    id: "2",
    tipo: "mensaje_administracion",
    titulo: "Mantenimiento programado",
    mensaje:
      "Se realizará mantenimiento en el edificio el 20 de diciembre de 8:00 AM a 12:00 PM",
    fecha: "Hace 2 días",
    prioridad: "media",
  },
];

export function ClienteDashboard() {
  const [contrato, setContrato] = useState(null);

  useEffect(() => {
    fetchMiContrato()
      .then(setContrato)
      .catch(() => setContrato(null));
  }, []);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "—";

  const contratoCodigo = contrato
    ? `CTR-${new Date(contrato.created_at).getFullYear()}-${String(
        contrato.id
      ).padStart(3, "0")}`
    : "—";

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Inicio"
        description="Bienvenido a tu panel de inquilino"
      />

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Estado del Contrato"
          value={contrato?.estado === "activo" ? "Activo" : "—"}
          icon={FileCheck}
          color="green"
        />
        <KPICard
          title="Próximo Pago"
          value="15"
          icon={Calendar}
          color="blue"
        />
        <KPICard
          title="Monto del Pago"
          value={
            contrato ? `$${Number(contrato.monto).toFixed(2)}` : "—"
          }
          icon={DollarSign}
          color="teal"
        />
        <KPICard
          title="Estado de Cuenta"
          value="Al día"
          icon={CheckCircle}
          color="green"
        />
      </div>

      {/* INFORMACIÓN DEL CONTRATO */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-4">Información del Contrato</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-600 mb-1">Apartamento</p>
            <p className="text-sm text-gray-900">
              Apto {contrato?.apartamento?.numero_apartamento || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-1">Fecha de inicio</p>
            <p className="text-sm text-gray-900">
              {formatDate(contrato?.periodo_inicio)}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-1">Fecha de vencimiento</p>
            <p className="text-sm text-gray-900">
              {formatDate(contrato?.periodo_fin)}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-1">Monto mensual</p>
            <p className="text-sm text-gray-900">
              {contrato
                ? `$${Number(contrato.monto).toFixed(2)} US$`
                : "—"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-1">Día de pago</p>
            <p className="text-sm text-gray-900">15 de cada mes</p>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-1">Contrato</p>
            <p className="text-sm text-gray-900">{contratoCodigo}</p>
          </div>
        </div>
      </div>

      {/* PAGOS (SE DEJAN MOCK) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Próximo Pago</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-gray-900">15 de este mes</p>
            <p className="text-gray-900 mt-2">
              {contrato
                ? `$${Number(contrato.monto).toFixed(2)} US$`
                : "—"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Último Pago Registrado</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-gray-900">Aprobado</p>
            <p className="text-gray-900 mt-2">
              {contrato
                ? `$${Number(contrato.monto).toFixed(2)} US$`
                : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* NOTIFICACIONES */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">Notificaciones Importantes</h2>
          <Bell className="w-5 h-5 text-gray-400" />
        </div>

        <div className="space-y-3">
          {mockNotifications.map((n) => (
            <div
              key={n.id}
              className="p-4 rounded-lg border bg-gray-50 border-gray-200"
            >
              <p className="text-sm text-gray-900">{n.titulo}</p>
              <p className="text-xs text-gray-600 mt-1">{n.mensaje}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

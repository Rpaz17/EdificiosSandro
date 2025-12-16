import {
  FileCheck,
  Calendar,
  DollarSign,
  CheckCircle,
  Bell,
} from "lucide-react";
import { KPICard } from "./kpiCards";
import { PageHeader } from "../components/PageHeader";
import { useEffect } from "react";

const mockNotifications = [
  {
    id: "1",
    tipo: "recordatorio_pago",
    titulo: "Próximo pago vence pronto",
    mensaje: "Tu próximo pago de $850.00 vence el 15 de diciembre de 2024",
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
  {
    id: "3",
    tipo: "comprobante_aprobado",
    titulo: "Comprobante aprobado",
    mensaje:
      "Tu comprobante de pago COMP-2024-155 ha sido aprobado correctamente",
    fecha: "Hace 3 días",
    prioridad: "baja",
  },
];

export function ClienteDashboard() {
  useEffect(() => {
    //Obtener el id con el token de alguna forma
    //KPICards: Obtener de contrato: estado, proximo pago, monto
    //Informacion del contrato: numero_apartamento, periodo_inicio, periodo_fin, monto, id, ultimo pago
    //Notificaciones: Siguiente pago,
  }, []);

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Inicio"
        description="Bienvenido a tu panel de inquilino"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Estado del Contrato"
          value="Activo"
          icon={FileCheck}
          color="green"
        />
        <KPICard
          title="Próximo Pago"
          value="15 Dic"
          icon={Calendar}
          color="blue"
        />
        <KPICard
          title="Monto del Pago"
          value="$850"
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

      {/* Informacion del Contrato */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-4">Información del Contrato</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-600 mb-1">Apartamento</p>
            <p className="text-sm text-gray-900">Apto 301 - Edificio Centro</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Fecha de inicio</p>
            <p className="text-sm text-gray-900">01 de enero, 2024</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Fecha de vencimiento</p>
            <p className="text-sm text-gray-900">31 de diciembre, 2024</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Monto mensual</p>
            <p className="text-sm text-gray-900">$850.00 US$</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Día de pago</p>
            <p className="text-sm text-gray-900">15 de cada mes</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Contrato</p>
            <p className="text-sm text-gray-900">CTR-2024-001</p>
          </div>
        </div>
      </div>

      {/* Informacion de los pagos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proximo Pago */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Próximo Pago</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-blue-900">Fecha de vencimiento</p>
                <p className="text-gray-900 mt-1">15 de diciembre, 2024</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <div className="border-t border-blue-200 pt-3 mt-3">
              <p className="text-sm text-blue-900">Monto a pagar</p>
              <p className="text-gray-900 mt-1">$850.00 US$</p>
            </div>
          </div>
          <p className="text-xs text-gray-600">
            Recuerda realizar el pago antes de la fecha de vencimiento y subir
            el comprobante en la sección de Comprobantes.
          </p>
        </div>

        {/* Ultimo Pago Registrado */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Último Pago Registrado</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-green-900">Fecha de pago</p>
                <p className="text-gray-900 mt-1">15 de noviembre, 2024</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="border-t border-green-200 pt-3 mt-3">
              <p className="text-sm text-green-900">Monto pagado</p>
              <p className="text-gray-900 mt-1">$850.00 US$</p>
            </div>
            <div className="border-t border-green-200 pt-3 mt-3">
              <p className="text-sm text-green-900">Estado</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800 mt-1">
                Aprobado
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notificaciones Importantes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">Notificaciones Importantes</h2>
          <Bell className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                notification.prioridad === "alta"
                  ? "bg-red-50 border-red-200"
                  : notification.prioridad === "media"
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{notification.titulo}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {notification.mensaje}
                  </p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  {notification.fecha}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

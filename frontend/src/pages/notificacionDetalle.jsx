import { ChevronRight, ArrowLeft, Trash2, User, FileText, CreditCard, CheckCircle2, Circle, DollarSign, AlertTriangle, UserPlus, Bell } from "lucide-react";
// Asumo que estos son tus componentes de UI (Button y Badge)
import { Button } from "../components/ui/button"; // Ajusta la ruta si es necesario
import { Badge } from "../components/ui/badge"; // Ajusta la ruta si es necesario


// Este componente ahora solo maneja el contenido que va dentro del <main>
export default function NotificationDetail({ notification, onBack }) {
  
  // *** Funciones para Mapeo (se mantienen) ***

  const getNotificationType = () => {
    switch (notification.tipo) {
      case 'pago_recibido':
        return 'Pago Recibido';
      case 'contrato_por_vencer':
        return 'Contrato por Vencer';
      case 'nuevo_cliente':
        return 'Nuevo Cliente';
      case 'alerta_sistema':
        return 'Alerta del Sistema';
      default:
        return 'Notificación';
    }
  };

  const getNotificationTitle = () => {
    // Si la notificación no está definida (por ejemplo, al cargar), retorna un valor seguro
    if (!notification || !notification.mensaje) return 'Detalle de Notificación'; 
    
    return notification.mensaje.length > 60 
      ? notification.mensaje.substring(0, 60) + '...' 
      : notification.mensaje;
  };

  const getNotificationIcon = () => {
    if (!notification) return <Bell className="size-6 text-blue-600" />;
    
    switch (notification.tipo) {
      case 'pago_recibido':
        return <DollarSign className="size-6 text-emerald-600" />;
      case 'contrato_por_vencer':
        return <AlertTriangle className="size-6 text-yellow-600" />;
      case 'nuevo_cliente':
        return <UserPlus className="size-6 text-blue-600" />;
      case 'alerta_sistema':
        return <AlertTriangle className="size-6 text-red-600" />;
      default:
        return <Bell className="size-6 text-blue-600" />;
    }
  };

  const getNotificationIconBg = () => {
    if (!notification) return "bg-blue-50";
    
    switch (notification.tipo) {
      case 'pago_recibido':
        return "bg-emerald-50";
      case 'contrato_por_vencer':
        return "bg-yellow-50";
      case 'nuevo_cliente':
        return "bg-blue-50";
      case 'alerta_sistema':
        return "bg-red-50";
      default:
        return "bg-blue-50";
    }
  };
  
  // Si la notificación es null o undefined (por ejemplo, en un estado de carga)
  if (!notification) {
      return (
          <div className="p-8 text-center text-gray-500">Cargando detalles de la notificación...</div>
      );
  }

  return (
    // Ya no envuelve en el Sidebar ni Topbar. Solo el contenido principal.
    <div className="max-w-7xl mx-auto py-4"> 
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <a href="#" className="hover:text-blue-600 transition-colors">Notificaciones</a>
        <ChevronRight className="size-4" />
        <span className="text-gray-900">Detalle de Notificación</span>
      </div>

      {/* Header with Title and Actions */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Detalle de Notificación</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={onBack}>
            <ArrowLeft className="size-4" />
            Volver a Notificaciones
          </Button>
          <Button variant="outline" className="gap-2 text-red-600 border-red-300 hover:bg-red-50">
            <Trash2 className="size-4" />
            Eliminar Notificación
          </Button>
        </div>
      </div>

      {/* Notification Summary Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className={`size-12 rounded-lg ${getNotificationIconBg()} flex items-center justify-center flex-shrink-0`}>
            {getNotificationIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">{getNotificationTitle()}</h2>
              <Badge variant={notification.estado === "LEIDA" ? "secondary" : "default"}>
                {notification.estado === "LEIDA" ? "LEÍDA" : "NO LEÍDA"}
                </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-2">
              <div>
                <p className="text-sm text-gray-500 mb-1">Fecha de envío</p>
                <p className="text-sm text-gray-900">{notification.fecha_envio}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tipo</p>
                <p className="text-sm text-gray-900">{getNotificationType()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Estado actual</p>
                <p className="text-sm text-gray-900">{notification.estado === 'LEIDA' ? "LEÍDA" : "NO LEÍDA"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Fecha del evento</p>
                <p className="text-sm text-gray-900">{notification.fecha_envio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido del Mensaje Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contenido del Mensaje</h3>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            {notification.mensaje}
          </p>
        </div>
      </div>

      {/* Información Relacionada Card */}
      {(notification.id_cliente || notification.id_contrato || notification.id_pago) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Información Relacionada</h3>
          <div className="space-y-3">
            {notification.id_cliente && (
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <User className="size-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Cliente relacionado</p>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                      {notification.id_cliente}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {notification.id_contrato && (
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Contrato relacionado</p>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                      {notification.id_contrato}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {notification.id_pago && (
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="size-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Pago relacionado</p>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                      {notification.id_pago}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Estado de la Notificación Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Estado de la Notificación</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Estado actual</p>
              <div className="flex items-center gap-2">
                {notification.estado === 'LEIDA' ? (
                  <CheckCircle2 className="size-5 text-emerald-600" />
                ) : (
                  <Circle className="size-5 text-blue-600" />
                )}
                <p className="text-sm text-gray-900">{notification.estado === 'LEIDA' ? "LEÍDA" : "NO LEÍDA"}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <CheckCircle2 className="size-4" />
                Marcar como leída
              </Button>
              <Button variant="outline" className="gap-2">
                <Circle className="size-4" />
                Marcar como no leída
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <Button variant="outline" className="gap-2" onClick={onBack}>
          <ArrowLeft className="size-4" />
          Volver a Notificaciones
        </Button>
        <Button variant="outline" className="gap-2 text-red-600 border-red-300 hover:bg-red-50">
          <Trash2 className="size-4" />
          Eliminar Notificación
        </Button>
      </div>
    </div>
  );
}
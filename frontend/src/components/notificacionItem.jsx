import { DollarSign, FileText, UserPlus, AlertTriangle } from 'lucide-react';

export function NotificationItem({ notification, onClick }) {
  const getIcon = () => {
    switch (notification.tipo) {
      case 'pago_recibido':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'contrato_por_vencer':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'nuevo_cliente':
        return <UserPlus className="w-5 h-5 text-blue-600" />;
      case 'alerta_sistema':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getIconBg = () => {
    switch (notification.tipo) {
      case 'pago_recibido':
        return 'bg-green-100';
      case 'contrato_por_vencer':
        return 'bg-yellow-100';
      case 'nuevo_cliente':
        return 'bg-blue-100';
      case 'alerta_sistema':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  // Se elimina el tipado de la función
  const formatTime = (dateString) => {
    // Esto normalmente analizaría la fecha real, pero para la demostración se usa la cadena tal cual
    return dateString;
  };

  return (
    <button
      // Se elimina el tipado de la función
      onClick={() => onClick(notification)}
      className={`w-full text-left px-4 py-3 transition-colors hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
        notification.estado === 'NO_LEIDA' ? 'bg-blue-50/30' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconBg()} ${
            notification.estado === 'LEIDA' ? 'opacity-60' : ''
          }`}
        >
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm ${
              notification.estado === 'NO_LEIDA' ? 'text-gray-900' : 'text-gray-600'
            }`}
          >
            {notification.mensaje}
          </p>
          <p className="text-xs text-gray-500 mt-1">{formatTime(notification.fecha_envio)}</p>
        </div>
        {notification.estado === 'NO_LEIDA' && (
          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
        )}
      </div>
    </button>
  );
}
import { useState } from 'react';
import { X, Bell, Search } from 'lucide-react';
import { NotificationItem } from './notificacionItem';

export function NotificationsPanel({
  notifications,
  onClose,
  onNotificationClick,
  onMarkAllAsRead,
}) {
  const [activeTab, setActiveTab] = useState('todas'); // El tipo de estado se infiere

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === 'no_leidas') return notif.estado === 'NO_LEIDA';
    if (activeTab === 'leidas') return notif.estado === 'LEIDA';
    return true;
  });

  const EmptyState = ({ isFiltered }) => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {isFiltered ? (
        <>
          <Search className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-sm text-gray-600 text-center">No hay notificaciones con este filtro</p>
        </>
      ) : (
        <>
          <Bell className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-sm text-gray-600 text-center">No tienes notificaciones por ahora</p>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-gray-900">Notificaciones</h2>
            <p className="text-sm text-gray-600 mt-1">Mensajes y alertas del sistema</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Mark All Button */}
        {notifications.some((n) => n.estado === 'NO_LEIDA') && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <button
              onClick={onMarkAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Marcar todas como leídas
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-white">
          <button
            onClick={() => setActiveTab('todas')}
            className={`flex-1 px-6 py-4 text-sm transition-colors ${
              activeTab === 'todas'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveTab('no_leidas')}
            className={`flex-1 px-6 py-4 text-sm transition-colors ${
              activeTab === 'no_leidas'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            No leídas
          </button>
          <button
            onClick={() => setActiveTab('leidas')}
            className={`flex-1 px-6 py-4 text-sm transition-colors ${
              activeTab === 'leidas'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Leídas
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={onNotificationClick}
                />
              ))}
            </div>
          ) : (
            // isFiltered será true si activeTab no es 'todas' O si hay notificaciones pero el filtro no devuelve resultados.
            // Si notifications.length es 0, isFiltered es false.
            <EmptyState isFiltered={activeTab !== 'todas' || notifications.length > 0} />
          )}
        </div>
      </div>
    </>
  );
}
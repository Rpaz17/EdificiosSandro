import { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { NotificationItem } from './notificacionItem'; 

export function NotificationsDropdown({
  notifications,
  onClose,
  onNotificationClick,
  onMarkAllAsRead,
}) {
  const [activeTab, setActiveTab] = useState('todas'); 

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === 'no_leidas') return notif.estado === 'NO_LEIDA';
    if (activeTab === 'leidas') return notif.estado === 'LEIDA';
    return true;
  });

  const EmptyState = ({ isFiltered }) => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {isFiltered ? (
        <>
          <Search className="w-12 h-12 text-gray-300 mb-3" />
          <p className="text-sm text-gray-600 text-center">No hay notificaciones con este filtro</p>
        </>
      ) : (
        <>
          <Bell className="w-12 h-12 text-gray-300 mb-3" />
          <p className="text-sm text-gray-600 text-center">No tienes notificaciones por ahora</p>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Overlay: Solo cubre la zona de clic */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Dropdown Panel */}
      <div className="fixed right-5 top-16 w-[400px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-gray-900">Notificaciones</h3>
            {/* Mark All Button */}
            {notifications.some((n) => n.estado === 'NO_LEIDA') && (
              <button
                onClick={onMarkAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>
          <p className="text-xs text-gray-600">Mensajes y alertas del sistema</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab('todas')}
            className={`flex-1 px-4 py-3 text-sm transition-colors ${
              activeTab === 'todas'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveTab('no_leidas')}
            className={`flex-1 px-4 py-3 text-sm transition-colors ${
              activeTab === 'no_leidas'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            No leídas
          </button>
          <button
            onClick={() => setActiveTab('leidas')}
            className={`flex-1 px-4 py-3 text-sm transition-colors ${
              activeTab === 'leidas'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Leídas
          </button>
        </div>

        {/* Notifications List */}
        <div className="max-h-[480px] overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={onNotificationClick}
              />
            ))
          ) : (
            <EmptyState isFiltered={activeTab !== 'todas' || notifications.length > 0} />
          )}
        </div>
      </div>
    </>
  );
}
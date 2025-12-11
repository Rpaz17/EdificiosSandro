import { Bell, User, LogOut, ChevronDown } from "lucide-react";
import { NotificationsDropdown } from "./notificacionDropdown";

export default function Topbar(props) {
  const {
    onUserClick, //Para ver info del usuario actual
    onNotificationsToggle,
    isNotificationsOpen,
    unreadCount, 
    notifications, 
    onNotificationClick,
    onMarkAllAsRead
  } = props;
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-gray-900">Panel de Control</h1>
      </div>
      <div className="flex items-center gap-4">
      {/* Zona de Notificaciones (es 'relative') */}
      <div className="relative"> 
        <button 
          onClick={onNotificationsToggle} 
          className={`relative p-2 text-gray-500 rounded-lg transition-colors ${
            isNotificationsOpen ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-100'
          }`}
        >
          <Bell className="w-5 h-5" />
          
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-white" />
          )}
        </button>

        {/* AHORA SE RENDERIZA AQUÍ, DENTRO DEL CONTENEDOR RELATIVE */}
        {isNotificationsOpen && (
            <NotificationsDropdown
                notifications={notifications}
                onClose={onNotificationsToggle} 
                onNotificationClick={onNotificationClick}
                onMarkAllAsRead={onMarkAllAsRead}
            />
        )}
      </div>

        {/* User Menu */}
        <div className="relative">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-900">Admin Usuario</div>
              <div className="text-xs text-gray-500">Administrador</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
}

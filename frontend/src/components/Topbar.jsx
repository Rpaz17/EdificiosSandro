import { Bell, User, LogOut, ChevronDown } from "lucide-react";

export default function Topbar(props) {
  const {
    onUserClick, //Para ver info del usuario actual
    onNotificationClick, //Para cuando tenga funcionalidad las notificaciones
  } = props;
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-gray-900">Panel de Control</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
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

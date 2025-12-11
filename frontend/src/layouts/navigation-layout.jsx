import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { NotificationsDropdown } from "./../components/notificacionDropdown";

export function NavigationLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: '1', tipo: 'nuevo_cliente', mensaje: 'Nuevo cliente registrado', estado: 'NO_LEIDA', fecha_envio: 'hace 5 min' },
    { id: '2', tipo: 'pago_recibido', mensaje: 'Pago recibido del Contrato #123', estado: 'LEIDA', fecha_envio: 'hace 1 hr' },
  ]);

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, estado: 'LEIDA' })));
  };

  const handleNotificationClick = (notification) => {
    setNotifications(prev => prev.map(n => 
      n.id === notification.id ? { ...n, estado: 'LEIDA' } : n
    ));
    setIsNotificationsOpen(false);
    console.log('Navegando a la fuente de la notificación:', notification);
  };

  return (
    <div className="h-screen flex overflow-hidden ">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        activeMenu={activeMenu}
        onMenuClick={setActiveMenu}
      />

      <div className="flex flex-col flex-1 h-screen">
        {/* PASA TODAS LAS PROPS AL TOPBAR */}
        <Topbar 
            onNotificationsToggle={() => setIsNotificationsOpen(prev => !prev)}
            isNotificationsOpen={isNotificationsOpen}
            unreadCount={notifications.filter(n => n.estado === 'NO_LEIDA').length}
            
            // AGREGAR:
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
            onMarkAllAsRead={handleMarkAllAsRead}
        />

        <main className="flex-1 p-4 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

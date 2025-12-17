import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchNotificaciones } from "../services/notificaciones.api";

import NotificationDetail from "../pages/notificacionDetalle";
export function NavigationLayout({user}) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const [selectedNotification, setSelectedNotification] = useState(null);

  const load = async () => {
      try {
        const res = await fetchNotificaciones();
        const data = (res.data || []).map(n => ({
          ...n, 
          mensaje: n.mensaje ?? n.payload ?? "",
        }));
        setNotifications(data);
      }catch (error) {
        console.error("Error al cargar notificaciones:", error);
      }
    };

  useEffect(() => {
    load();
    const interval = setInterval(() =>{
      load();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, estado: 'LEIDA' })));
  };

  const handleNotificationClick = (notification) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, estado: 'LEIDA' } : n
      )
    );
    setIsNotificationsOpen(false);
    setSelectedNotification({ ...notification, estado: 'LEIDA' });
    console.log('Navegando a la fuente de la notificación:', notification);
  };

  const handleBackFromDetail = () => {
    setSelectedNotification(null);
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
            user={user}
            onNotificationsToggle={() => setIsNotificationsOpen(prev => !prev)}
            isNotificationsOpen={isNotificationsOpen}
            unreadCount={notifications.filter(n => n.estado === 'NO_LEIDA').length}
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
            onMarkAllAsRead={handleMarkAllAsRead}
        />

        <main className="flex-1 p-4 overflow-y-auto ">
          {selectedNotification ? (
            <NotificationDetail
              notification={selectedNotification}
              onBack={handleBackFromDetail}
            />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}

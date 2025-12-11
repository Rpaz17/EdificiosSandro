import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export function NavigationLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  return (
    <div className="h-screen flex overflow-hidden ">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        activeMenu={activeMenu}
        onMenuClick={setActiveMenu}
      />

      <div className="flex flex-col flex-1 h-screen">
        <Topbar />

        <main className="flex-1 p-4  overflow-y-auto ">
          {/* Contenido*/}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

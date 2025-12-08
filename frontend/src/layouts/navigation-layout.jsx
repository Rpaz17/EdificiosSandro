import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export function NavigationLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  return (
    <div className="flex">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        activeMenu={activeMenu}
        onMenuClick={setActiveMenu}
      />

      <div className="flex flex-col flex-1">
        <Topbar />

        <main className="p-4 ">
          {/* Contenido*/}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

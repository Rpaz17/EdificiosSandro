import {
  LayoutDashboard,
  Building2,
  Users,
  UserCog,
  Home,
  FileText,
  Receipt,
  BarChart3,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  Wrench,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Building2, label: "Sucursales", id: "sucursales" },
  { icon: Users, label: "Clientes", id: "clientes" },
  { icon: UserCog, label: "Usuarios", id: "usuarios" },
  { icon: Home, label: "Apartamentos", id: "apartamentos" },
  { icon: FileText, label: "Contratos", id: "contratos" },
  { icon: Wrench, label: "Mantenimientos", id: "mantenimientos" },
  { icon: Receipt, label: "Comprobantes", id: "comprobantes" },
  { icon: BarChart3, label: "Reportes", id: "reportes" },
  { icon: UserCircle, label: "Mi Perfil", id: "miPerfil" },
];

export default function Sidebar(props) {
  const {
    collapsed,
    onToggle,
    activeMenu = "comprobantes",
    onMenuClick,
  } = props;

  const navigate = useNavigate();

  return (
    <aside
      className={` bg-white border-r border-gray-200 transition-all duration-300 ease-in-out  ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-blue-900">Edificios Sandro</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
            <Building2 className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* items*/}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  onMenuClick && onMenuClick(item.id);
                  navigate(`/${item.id}`);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeMenu === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Boton esconder/mostrar sidebar */}
      <button
        onClick={onToggle}
        className="h-12 border-t border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>
    </aside>
  );
}

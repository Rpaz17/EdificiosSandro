import { Building2, Home, Users, AlertTriangle } from "lucide-react";
import { KPICard } from "./kpiCards";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  fetchClientes,
  fetchContratos,
  fetchMorosidadTotal,
  fetchOcupacionTotal,
} from "../services/reportes.api";
import { useEffect, useState } from "react";

const recentContracts = [
  {
    id: "CT-2024-089",
    cliente: "María González",
    apartamento: "Apto 301 - Centro",
    fecha: "2024-11-25",
    monto: "$850/mes",
    estado: "Activo",
  },
  {
    id: "CT-2024-088",
    cliente: "Carlos Ramírez",
    apartamento: "Apto 205 - Norte",
    fecha: "2024-11-23",
    monto: "$920/mes",
    estado: "Activo",
  },
  {
    id: "CT-2024-087",
    cliente: "Ana Martínez",
    apartamento: "Apto 102 - Sur",
    fecha: "2024-11-20",
    monto: "$780/mes",
    estado: "Activo",
  },
  {
    id: "CT-2024-086",
    cliente: "Luis Pérez",
    apartamento: "Apto 401 - Centro",
    fecha: "2024-11-18",
    monto: "$1,100/mes",
    estado: "Pendiente",
  },
  {
    id: "CT-2024-085",
    cliente: "Sofia Torres",
    apartamento: "Apto 156 - Este",
    fecha: "2024-11-15",
    monto: "$695/mes",
    estado: "Activo",
  },
];

export function Dashboard() {
  const [reporteOcupacion, setOcupacion] = useState([]);
  const [reporteMorosos, setMorosos] = useState({});
  const [reporteClientes, setClientes] = useState({});
  const [contratosRecientes, setContratos] = useState([]);

  const ocupacionData =
    reporteOcupacion && reporteOcupacion.total > 0
      ? [
          {
            name: "Ocupados",
            value: reporteOcupacion.ocupados,
            color: "#2563eb", //#93c5fd #2563eb
          },
          {
            name: "Disponibles",
            value: reporteOcupacion.disponibles,
            color: "#93c5fd",
          },
        ]
      : [];

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const ocupacion = await fetchOcupacionTotal();
        const morosidad = await fetchMorosidadTotal();
        const clientes = await fetchClientes();
        const contratos = await fetchContratos();

        console.log(ocupacion);
        console.log(morosidad);
        console.log(clientes);
        setOcupacion(ocupacion.reporte);
        setMorosos(morosidad.reporte);
        setClientes(clientes.reporte);
        setContratos(contratos.reporte.contratos);
      } catch (error) {
        console.error(error);
      }
    };
    loadDashboard();
  }, []);

  const formatDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString();
  };

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total de Apartamentos"
          value={reporteOcupacion.total}
          icon={Building2}
          color="blue"
        />
        <KPICard
          title="Apartamentos Ocupados"
          value={reporteOcupacion.ocupados}
          icon={Home}
          color="green"
        />
        <KPICard
          title="Clientes Activos"
          value={reporteClientes.totalClientes}
          icon={Users}
          color="teal"
        />
        <KPICard
          title="Morosidad del Mes"
          value={reporteMorosos.clientesAtrasados}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Ocupación Global</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ocupacionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                dataKey="value"
              >
                {ocupacionData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Contracts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Últimos Contratos Creados</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600">
                  ID Contrato
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">
                  Apartamento
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">
                  Estado
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {contratosRecientes.map((contract) => (
                <tr
                  key={contract.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {contract.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {contract.cliente.nombre} {contract.cliente.apellido}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {contract.apartamento.numero_apartamento}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(contract.created_at)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {contract.monto}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                        contract.estado === "activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {contract.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

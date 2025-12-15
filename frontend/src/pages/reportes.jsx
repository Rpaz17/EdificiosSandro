import { PageHeader } from "../components/PageHeader";
import { Plus, DollarSign, Home, AlertCircle } from "lucide-react";
import { ReportCard } from "../components/reportCard";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  fetchMorosidad,
  fetchOcupacion,
  fetchOcupacionMensual,
  fetchPagosMensuales,
} from "../services/reportes.api";

const clientesMorosidadData = [
  {
    id: "1",
    cliente: "Roberto Díaz",
    apartamento: "Apto 305",
    monto: "$1,700",
    fechaLimite: "2024-10-15",
    diasAtraso: 48,
    estadoContrato: "Activo",
  },
  {
    id: "2",
    cliente: "Patricia Gómez",
    apartamento: "Apto 412",
    monto: "$920",
    fechaLimite: "2024-11-01",
    diasAtraso: 31,
    estadoContrato: "Activo",
  },
  {
    id: "3",
    cliente: "Miguel Ángel Ruiz",
    apartamento: "Apto 208",
    monto: "$850",
    fechaLimite: "2024-11-20",
    diasAtraso: 12,
    estadoContrato: "Activo",
  },
  {
    id: "4",
    cliente: "Carmen Vega",
    apartamento: "Apto 501",
    monto: "$1,200",
    fechaLimite: "2024-11-25",
    diasAtraso: 7,
    estadoContrato: "Activo",
  },
];
const filters = [
  {
    id: "sucursal",
    label: "Sucursal",
    placeholder: "Todas",
    options: [
      { label: "Centro", value: "1" },
      { label: "Norte", value: "2" },
      { label: "Sur", value: "3" },
      { label: "Este", value: "4" },
    ],
  },
];

const values = {
  sucursal: 2,

  estado: "1",
};
const pagosData = [
  { name: "Recibidos", value: 92, color: "#3B82F6" },
  { name: "Pendientes", value: 8, color: "#E7000B" },
];
const pagosPorMesData = [
  { mes: "Ene", pagos: 45, ingresos: 38250 },
  { mes: "Feb", pagos: 52, ingresos: 44200 },
  { mes: "Mar", pagos: 48, ingresos: 40800 },
  { mes: "Abr", pagos: 61, ingresos: 51850 },
  { mes: "May", pagos: 55, ingresos: 46750 },
  { mes: "Jun", pagos: 58, ingresos: 49300 },
];

const ocupacionHistoricaData = [
  { periodo: "Q1 2024", ocupacion: 68 },
  { periodo: "Q2 2024", ocupacion: 75 },
  { periodo: "Q3 2024", ocupacion: 82 },
  { periodo: "Q4 2024", ocupacion: 72 },
];
const getAtrasoBadge = (dias) => {
  if (dias <= 15) return "bg-yellow-100 text-yellow-800";
  if (dias <= 30) return "bg-orange-100 text-orange-800";
  return "bg-red-100 text-red-800";
};
export function Reportes() {
  const [pagoStartDate, setPagoStartDate] = useState("2025-01-01");
  const [pagoEndDate, setPagoEndDate] = useState("2025-12-30");
  const [ocupacionStartDate, setOcupacionStartDate] = useState("2025-01-01");
  const [ocupacionEndDate, setOcupacionEndDate] = useState("2025-12-30");
  const [pagosMensuales, setPagosMensuales] = useState(null);
  const [ocupacion, setOcupacion] = useState(null);
  const [morosos, setMorosos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [ocupacionHistorica, setOcupacionHistorica] = useState([]);
  const [filtrosAplicados, setFiltrosAplicados] = useState(null);

  //Generar reporte con los filtros aplicados
  const handlePagos = async () => {
    setFechaInicio(pagoStartDate);
    setFechaFin(pagoEndDate);
    console.log("Handler sees:", pagoStartDate, pagoEndDate);
    // Validaciones mínimas
    if (!fechaInicio || !fechaFin) {
      alert("Debe seleccionar un rango de fechas");
      return;
    }

    if (new Date(fechaInicio) > new Date(fechaFin)) {
      alert("La fecha inicio no puede ser mayor a la fecha fin");
      return;
    }

    try {
      setLoading(true);

      const data = await fetchPagosMensuales({
        sucursalId: 1,
        fechaInicio: fechaInicio,
        fechaFinal: fechaFin,
      });

      setPagosMensuales(data.reporte);
    } catch (error) {
      console.error("Error generando reporte de pagos", error);
    } finally {
      setLoading(false);
    }
  };
  const handleOcupacion = async () => {
    setFechaInicio(ocupacionStartDate);
    setFechaFin(ocupacionEndDate);

    // Validaciones mínimas
    if (!fechaInicio || !fechaFin) {
      alert("Debe seleccionar un rango de fechas");
      return;
    }

    if (new Date(fechaInicio) > new Date(fechaFin)) {
      alert("La fecha inicio no puede ser mayor a la fecha fin");
      return;
    }

    try {
      setLoading(true);

      const data = await fetchOcupacion({
        sucursalId: 1,
        fechaInicio: fechaInicio,
        fechaFinal: fechaFin,
      });

      setOcupacion(data.reporte);

      const data2 = await fetchOcupacionMensual({
        sucursalId: 1,
        fechaInicio: fechaInicio,
        fechaFinal: fechaFin,
      });
      setOcupacionHistorica(data2.reporte);
    } catch (error) {
      console.error("Error generando reporte de pagos", error);
    } finally {
      setLoading(false);
    }
  };
  const handleMorosos = async () => {
    console.log("Cambiando fecha del reporte");
  };

  //reporte de ocupacion
  const ocupacionHistoricaData = ocupacionHistorica.map((item) => {
    const fecha = new Date(item.periodo);

    const meses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    const porcentaje =
      item.total > 0 ? Math.round((item.ocupados / item.total) * 100) : 0;

    return {
      periodo: `${meses[fecha.getMonth()]} ${fecha.getFullYear()}`,
      ocupacion: porcentaje,
    };
  });

  const ocupacionData =
    ocupacion && ocupacion.total > 0
      ? [
          {
            name: "Ocupados",
            value: ocupacion.ocupados,
            color: "#10b981",
          },
          {
            name: "Disponibles",
            value: ocupacion.disponibles,
            color: "#6b7280",
          },
        ]
      : [];

  useEffect(() => {
    const hoy = new Date();
    const fechaMesPasado = new Date(hoy);
    fechaMesPasado.setMonth(hoy.getMonth() - 1);
    setFechaInicio(fechaMesPasado);
    setFechaFin(hoy);

    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const pagos = await fetchPagosMensuales({
          sucursalId: 1,
          fechaInicio: fechaMesPasado,
          fechaFinal: hoy,
        });

        const ocupacion = await fetchOcupacion({
          sucursalId: 1,
          fechaInicio: fechaMesPasado,
          fechaFinal: hoy,
        });
        const ocupacionMensual = await fetchOcupacionMensual({
          sucursalId: 1,
          fechaInicio: fechaMesPasado,
          fechaFinal: hoy,
        });

        const morososData = await fetchMorosidad({
          sucursalId: 1,
        });
        console.log(pagos);
        console.log(ocupacion);
        console.log(ocupacionMensual);
        console.log(morososData);
        setPagosMensuales(pagos.reporte);
        setOcupacion(ocupacion.reporte);
        setOcupacionHistorica(ocupacionMensual.reporte);
        setMorosos(morososData.reporte.clientes);
      } catch (error) {
        console.error("Error cargando datos del dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <PageHeader
          title="Reportes"
          description="Genera y exporta reportes detallados de operaciones"
          icon={Plus}
        />
      </div>
      {/**Report Cards */}
      {/**Reporte de Pagos */}
      <div>
        <ReportCard
          icon={<DollarSign className="w-6 h-6 text-white" />}
          iconColor="bg-blue-600"
          title="Reporte de Pagos"
          description="Analiza los pagos recibidos y los ingresos generados"
          headerColor="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200"
          filters={filters}
          values={values}
          fechaInicio={pagoStartDate}
          onFechaInicioChange={setPagoStartDate}
          fechaFin={pagoEndDate}
          onFechaFinChange={setPagoEndDate}
          generar={handlePagos}
        >
          {" "}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-gray-900 mb-4">Pagos por Mes</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pagosMensuales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="mes" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="pagos"
                    fill="#3b82f6"
                    name="Cantidad de Pagos"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-sm text-gray-900 mb-4">
                Ingresos Generados ($)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pagosMensuales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="mes" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ingresos"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Ingresos"
                    dot={{ fill: "#10b981", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ReportCard>
      </div>
      {/**Reporte de ocupacion */}
      <div>
        <ReportCard
          icon={<Home className="w-6 h-6 text-white" />}
          iconColor="bg-green-600"
          title="Reporte de Ocupación"
          description="Monitorea la ocupación de unidades y espacios en el edificio"
          headerColor="bg-gradient-to-r from-green-50 to-green-100 border-green-200"
          filters={filters}
          values={values}
          fechaInicio={ocupacionStartDate}
          onFechaInicioChange={setOcupacionStartDate}
          fechaFin={ocupacionEndDate}
          onFechaFinChange={setOcupacionEndDate}
          generar={handleOcupacion}
        >
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-gray-900 mb-4">Ocupación Actual</h3>
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
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ocupacionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-sm text-gray-900 mb-4">
                Ocupación Histórica por Período (%)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ocupacionHistoricaData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="periodo" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="ocupacion"
                    fill="#14b8a6"
                    name="% Ocupación"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ReportCard>
      </div>
      {/**Reporte de morosidad */}
      <div>
        <ReportCard
          icon={<AlertCircle className="w-6 h-6 text-white" />}
          iconColor="bg-red-600"
          title="Reporte de Morosidad"
          description="Identifica unidades y clientes con pagos atrasados"
          headerColor="bg-gradient-to-r from-red-50 to-red-100 border-red-200"
          filters={filters}
          values={values}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Cliente
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Apartamento
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Monto Adeudado
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Fecha Límite
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Días de Atraso
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600">
                    Estado del Contrato
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {morosos.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {cliente.cliente}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {cliente.monto}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {cliente.fechaLimite}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getAtrasoBadge(
                          cliente.diasAtraso
                        )}`}
                      >
                        {cliente.diasAtraso} días
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {cliente.estadoContrato}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ReportCard>
      </div>
    </div>
  );
}

import { Download, FileText, Calendar } from "lucide-react";

export function ReportCard({
  icon,
  iconColor = "bg-blue-600",
  title,
  description,
  headerColor = "bg-blue-50",
  children,
  filters = [],
  values = {},
  fechaInicio = "",
  onFechaInicioChange = () => {},
  fechaFin = "",
  onFechaFinChange = () => {},
  generar,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`px-6 py-4 border-b ${headerColor}`}>
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor} `}
          >
            {icon}
          </div>
          <div>
            <h2 className="text-gray-900 ">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
      {/* Filters */}
      {filters && (
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/**Fecha Inicio/Fin */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Fecha Inicio
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => onFechaInicioChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Fecha Fin
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => onFechaFinChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/**Otros filtros */}
            {filters.map((filter) => (
              <div key={filter.id} className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700 pb-1">
                  {filter.label}
                </label>

                <select
                  value={values[filter.id] ?? ""}
                  onChange={(e) => onChange(filter.id, e.target.value)}
                  className="h-12 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">
                    {filter.placeholder || "Seleccionar"}
                  </option>

                  {filter.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Content */}
      <div>{children}</div>
      {/* Footer */}
      <div>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center gap-3">
          <button
            onClick={generar}
            className={`flex items-center gap-2 px-4 py-2.5  text-white rounded-lg  ${iconColor} hover:brightness-110 transition-colors`}
          >
            <FileText className="w-5 h-5" />
            Generar Reporte
          </button>
          <button
            onClick={() => handleExportPDF("Pagos")}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Download className="w-5 h-5" />
            Exportar PDF
          </button>
          <button
            onClick={() => handleExportExcel("Pagos")}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Download className="w-5 h-5" />
            Exportar Excel
          </button>
        </div>
      </div>
    </div>
  );
}

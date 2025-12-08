import React from "react";
import { Button } from "./ui/button";
import { clsx } from "clsx";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

/**
 * Componente de filtros para que usen el mismo
 *
 * @param {object} props
 * @param {string} props.title -Titulo de la pantalla ej: Apartamentos
 * @param {Array} props.filters - Lista de selects. Cada item debe tener: { id, label, placeholder, options }
 * @param {object} props.values - Valores actuales de los filtros, e.g. { sucursal: 1, estado: "ocupado" }
 * @param {(id: string, value: any) => void} props.onChange - Callback al cambiar un select
 * @param {string} props.searchValue - Valor actual del input de búsqueda
 * @param {(value: string) => void} props.onSearch - Callback cuando cambia el texto de búsqueda
 * @param {() => void} props.onApply - Acción al presionar "Aplicar filtros"
 * @param {() => void} props.onReset - Acción al presionar "Limpiar filtros"
 * @param {string} [props.className] - Clases adicionales para el contenedor
 *
 */

export function Filters({
  title,
  filters = [],
  values = {},
  onChange = () => {},
  searchValue = "",
  onSearch = () => {},
  onApply = () => {},
  onReset = () => {},
  className = "",
}) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div
      className={clsx(
        "w-full rounded-xl border bg-white p-6 shadow-sm flex flex-col gap-6",
        className
      )}
    >
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-600" />
        <span className="text-slate-600">Filtros de {title}</span>
        <button
          className="ml-auto"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? (
            <ChevronDown className="w-8 h-8 text-gray-600" />
          ) : (
            <ChevronUp className="w-8 h-8 text-gray-600" />
          )}
        </button>
      </h3>

      {/* CONTENEDOR DE CONTROLES */}
      {collapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* BUSCADOR */}
          <div className="flex flex-col gap-1 lg:col-span-1">
            <label className="text-sm font-medium text-slate-700">Buscar</label>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Buscar..."
              className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* SELECTS DINÁMICOS */}
          {filters.map((filter) => (
            <div key={filter.id} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">
                {filter.label}
              </label>

              <select
                value={values[filter.id] ?? ""}
                onChange={(e) => onChange(filter.id, e.target.value)}
                className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{filter.placeholder || "Seleccionar"}</option>

                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {/* BOTONES */}
      {collapsed && (
        <div className="flex gap-3 mt-2">
          <button
            onClick={onApply}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Aplicar Filtros
          </button>

          <button
            onClick={onReset}
            className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            Limpiar Filtros
          </button>
        </div>
      )}
    </div>
  );
}

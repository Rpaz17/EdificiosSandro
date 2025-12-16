import { useEffect, useState } from "react";
import { fetchMiContrato } from "../services/clientesContrato.api";

export function ContratoInfo() {
  const [contrato, setContrato] = useState(null);

  useEffect(() => {
    fetchMiContrato()
      .then((data) => setContrato(data))
      .catch(() => setContrato(null));
  }, []);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "—";

  if (!contrato) return null;

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="text-gray-900 font-medium mb-6">
        Información del Contrato
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div>
          <p className="text-gray-500 mb-1">Apartamento</p>
          <p className="text-gray-900">
            Apto {contrato.apartamento?.numero_apartamento}
          </p>
        </div>

        <div>
          <p className="text-gray-500 mb-1">Fecha de inicio</p>
          <p className="text-gray-900">
            {formatDate(contrato.periodo_inicio)}
          </p>
        </div>

        <div>
          <p className="text-gray-500 mb-1">Fecha de vencimiento</p>
          <p className="text-gray-900">
            {formatDate(contrato.periodo_fin)}
          </p>
        </div>

        <div>
          <p className="text-gray-500 mb-1">Monto mensual</p>
          <p className="text-gray-900">
            ${Number(contrato.monto).toFixed(2)} US$
          </p>
        </div>

        <div>
          <p className="text-gray-500 mb-1">Día de pago</p>
          <p className="text-gray-900">15 de cada mes</p>
        </div>

        <div>
          <p className="text-gray-500 mb-1">Contrato</p>
          <p className="text-gray-900">
            CTR-{new Date(contrato.created_at).getFullYear()}-
            {String(contrato.id).padStart(3, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}

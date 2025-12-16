import api from "./api";

export async function fetchPagosMensuales(filtros) {
  const res = await api.post("/reportes/pagos", filtros);
  return res.data;
}

export async function fetchOcupacion(filtros) {
  const res = await api.post("/reportes/ocupacion", filtros);
  return res.data;
}
export async function fetchOcupacionMensual(filtros) {
  const res = await api.post("/reportes/ocupacionMensual", filtros);
  return res.data;
}

export async function fetchMorosidad(filtros) {
  const res = await api.post("/reportes/morosidad", filtros);
  return res.data;
}
export async function fetchOcupacionTotal() {
  const res = await api.get("dashboard/ocupacion");
  return res.data;
}
export async function fetchMorosidadTotal() {
  const res = await api.get("/dashboard/morosidad");
  return res.data;
}
export async function fetchClientes() {
  const res = await api.get("/dashboard/clientes");
  return res.data;
}
export async function fetchContratos() {
  const res = await api.get("/dashboard/contratos");
  return res.data;
}

export async function fetchContratosCliente() {
  const res = await api.get("reportes/contratos/client");
  return res.data;
}
export async function fetchComprobantesCliente() {
  const res = await api.get("reportes/comprobantes/client");
  return res.data;
}

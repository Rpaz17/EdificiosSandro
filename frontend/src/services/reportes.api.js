import api from "./api";

export async function fetchPagosMensuales(filtros) {
  const res = await api.post("/reportes/pagos", filtros);
  return res.data;
}

export async function fetchOcupacion(filtros) {
  const res = await api.post("/reportes/ocupacion", filtros);
  return res.data;
}

export async function fetchMorosidad(filtros) {
  const res = await api.post("/reportes/morosidad", filtros);
  return res.data;
}

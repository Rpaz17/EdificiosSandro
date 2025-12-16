import api from "./api";

export async function fetchMiContrato() {
  const res = await api.get("/reportes/contratos/client");
  return res.data?.reporte?.infoContrato || null;
}



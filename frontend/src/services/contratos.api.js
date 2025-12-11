import api from "./api";

/** Faltan get all y get by id */

export async function createContrato(data) {
  const res = await api.post("/contratos", data);
  return res.data;
}

export async function updateContrato(id, data) {
  const res = await api.put(`/contratos/${id}`, data);
  return res.data;
}

export async function fetchContratos() {
  const res = await api.get("/contratos");
  return res.data;
}

export async function deleteContrato(id) {
  const res = await api.delete(`/contratos/${id}`);
  return res.data;
}

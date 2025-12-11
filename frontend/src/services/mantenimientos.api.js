import api from "./api";

export async function createMantenimiento(data) {
  const res = await api.post("/mantenimientos", data);
  return res.data;
}

export async function fetchMantenimientos() {
  const res = await api.get("/mantenimientos");
  return res.data;
}

export async function fetchMantenimientoById(id) {
  const res = await api.get(`/mantenimientos/${id}`);
  return res.data;
}

export async function updateMantenimiento(id, data) {
  const res = await api.put(`/mantenimientos/${id}`, data);
  return res.data;
}

export async function deleteMantenimiento(id) {
  const res = await api.delete(`/mantenimientos/${id}`);
  return res.data;
}

import api from "./api";

/** Falta Get all sucursales */

export async function createSucursal(data) {
  const res = await api.post("/sucursales", data);
  return res.data;
}

export async function fetchSucursalById(id) {
  const res = await api.get(`/sucursales/${id}`);
  return res.data;
}

export async function updateSucursal(id, data) {
  const res = await api.patch(`/sucursales/${id}`, data);
  return res.data;
}

export async function deleteSucursal(id) {
  const res = await api.delete(`/sucursales/${id}`);
  return res.data;
}

import api from "./api";

export async function listarSucursales() {
  const res = await api.get("/sucursales");
  return res.data.sucursales;
}

export async function createSucursal(data) {
  const res = await api.post("/sucursales", data);
  return res.data;
}

export async function fetchSucursalById(id) {
  const res = await api.get(`/sucursales/${id}`);
  return res.data.sucursales;
}

export async function updateSucursal(id, data) {
  const res = await api.patch(`/sucursales/${id}`, data);
  return res.data;
}

export async function deleteSucursal(id, updatedBy) {
  const res = await api.delete(`/sucursales/${id}`, {
    data: { updated_by: updatedBy },
  });
  return res.data;
}

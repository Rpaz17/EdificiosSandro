import api from "./api";

/**Falta metodo get todos y get by id */

export async function createCliente(data) {
  const res = await api.post("/clientes", data);
  return res.data;
}

export async function updateCliente(id, data) {
  const res = await api.patch(`/clientes/${id}`, data);
  return res.data;
}

export async function deleteCliente(id) {
  const res = await api.delete(`/clientes/${id}`);
  return res.data;
}

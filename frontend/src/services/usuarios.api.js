import api from "./api";

/**Falta metodo get todos y get by id */

export async function createUsuario(data) {
  const res = await api.post("/usuarios", data);
  return res.data;
}

export async function updateUsuario(id, data) {
  const res = await api.put(`/usuarios/${id}`, data);
  return res.data;
}

export async function deleteUsuario(id) {
  const res = await api.delete(`/usuarios/${id}`);
  return res.data;
}

import api from "./api";

export async function getUsuarios() {
  const res = await api.get("/usuarios");
  return res.data;
}

export async function getUsuarioById(id) {
  const res = await api.get(`/usuarios/${id}`);
  return res.data;
}

export async function createUsuario(data) {
  const res = await api.post("/usuarios", data);
  return res.data;
}

export async function updateUsuario(id, data) {
  const res = await api.put(`/usuarios/${id}`, data);
  return res.data;
}

export async function deleteUsuario(id, updated_by) {
  const res = await api.delete(`/usuarios/${id}`, {
    data: { updated_by }, 
  });
  return res.data;
}

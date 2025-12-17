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

export const fetchPerfilUsuario = async () => {
  const res = await api.get("/usuarios/perfil");
  return res.data;
};

export const cambiarPassword = async (payload) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const res = await fetch(
    "http://localhost:3000/api/usuarios/cambiarPassword",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.mensaje || "Error al cambiar contraseña");
  }

  return data;
};

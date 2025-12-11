import api from "./api";

//obtener all users
export async function getUsuarios() {
  try {
    const res = await api.get("/usuarios");
    return res.data;
  } catch (error) {
    console.error("Error getUsuarios:", getErrorMessage(error));
    throw error;
  }
}

//obtener usuario por id
export async function getUsuarioById(id) {
  try {
    const res = await api.get(`/usuarios/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error getUsuarioById:", getErrorMessage(error));
    throw error;
  }
}

//crear usuario
export async function createUsuario(data) {
  try {
    const res = await api.post("/usuarios", data);
    return res.data;
  } catch (error) {
    console.error("Error createUsuario:", getErrorMessage(error));
    throw error;
  }
}

//actualizar usuario
export async function updateUsuario(id, data) {
  try {
    const res = await api.put(`/usuarios/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updateUsuario:", getErrorMessage(error));
    throw error;
  }
}

//eliminar usuario
export async function deleteUsuario(id) {
  try {
    const res = await api.delete(`/usuarios/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleteUsuario:", getErrorMessage(error));
    throw error;
  }
}

//funcion de auxilio
function getErrorMessage(error) {
  if (!error) return "Unknown error";
  if (error.response && error.response.data) {
    return error.response.data.message || JSON.stringify(error.response.data);
  }
  return error.message || String(error);
}

//export por defecto
export default {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};

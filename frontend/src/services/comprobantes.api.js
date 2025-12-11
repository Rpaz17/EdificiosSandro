import api from "./api";

/**Falta metodo get todos y get by id */

export async function uploadComprobante(file) {
  const formData = new FormData();
  formData.append("archivo", file);

  const res = await api.post("/comprobantes/subir", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

export async function aprobarComprobante(id) {
  const res = await api.patch(`/comprobantes/${id}/aprobar`);
  return res.data;
}

export async function rechazarComprobante(id) {
  const res = await api.patch(`/comprobantes/${id}/rechazar`);
  return res.data;
}

export async function eliminarComprobante(id) {
  const res = await api.delete(`/comprobantes/${id}/eliminar`);
  return res.data;
}

import api from "./api";

/**Falta metodo get todos y get by id */

export async function fetchComprobantes() {
  const res = await api.get("/comprobantes");
  return res.data;
}
export async function uploadComprobante({
  file,
  contratoId,
  monto,
  metodo,
  notas,
}) {
  const formData = new FormData();

  formData.append("archivo", file);
  formData.append("contratoId", contratoId);
  formData.append("monto", monto);
  formData.append("metodo", metodo);
  if (notas) formData.append("notas", notas);

  const res = await api.post("/comprobantes/subir", formData);

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

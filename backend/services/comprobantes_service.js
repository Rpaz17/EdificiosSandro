const fs = require("fs");
const path = require("path");
const { Comprobante, Pago } = require("../models");
const {
  aprobarComprobante,
  eliminarComprobante,
} = require("../controllers/comprobantes_controller");
const ServiceError = require("../utils/serviceError");
const UPLOAD_DIR = path.join(__dirname, "..", "uploads", "comprobantes");

async function subirComprobante({
  id_pago,
  usuarioId,
  notas,
  archivo,
  nombreArchivo,
}) {
  // 1. Validaciones minimas
  if (!id_pago) throw new Error("El comprobante necesita un id_pago");
  if (!archivo) throw new Error("No se recibió un archivo");

  // 2. Verificar si el pago existe
  const pago = await Pago.findByPk(id_pago);
  if (!pago) {
    throw new Error("El pago asociado no existe");
  }
  // 3. Crear nombre único
  const extension = path.extname(nombreArchivo || "") || ".pdf";
  const filename = `comp_${Date.now()}${extension}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  // 4. Guardar el archivo

  fs.writeFileSync(filepath, archivo);

  // 5. Crear hash del archivo
  const fileBuffer = fs.readFileSync(filepath);
  const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

  // 6. Crear registro en BD
  const comprobante = await Comprobante.create({
    id_pago,
    ruta_archivo: `/uploads/comprobantes/${filename}`,
    hash_archivo: hash,
    estado_validacion: "pendiente",
    subido_en: new Date(),
    notas: notas || null,

    created_at: new Date(),
    created_by: usuarioId,
    is_deleted: false,
  });

  return comprobante;
}

async function validarComprobante(comprobanteId, usuarioId) {
  // Validar que exista el comprobante
  const comprobante = await Comprobante.findByPk(comprobanteId);
  if (!comprobante) {
    throw new ServiceError("Comprobante no encontrado", 404);
  }
  // Actualizar el estado del comprobante a aprobado
  const estado = comprobante.estado_validacion;
  if (estado !== "pendiente") {
    throw new ServiceError("El comprobante ya ha sido validado", 409);
  }
  comprobante.estado_validacion = "validado";
  comprobante.validado_por = usuarioId;
  comprobante.validado_en = new Date();

  await comprobante.save();

  return comprobante;
}

async function rechazarComprobante(comprobanteId, usuarioId) {
  // Validar que exista el comprobante
  const comprobante = await Comprobante.findByPk(comprobanteId);
  if (!comprobante) {
    throw new ServiceError("Comprobante no encontrado", 404);
  }
  // Actualizar el estado del comprobante a aprobado
  const estado = comprobante.estado_validacion;
  if (estado !== "pendiente") {
    throw new ServiceError("El comprobante ya ha sido validado", 409);
  }
  comprobante.estado_validacion = "rechazado";
  comprobante.validado_por = usuarioId;
  comprobante.validado_en = new Date();

  await comprobante.save();

  return comprobante;
}

async function eliminarComprobante(comprobanteId, usuarioId) {
  //Validar si existe
  const comprobante = await Comprobante.findByPk(comprobanteId);
  if (!comprobante) {
    throw new ServiceError("Comprobante no encontrado", 404);
  }
  //Verificar si el comprobante ya ha sido validado

  const estado = comprobante.estado_validacion;
  if (estado === "pendiente") {
    throw new ServiceError(
      "No se puede eliminar un comprobante que no ha sido validado",
      409
    );
  }

  comprobante.is_deleted = true;
  comprobante.deleted_at = new Date();
  comprobante.updated_by = usuarioId;

  await comprobante.save();

  return comprobante;
}
module.exports = {
  subirComprobante,
  validarComprobante,
  rechazarComprobante,
  eliminarComprobante,
};

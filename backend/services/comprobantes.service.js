const fs = require("fs");
const path = require("path");
const { Comprobante, Pago, Contrato, Cliente } = require("../models");
const crypto = require("crypto");
const { Op } = require("sequelize");
const ServiceError = require("../utils/serviceError");
const UPLOAD_DIR = path.join(__dirname, "..", "uploads", "comprobantes");
const { notificacionARol } = require("./notificaciones.service");

async function listarComprobantes() {
  //return [{ test: true }];
  // await notificacionARol({
  //   rol: "admin",
  //   tipo: "comprobante_subido",
  //   mensaje: `Se ha subido un nuevo comprobante para el pago #${id_pago}.`,
  //   id_pago,
  //   created_by: usuarioId,
  // });

  return await Comprobante.findAll({
    //limit: 1,
    where: { is_deleted: false },

    include: [
      {
        model: Pago,
        as: "pago",
        required: false,
        include: [
          {
            model: Contrato,
            as: "contrato",
            required: false,
            include: [
              {
                model: Cliente,
                as: "cliente",
                required: false,
              },
            ],
          },
        ],
      },
    ],
  });
}

async function subirComprobante({
  contratoId,
  monto,
  metodo,
  usuarioId,
  notas,
  archivo,
  nombreArchivo,
}) {
  // 1. Validaciones minimas

  if (!archivo) throw new Error("No se recibió un archivo");

  // 2. Verificar si el contrato existe y obtener el periodo para crear el pago
  const periodo = await calcularPeriodoPago(contratoId);

  // 3. Crear nombre único
  const extension = path.extname(nombreArchivo || "") || ".pdf";
  const filename = `comp_${Date.now()}${extension}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  // 4. Guardar el archivo

  fs.writeFileSync(filepath, archivo);

  // 5. Crear hash del archivo
  const fileBuffer = fs.readFileSync(filepath);
  const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");
  const pago = await Pago.create({
    id_contrato: contratoId,
    fecha: new Date(),
    periodo,
    monto,
    metodo,
    estado_pago: "pendiente",
    created_at: new Date(),
    created_by: usuarioId,
    is_deleted: false,
  });

  // 6. Crear registro en BD
  const comprobante = await Comprobante.create({
    id_pago: pago.id,
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
  const comprobante = await Comprobante.findByPk(comprobanteId, {
    transaction: t,
  });
  const pago = await Pago.findByPk(comprobante.id_pago, {
    transaction: t,
  });
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

  await comprobante.save({ transaction: t });

  pago.estado_pago = "pagado";
  pago.updated_at = new Date();
  pago.updated_by = usuarioId;

  await pago.save({ transaction: t });

  //IMPORTANTE: Actualizar el estado del pago asociado a 'pagado' (estado_pago)

  return comprobante;
}

async function rechazarComprobante(comprobanteId, usuarioId) {
  // Validar que exista el comprobante
  const comprobante = await Comprobante.findByPk(comprobanteId, {
    transaction: t,
  });
  const pago = await Pago.findByPk(comprobante.id_pago, {
    transaction: t,
  });
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

  await comprobante.save({ transaction: t });

  pago.estado_pago = "rechazado";
  pago.updated_at = new Date();
  pago.updated_by = usuarioId;

  await pago.save({ transaction: t });

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
async function calcularPeriodoPago(contratoId) {
  const contrato = await Contrato.findByPk(contratoId);
  //Validar que el contrato existe
  if (!contrato) {
    throw new ServiceError("No existe el contrato", 404);
  }

  const hoy = new Date();
  //Si existe se busca un pago pendiente
  const pagoPendiente = await Pago.findOne({
    where: {
      id_contrato: contratoId,
      is_deleted: false,
      estado_pago: {
        [Op.ne]: "pagado",
      },
      periodo: { [Op.lt]: hoy },
    },
    order: [["periodo", "ASC"]],
  });
  if (pagoPendiente) {
    return pagoPendiente.periodo;
  }

  //Si no existe es un pago adelantado (Validar el periodo a pagar)
  const ultimoPago = await Pago.findOne({
    where: {
      id_contrato: contratoId,
      estado_pago: "pagado",
      is_deleted: false,
    },
    order: [["periodo", "DESC"]],
  });

  let siguientePeriodo;

  if (ultimoPago) {
    // 👉 Caso 2a: hay pagos previos
    const ultimo = new Date(ultimoPago.periodo);
    siguientePeriodo = new Date(ultimo.getFullYear(), ultimo.getMonth() + 1, 1);
  } else {
    // 👉 Caso 2b: nunca ha pagado → usar inicio de contrato
    const inicio = new Date(contrato.periodo_inicio);
    siguientePeriodo = new Date(inicio.getFullYear(), inicio.getMonth(), 1);
  }
  return siguientePeriodo;
}

module.exports = {
  subirComprobante,
  validarComprobante,
  rechazarComprobante,
  eliminarComprobante,
  listarComprobantes,
};

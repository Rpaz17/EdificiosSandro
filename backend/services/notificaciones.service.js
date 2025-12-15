const { Notificacion, Usuario } = require("../models");
const { Op } = require("sequelize");

async function crearNotificacion({
    tipo,
    medio = "APP",
    mensaje,
    id_usuario,
    id_cliente = null,
    id_contrato = null,
    id_pago = null,
    created_by = null,
}) {
    const ahora = new Date();

    return Notificacion.create({
        tipo,
        medio,
        estado: "NO_LEIDA",
        payload: mensaje,
        fecha_envio: ahora,

        id_usuario,
        id_cliente,
        id_contrato,
        id_pago,


        created_at: ahora,
        created_by: created_by ?? id_usuario,
        updated_at: ahora,
        updated_by: created_by ?? id_usuario,
        deleted_at: null,
        is_deleted: false,
    });
}

async function notificacionARol({
    rol = "admin",
    tipo,
    medio = "APP",
    mensaje,
    id_cliente = null,
    id_contrato = null,
    id_pago = null,
    created_by = null,
}) {
    const admins = await Usuario.findAll({
        where: { rol, estado: true, is_deleted: false },
        attributes: ["id"],
    });

    const resultados = [];
    for (const admin of admins) {
        resultados.push(
            await crearNotificacion({
                tipo,
                medio,
                mensaje,
                id_usuario: admin.id,
                id_cliente,
                id_contrato,
                id_pago,
                created_by,
            })
        );
    }
    return resultados;
}

module.exports = {
    crearNotificacion,
    notificacionARol,

};
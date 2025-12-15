const express = require('express');
const { Apartamento, Sucursal } = require('../models');
const { notificacionARol } = require("../services/notificaciones.service");

// ===============================
// CONTROLADOR: Crear nuevo apartamento
// ===============================
const crearApartamento = async (req, res) => {
  try {
    let { id_sucursal, numero_apartamento, descripcion, precio_mensual, estado_ocupacion } = req.body;
    // 1. Validar campos obligatorios
    if (!id_sucursal || !numero_apartamento || !precio_mensual || !estado_ocupacion || !descripcion) {
      return res.status(400).json({
        error: 'Los campos id_sucursal, numero_apartamento, precio_mensual, estado_ocupacion y descripcion son obligatorios.',
      });
    }

    // Verificar si la sucursal existe
    const sucursal = await Sucursal.findByPk(id_sucursal);
    if (!sucursal) {
      return res.status(404).json({ error: 'La sucursal asignada no existe.' });
    }

    // Crear el nuevo apartamento
    const nuevoApartamento = await Apartamento.create({
      id_sucursal,
      numero_apartamento,
      descripcion,
      precio_mensual,
      estado_ocupacion,
      is_deleted: false, // Soft delete inicializado como falso
    });

    await notificacionARol({
      rol: "admin",
      tipo: "nuevo_apartamento",
      mensaje: `Nuevo apartamento creado: ${nuevoApartamento.codigo || nuevoApartamento.nombre || `ID ${nuevoApartamento.id}`}`,
      created_by: req.user?.id,
    });

    res.status(201).json(nuevoApartamento);
  } catch (error) {
    console.error(error);
    const status = (error && (error.statusCode || error.status)) || 500;
    const message = (error && error.message) || 'Error al registrar el apartamento.';
    return res.status(status).json({ error: message });
  }
};

const getApartamentos = async (req, res) => {
  try{
    const apartamentos = await Apartamento.findAll(
      {
        where: { is_deleted: false }
      }
    )
    res.status(200).json(apartamentos);
  } catch (error){
    console.error(error);
    const status = (error && (error.statusCode || error.status)) || 500;
    const message = (error && error.message) || 'Error al obtener los apartamentos.';
    return res.status(status).json({ error: message });
  }
};

const getApartamentosById = async (req, res) => {
  try{
    const { id } = req.params;
    const apartamento = await Apartamento.findOne(
      {
        where: { id: id, is_deleted: false }
      }
    )
    if(!apartamento){
      return  res.status(404).json({ error: 'Apartamento no encontrado.' });
    }
    res.status(200).json(apartamento);
  } catch (error){
    console.error(error);
    const status = (error && (error.statusCode || error.status)) || 500;
    const message = (error && error.message) || 'Error al obtener el apartamento.';
    return res.status(status).json({ error: message });
  }
};

const editarApartamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_sucursal, numero_apartamento, descripcion, precio_mensual, estado_ocupacion } = req.body;
    const apartamento = await Apartamento.findOne({ where: { id: id, is_deleted: false } });

    if (!apartamento) {
      return res.status(404).json({ error: 'Apartamento no encontrado.' });
    }
    // Actualizar campos
    apartamento.id_sucursal = id_sucursal || apartamento.id_sucursal;
    apartamento.numero_apartamento = numero_apartamento || apartamento.numero_apartamento;
    apartamento.descripcion = descripcion || apartamento.descripcion;
    apartamento.precio_mensual = precio_mensual || apartamento.precio_mensual;
    apartamento.estado_ocupacion = estado_ocupacion || apartamento.estado_ocupacion;

    await apartamento.save();
    res.status(200).json(apartamento);
  } catch (error) {
    console.error(error);
    const status = (error && (error.statusCode || error.status)) || 500;
    const message = (error && error.message) || 'Error al actualizar el apartamento.';
    return res.status(status).json({ error: message });
  }
};

const eliminarApartamento = async (req, res) => {
  try {
    const { id } = req.params;
    const apartamento = await Apartamento.findOne({ where: { id: id, is_deleted: false } });
    if (!apartamento) {
      return res.status(404).json({ error: 'Apartamento no encontrado.' });
    }

    // Soft delete: marcar como eliminado
    apartamento.is_deleted = true;
    apartamento.deleted_at = new Date();
    await apartamento.save();
    res.status(200).json({ mensaje: 'Apartamento eliminado correctamente.' });
  } catch (error) {
    console.error(error);
    const status = (error && (error.statusCode || error.status)) || 500;
    const message = (error && error.message) || 'Error al eliminar el apartamento.';
    return res.status(status).json({ error: message });
  }
};

module.exports = {
  crearApartamento,
  getApartamentos,
  getApartamentosById,
  editarApartamento,
  eliminarApartamento,

};

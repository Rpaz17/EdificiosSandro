const express = require('express');
const { Apartamento, Sucursal } = require('../models');

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

module.exports = {
  crearApartamento,
  getApartamentos,
  getApartamentosById,

};

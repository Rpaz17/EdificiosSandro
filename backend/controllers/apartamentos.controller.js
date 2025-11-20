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
    res.status(500).json({ error: 'Error al registrar el apartamento.' });
  }
};

module.exports = {
  crearApartamento,
  
};

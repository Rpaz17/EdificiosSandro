const { Cliente, Apartamento, Contrato } = require('../models');

// Crear un nuevo contrato
const crearContrato = async (req, res) => {
    try {
        const { id_cliente, id_apartamento, periodo_inicio, periodo_fin, monto, deposito, estado } = req.body;

        
        const cliente = await Cliente.findByPk(clienteId);
        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }

        const apartamento = await Apartamento.findByPk(id_apartamento);
        if (!apartamento) {
            return res.status(404).json(
                {
                    mensaje: 'Apartamento no encontrado' 
                }
            );
        }
        if (apartamento.estado === 'ocupado') {
            return res.status(400).json(
                { 
                    mensaje: 'El apartamento ya está ocupado' 
                }
            );
        }

        const nuevoContrato = await Contrato.create({
            id_cliente,
            id_apartamento,
            periodo_inicio,
            periodo_fin,
            monto,
            deposito,
            estado
        });

        apartamento.estado = 'ocupado';
        await apartamento.save();

        res.status(201).json(
            { 
                mensaje: 'Contrato creado exitosamente',
                contrato: nuevoContrato 
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json(
            { 
                mensaje: 'Error al crear el contrato' 
            }
        );
    }
};

module.exports = {
    crearContrato,

};
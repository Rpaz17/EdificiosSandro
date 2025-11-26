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

const editarContrato = async (req, res) => {
    // Lógica para editar un contrato existente
    try {
        const { id } = req.params;
        const { id_cliente, id_apartamento, periodo_inicio, periodo_fin, monto, deposito, estado } = req.body;  
        const contrato = await Contrato.findByPk(id);
        if(id_cliente){
            const cliente =  await Cliente.findByPk(id_cliente);
            if(!cliente){
                return res.status(404).json({ mensaje: 'Cliente no encontrado' });
            } 
        }
        if(id_apartamento){
            const apartamento =  await Apartamento.findByPk(id_apartamento);
            if(!apartamento){
                return res.status(404).json({ mensaje: 'Apartamento no encontrado' });
            } 
        }
        if (!contrato) {
            return res.status(404).json({ mensaje: 'Contrato no encontrado' });
        }   
        contrato.id_cliente = id_cliente || contrato.id_cliente;
        contrato.id_apartamento = id_apartamento || contrato.id_apartamento;
        contrato.periodo_inicio = periodo_inicio || contrato.periodo_inicio;
        contrato.periodo_fin = periodo_fin || contrato.periodo_fin;
        contrato.monto = monto || contrato.monto;
        contrato.deposito = deposito || contrato.deposito;
        contrato.estado = estado || contrato.estado;
        await contrato.save();
        res.status(200).json(
            {
                mensaje: 'Contrato actualizado exitosamente',
                contrato: contrato
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json(
            {
                mensaje: 'Error al actualizar el contrato'
            }
        );
    }
};

module.exports = {
    crearContrato,
    editarContrato,

};
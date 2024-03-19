// Los corladores tien la lógica del negocio
// Solicitan la información a los modelos

const Mascotas = require('../models/Mascotas');

const createMascota = (req, res) => {
    const mascota = req.body;
    // Guardar en la base de datos
    Mascotas.create(mascota)
        .then((newMascota) => {
            res.status(201).json(newMascota);
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ error: 'Tuvimos un error, intenta más tarde' });
        });
}

const findAllMacotas = async (req, res) => {
    try {
        const todasMascotas = await Mascotas.findAll();
        res.status(200).json(todasMascotas);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Tuvimos un error, intenta más tarde' });
    }
}

const findOneMascota = async (req, res) => {
    try {
        const idMascota = req.params.id;
        const mascota = await Mascotas.findOne(idMascota);
        if (mascota.length === 0) {
            res.status(404).json({ message: 'Mascota no encontrada' });
        } else {
            res.status(200).json(mascota[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Tuvimos un error, intenta más tarde' });
    }
}

const updateMascota = async (req, res) => {
    try {
        const idMascota = req.params.id;
        const bodyToUpdate = req.body;

        const updatedMascota = await Mascotas.update(idMascota, bodyToUpdate);
        res.status(200).json(updatedMascota);
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Tuvimos un error, intenta más tarde' });
    }
}

module.exports = {
    createMascota,
    findAllMacotas,
    findOneMascota,
    updateMascota
}
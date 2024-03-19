const express = require('express');
const router = express.Router();

const MascotaController = require('../controllers/mascotaController');

// Ruta crear;
router.post('/api/mascotas', MascotaController.createMascota);
router.get('/api/mascotas', MascotaController.findAllMacotas);
router.get('/api/mascotas/:id', MascotaController.findOneMascota);
router.put('/api/mascotas/:id', MascotaController.updateMascota);

module.exports = router;

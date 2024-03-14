const express = require('express');

// Mandando a llamar la conexión a la base de datos
const db = require('./config');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Llamas en pijamas')
});

// CRUD

// Create
app.post('/api/mascotas', (req, res) => {
    const mascota = req.body;
    // Guardar en la base de datos
    db
        .insert(mascota)
        .into('mascotas')
        .returning(['mascota_id', 'name', 'breed', 'age', 'active'])
        .then((newMascota) => {
            res.status(201).json(newMascota);
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ error: 'Tuvimos un error, intenta más tarde' });
        });
});

// Get all
app.get('/api/mascotas', async (req, res) => { 
    try {
        const todasMascotas = await db.select('*').from('mascotas');
        res.status(200).json(todasMascotas);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Tuvimos un error, intenta más tarde' });
    }
});

// Get one by id
// /api/mascotas/1
// /api/mascotas/2
app.get('/api/mascotas/:id', async (req, res) => {
    try {
        const idMascota = req.params.id;
        const mascota = await db.select('*').from('mascotas').where({ mascota_id: idMascota });
        if (mascota.length === 0) {
            res.status(404).json({ message: 'Mascota no encontrada' });
        } else {
            res.status(200).json(mascota[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Tuvimos un error, intenta más tarde' });
    }
});


app.listen(3000, () => {
    console.log('Server on');
});

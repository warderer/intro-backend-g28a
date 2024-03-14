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
app.post('/api/users', (req, res) => {
    const user = req.body;
    // Guardar en la base de datos
    db
        .insert(user)
        .into('users')
        .returning(['user_id', 'name', 'last_name', 'phone_number'])
        .then((user) => {
            res.status(201).json(user);
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ error: 'Tuvimos un error, intenta más tarde' });
        });
});

// Quiero obtener la mascota del usuario 1
app.get('/api/users/:id/mascotas', async (req, res) => {
    try {
        const userId = req.params.id;

        const response = await db
            .select(
                'mascotas.name as mascotaName', 
                'users.name as userName', 
                'mascotas.*', 
                'users.*'
            )
            .from('mascotas')
            .where({ user: userId })
            .join('users', { 'users.user_id': 'mascotas.user' })

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Tuvimos un error, intenta más tarde' });
    }
});

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
        const todasMascotas = await db.select('*').from('mascotas').where({ active: true });
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
        const mascota = await db.select('*').from('mascotas').where({ mascota_id: idMascota, active: true });
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


// Update one by id
app.put('/api/mascotas/:id', async (req, res) => {
    try {
        const idMascota = req.params.id;
        const bodyToUpdate = req.body;

        const updatedMascota = await db
            .update(bodyToUpdate)
            .from('mascotas')
            .where({ mascota_id: idMascota, active: true })
            .returning(['mascota_id', 'name', 'breed', 'age', 'active']);

        res.status(200).json(updatedMascota);
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Tuvimos un error, intenta más tarde' });
    }
});

// Delete one by id
app.delete('/api/mascotas/:id', async (req, res) => {
    try {
        const idMascota = req.params.id;
        // Borrado fisico
        // await db.del().from('mascotas').where({ mascota_id: idMascota })

        // Borrado lógico
        await db
            .update({ active: false })
            .from('mascotas')
            .where({ mascota_id: idMascota })
        
        res.status(204).json();
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Tuvimos un error, intenta más tarde' });
    }
});


app.listen(3000, () => {
    console.log('Server on');
});

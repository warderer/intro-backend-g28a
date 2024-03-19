const express = require('express');
const masctotaRoutes = require('./routes/mascotasRoutes');

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


// Llamar a la ruta;
app.use(masctotaRoutes);


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

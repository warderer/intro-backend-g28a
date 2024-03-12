// Importar la biblioteca
const express = require('express');

// Ejecutar express
const app = express();

// Configuración para los jsons
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    console.log('Hicieron un GET al /');
    res.status(200).send('Hola desde express');
});

app.get('/empleados', (req, res) => {
    console.log('Ruta de empleados');
    const respuestaJson = { 
        mensaje: 'Tira de empleados json' 
    };
    res.status(201).json(respuestaJson);
});


// CRUD Mascotas

// Obtener todas as mascotas (GET)
app.get('/mascotas',(req, res) => {
    console.log(req.query.name);
    const arrayMascota = [
        {id: 1, nombre: 'max'},
        {id: 2, nombre: 'mex'},
    ];
    
    res.status(200).json(arrayMascota)
});

// Obtener UNA mascota por ID [mascotas/2] (GET)
app.get('/mascotas/:idMascota', (req, res) => {
    // req es todo lo que nos envia el cliente al servidor
    // res es todo lo que el servidor envia al cliente

    const idBusqueda = req.params.idMascota;

    const arrayMascota = [
        {id: 1, nombre: 'max'},
        {id: 2, nombre: 'mex'},
    ];
    // Busca la mascota por ID
    const mascotaEncontrada = arrayMascota.find(mascota => mascota.id == idBusqueda);

    if (mascotaEncontrada) {
        res.status(200).json(mascotaEncontrada)
    } else {
        res.status(404).json({ message: 'Mascota no existe' })
    }
});

// POST (Crear)
app.post('/mascotas', (req, res)=> {
    console.log('POST');
    console.log(req.body);
    const arrayMascota = [
        {id: 1, nombre: 'max'},
        {id: 2, nombre: 'mex'},
    ];
    arrayMascota.push({ id: 3, nombre: req.body.nombre });
    res.status(201).json(arrayMascota);
});

app.delete('/mascotas/:id', (req, res) => {
    const idBusqueda = req.params.id;

    const arrayMascota = [
        {id: 1, nombre: 'max'},
        {id: 2, nombre: 'mex'},
    ];
    // Busca la mascota por ID
    const mascotaEncontrada = arrayMascota.find(mascota => mascota.id == idBusqueda);

    if (mascotaEncontrada) {
        res.status(204).json();
    } else {
        res.status(404).json({ message: 'Mascota no existe' });
    }

});

// Levantar el servidor
app.listen(3000, () => {
    console.log('El servidor está corriendo correctamente');
});

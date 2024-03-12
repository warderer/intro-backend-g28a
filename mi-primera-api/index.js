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
    console.log(req.query);
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


// Para crear tres endpoints que sumen dos dígitos.

// El enpoint e debe de llamar "/api/suma"
// Y uno debe de ser por query y otro por params

// params: api/suma/1/6 la respuesta debe de ser { suma: 7}
// query: api/suma?num1=5&num2=6 la respuesta debe de ser { suma: 11}
// body: api/suma, body { num1: 2, num2: 6 } la respuesta debe de ser { suma: 8}


// Levantar el servidor
app.listen(3000, () => {
    console.log('El servidor está corriendo correctamente');
});

// El modelo obtiene los datos de la base de datos
// no se encarga de vlidar los datos, ni lógica de negocios

// Mandando a llamar la conexión a la base de datos
const db = require('../config');

const create = (bodyMascota) => {
    return db
    .insert(bodyMascota)
    .into('mascotas')
    .returning(['mascota_id', 'name', 'breed', 'age', 'active']);
}

const findAll = () => {
    return db
        .select('*')
        .from('mascotas')
        .where({ active: true });
}

const findOne = (idMascota) => {
    return db
        .select('*')
        .from('mascotas')
        .where({ mascota_id: idMascota, active: true });
}

const update = (idMascota, bodyToUpdate) => {
    return db
    .update(bodyToUpdate)
    .from('mascotas')
    .where({ mascota_id: idMascota, active: true })
    .returning(['mascota_id', 'name', 'breed', 'age', 'active']);
}

const logicDelete = (idMascota) => {
    return db
    .update({ active: false })
    .from('mascotas')
    .where({ mascota_id: idMascota })
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    logicDelete,
}
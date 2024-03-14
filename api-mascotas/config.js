// Este archivo de configración normalmente es un SINGLETON
// Tiene como responsabilidad conectarse a la base de datos cuando el servidor se levante
// Tambien tiene la responsabilidad de conectarse al entorno

const env = 'development';

const knexfile = require('./knexfile');
const knex = require('knex');

module.exports = knex(knexfile[env])

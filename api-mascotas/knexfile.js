// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: ""
    // postgres://user:contraseña@localhost:5432/dbname
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: 'floppy.db.elephantsql.com',
      database: 'svmlgssa',
      user:     'svmlgssa',
      password: 'U7ZN1_DCg7VnjuwWAtBq7ULNYmuvOdKF'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

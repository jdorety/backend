// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/partyplanner",
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  testing: {
    client: "pg",
    connection: "postgres://localhost/partyplanner-test",
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    // connection: {
    //   database: "my_db",
    //   user: "username",
    //   password: "password"
    // },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    // connection: {
    //   database: "my_db",
    //   user: "username",
    //   password: "password"
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations"
    },
    useNullAsDefault: true,
    seeds: {
      directory: "./data/seeds"
    }
  }
};

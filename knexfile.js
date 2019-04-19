// Update with your config settings.

// if no DATABASE_URL env variable use this object
const localPg = {
  host: "127.0.0.1",
  database: "mentor-me",
  user: "user",
  password: "password"
};
const productionDbConnectionString = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "dylandislers",
      password: "password",
      database: "mentor_me"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  testing: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "dylandislers",
      password: "password",
      database: "test_db"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  // Production is for hosting
  production: {
    client: "pg",
    connection: productionDbConnectionString, // could be object or string
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};

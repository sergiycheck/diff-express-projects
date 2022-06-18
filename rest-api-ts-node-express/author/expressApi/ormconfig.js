require("dotenv").config();

module.exports = {
  type: "postgres",
  host: "localhost",
  port: process.env.DB_PORT_DOCKER,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["build/database/entities/**/*.js"],
  synchronize: false,
  name: "default",
  logging: true,
  migrations: [`build/${process.env.DB_MIGRATION_DOCKER_FOLDER}/*.js`],
  cli: {
    migrationsDir: `build/${process.env.DB_MIGRATION_DOCKER_FOLDER}`,
  },
  migrationsRun: true,
};

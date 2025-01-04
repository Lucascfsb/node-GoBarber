"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MongoDataSource = exports.AppDataSource = void 0;
var _typeorm = require("typeorm");
const AppDataSource = exports.AppDataSource = new _typeorm.DataSource({
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "docker",
  "database": "gostack_gobarber",
  "synchronize": false,
  "migrations": ["src/shared/infra/typeorm/migrations/*.ts"],
  "entities": ["src/modules/**/infra/typeorm/entities/*.ts"]
});
const MongoDataSource = exports.MongoDataSource = new _typeorm.DataSource({
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "gostack_gobarber_mongo",
  entities: ["./src/modules/**/infra/typeorm/schemas/*.ts"]
});
AppDataSource.initialize().then(() => {
  console.log('PostgreSQL connected');
}).catch(err => {
  console.error('Error connecting to PostgreSQL', err);
});
MongoDataSource.initialize().then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "docker",
  "database": "gostack_gobarber",
  "synchronize": false,
  "migrations": [
    "src/shared/infra/typeorm/migrations/*.ts"
  ],
  "entities": [
    "src/modules/**/infra/typeorm/entities/*.ts"
  ]
})

export const MongoDataSource = new DataSource({
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "gostack_gobarber_mongo",
  entities: [
    "./src/modules/**/infra/typeorm/schemas/*.ts"
  ]
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

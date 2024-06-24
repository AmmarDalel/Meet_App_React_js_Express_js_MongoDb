import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "ChatApp",
  useUnifiedTopology: true,
  entities: [__dirname + "/entity/*.ts"],
  synchronize: true,
  logging: true,
});

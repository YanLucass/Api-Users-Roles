import { DataSource } from "typeorm";

// vamos usar sqlite
export const dataSource = new DataSource({
   type: "sqlite",
   database: "./db.sqlite", //arquivo que contém a estrutura do bd(sqlite é assim)
   entities: [],
   migrations: [],
});

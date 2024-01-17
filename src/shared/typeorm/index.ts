import { DataSource } from "typeorm";
import { CreateRolesTable1705428558994 } from "./migrations/1705428558994-CreateRolesTable";
import { Role } from "@roles/entities/Role";

//postgres
export const PostgresDataSource = new DataSource({
   type: "postgres",
   host: "localhost",
   port: 5432,
   username: "postgres",
   password: "180",
   database: "myapii",
   entities: [Role],
   migrations: [CreateRolesTable1705428558994],
});

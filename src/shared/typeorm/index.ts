import { DataSource } from "typeorm";
//migrations
import { CreateRolesTable1705428558994 } from "./migrations/1705428558994-CreateRolesTable";
import { CreateUsersTable1707062283935 } from "./migrations/1707062283935-CreateUsersTable";
import { AddRoleIdToUsersTable1707063703772 } from "./migrations/1707063703772-AddRoleIdToUsersTable";
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
   migrations: [
      CreateRolesTable1705428558994,
      CreateUsersTable1707062283935,
      AddRoleIdToUsersTable1707063703772,
   ],
});

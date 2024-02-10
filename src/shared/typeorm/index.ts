import { DataSource } from "typeorm";
//migrations
import { CreateRolesTable1705428558994 } from "./migrations/1705428558994-CreateRolesTable";
import { CreateUsersTable1707062283935 } from "./migrations/1707062283935-CreateUsersTable";
import { AddRoleIdToUsersTable1707063703772 } from "./migrations/1707063703772-AddRoleIdToUsersTable";
//entities
import { Role } from "@roles/entities/Role";
import { User } from "@users/entities/User";

//postgres
export const PostgresDataSource = new DataSource({
   type: "postgres",
   host: process.env.DB_HOST,
   port: parseInt(process.env.DB_PORT || "5432", 10),
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   entities: [Role, User],
   migrations: [
      CreateRolesTable1705428558994,
      CreateUsersTable1707062283935,
      AddRoleIdToUsersTable1707063703772,
   ],
});

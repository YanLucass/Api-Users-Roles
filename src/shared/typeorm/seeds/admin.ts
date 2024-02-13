import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";
import { PostgresDataSource } from "..";

async function create() {
   const connection = await PostgresDataSource.initialize();

   try {
      // Create Role
      const roleId = uuidV4();
      await connection.query(
         `INSERT INTO ROLES(id, name)
         values($1, $2)`,
         [roleId, "TdI"],
      );

      // Create User
      const userId = uuidV4();
      const password = await hash("1234", 10);
      await connection.query(
         `INSERT INTO USERS(id, name, email, password, "isAdmin", "roleId")
         values($1, $2, $3, $4, $5, $6)`,
         [userId, "admfin", "ad@a.com", password, true, roleId],
      );

      console.log("User admin created!");
   } catch (error) {
      console.error("Error executing prepared queries", error);
   } finally {
      await connection.destroy();
   }
}

create();

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1707062283935 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "users",
            columns: [
               {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
               },

               {
                  name: "name",
                  type: "varchar(40)",
               },

               {
                  name: "email",
                  type: "varchar(50)",
                  isUnique: true,
               },

               {
                  name: "password",
                  type: "varchar(255)",
               },

               {
                  name: "avatar",
                  type: "varchar(255)",
                  isNullable: true,
               },
               //mudei
               {
                  name: "isAdmin",
                  type: "boolean",
                  isUnique: false,
               },

               {
                  name: "created_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
               },
            ],
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users");
   }
}

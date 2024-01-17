import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRolesTable1705428558994 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      //vai receber objeto com as configurações das colunas.
      await queryRunner.createTable(
         new Table({
            name: "roles",
            columns: [
               {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
               },

               {
                  name: "name",
                  type: "varchar",
                  isUnique: true,
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
      await queryRunner.dropTable("roles");
   }
}

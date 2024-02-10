import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddRoleIdToUsersTable1707063703772 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
         "users",
         new TableColumn({
            name: "roleId",
            type: "uuid",
            isNullable: true,
         }),
      );

      //add foreingKey
      await queryRunner.createForeignKey(
         "users",
         new TableForeignKey({
            name: "UserRole",
            columnNames: ["roleId"],
            referencedTableName: "roles",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      //drop fk
      await queryRunner.dropForeignKey("users", "UserRole");
      //drop column
      await queryRunner.dropColumn("users", "roleId");
   }
}

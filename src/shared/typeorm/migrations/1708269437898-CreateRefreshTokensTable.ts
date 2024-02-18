import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRefreshTokensTable1708269437898 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "refresh_tokens",
            columns: [
               {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
               },
               {
                  name: "user_id",
                  type: "uuid",
               },

               {
                  name: "token",
                  type: "varchar(60)",
                  isUnique: true,
               },

               {
                  name: "valid",
                  type: "boolean",
                  default: true,
               },

               {
                  name: "expires",
                  type: "timestamp",
               },

               {
                  name: "created_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
               },
            ],
            foreignKeys: [
               {
                  name: "RefreshTokensUsers",
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
                  columnNames: ["user_id"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE",
               },
            ],
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("refresh_tokens");
   }
}

import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("roles") //Definir como entidade e passar nome da tabela que essa classe ta mapeando
export class Role {
   @PrimaryColumn()
   id?: string;

   @Column()
   name: string;

   @CreateDateColumn()
   created_at: Date;

   constructor() {
      if (!this.id) {
         this.id = uuidv4();
      }
   }
}

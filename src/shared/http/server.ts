import "dotenv/config";

// reflect-metadata
import "reflect-metadata";

import { app } from "./appExpress";

//importar instancia do DataSource para conectar ao BD quando a aplicação iniciar.
import { dataSource } from "../typeorm/index";

dataSource
   .initialize()
   .then(() => {
      // quando conectar ao bd
      app.listen(process.env.PORT, () => {
         console.log(`Server stard on port ${process.env.PORT}`);
      });
   })
   .catch(err => {
      console.log("Erro ao se conectar ao bd", err);
   });

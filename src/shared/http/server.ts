import "dotenv/config";
import express from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

const app = express();
app.use(cors());

app.use(express.json());

//define routes only file (index.ts)
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server stard on port ${process.env.PORT}`);
});

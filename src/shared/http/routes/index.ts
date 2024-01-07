import { Router } from "express";
import { roulesRouter } from "@roles/http/routes/rolesRouter";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ message: "Hello world!" });
});

//definir rotas para roles.
router.use("/roles", roulesRouter); //ex http://localhost/roles

export { router };

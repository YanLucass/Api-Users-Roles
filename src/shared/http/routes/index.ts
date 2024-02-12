import { Router } from "express";
import { rolesRouter } from "@roles/http/routes/rolesRouter";
import { usersRouter } from "@users/http/usersRoutes";

const router = Router();

router.get("/", (req, res) => {
   return res.json({ message: "Hello world!" });
});

//define routes.
router.use("/roles", rolesRouter); //ex http://localhost/roles
router.use("/users", usersRouter);

export { router };

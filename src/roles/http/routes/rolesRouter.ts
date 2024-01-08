import { Router } from "express";
import { RolesRepository } from "@roles/repositories/RolesRepository";
const roulesRouter = Router();

//criar repositorio
const rolesRepository = new RolesRepository();

//simular bd

// criar roles
roulesRouter.post("/", (req, res) => {
   const { name } = req.body;
   const role = rolesRepository.create({ name });

   return res.status(201).json({ message: "Novo role criado", role });
});

export { roulesRouter };

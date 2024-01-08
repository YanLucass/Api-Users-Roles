import { Router } from "express";
import { RolesRepository } from "@roles/repositories/RolesRepository";
const roulesRouter = Router();

//criar repositorio
const rolesRepository = new RolesRepository();

//simular bd

// criar roles
roulesRouter.post("/", (req, res) => {
   const { name } = req.body;
   const roleAlreadyExists = rolesRepository.findByName(name);

   if (roleAlreadyExists) {
      return res.status(400).json({ error: "Role already exists" });
   }

   const role = rolesRepository.create({ name });

   return res.status(201).json({ message: "Novo role criado", role });
});

//pegar roles

roulesRouter.get("/", (req, res) => {
   const roles = rolesRepository.findAll();
   return res.json({ message: "Roles", roles });
});

export { roulesRouter };

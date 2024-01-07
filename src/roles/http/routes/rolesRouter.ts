import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const roulesRouter = Router();

//simular bd

const roles: Role[] = [];

interface Role {
  id: string;
  name: string;
  created_at: Date;
}

// criar roles
roulesRouter.post("/", (req, res) => {
  const { name } = req.body;

  const newRole: Role = {
    id: uuidv4(),
    name,
    created_at: new Date(),
  };

  roles.push(newRole);

  return res.status(201).json({ message: "Novo role criado", newRole });
});

export { roulesRouter };

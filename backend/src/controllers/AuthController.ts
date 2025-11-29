import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../utils/errorHandler";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "segredo_padrao";

export class AuthController {
  
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, address } = req.body;;
      if (!name || !email || !password) return res.status(400).json({ error: "Faltam dados" });

      const exists = await prisma.user.findUnique({ where: { email } });
      if (exists) return res.status(400).json({ error: "Email já existe" });

      const hash = await bcrypt.hash(password, 10);
      
      const user = await prisma.user.create({
        data: { name, email, password: hash, address }
      });

      return res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (e) { return handleError(res, e, "Erro no registro"); }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ error: "Credenciais inválidas" });

      const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: "1d" });
      
      return res.json({ 
        user: { id: user.id, name: user.name, email: user.email }, 
        token 
      });
    } catch (e) { return handleError(res, e, "Erro no login"); }
  }
}
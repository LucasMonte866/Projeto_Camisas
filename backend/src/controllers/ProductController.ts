import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { handleError } from "../utils/errorHandler";

const prisma = new PrismaClient();

export class ProductController {
  async list(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany();
      return res.json(products);
    } catch (e) { return handleError(res, e, "Erro ao listar"); }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, team, price, image_url } = req.body;
      const product = await prisma.product.create({
        data: { name, team, price: Number(price), image_url }
      });
      return res.status(201).json(product);
    } catch (e) { return handleError(res, e, "Erro ao criar"); }
  }
}   
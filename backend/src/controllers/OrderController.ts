import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { handleError } from "../utils/errorHandler";

const prisma = new PrismaClient();

export class OrderController {
  // Criar Pedido
  async create(req: Request, res: Response) {
    try {
      // Adicionamos shippingCost aqui
      const { userId, items, paymentMethod, shippingInfo } = req.body;

      if (!userId || !items) return res.status(400).json({ error: "Dados inválidos" });

      // Calcula total dos produtos
      let total = items.reduce((acc: number, item: any) => acc + item.price, 0);

      // Se tiver endereço (delivery), soma 30 reais
      if (shippingInfo && shippingInfo !== 'Retirada na Loja') {
        total += 30.00; 
      }

      const order = await prisma.order.create({
        data: {
          userId,
          total, // Agora o total inclui o frete
          paymentMethod: paymentMethod || "PIX",
          items: {
            create: items.map((item: any) => ({
              productId: item.id,
              quantity: 1,
              price: item.price
            }))
          }
        }
      });
      return res.status(201).json(order);
    } catch (e) { return handleError(res, e, "Erro ao criar pedido"); }
  }

  // Listar Pedidos do Usuário (NOVO)
  async listByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const orders = await prisma.order.findMany({
        where: { userId: Number(userId) },
        include: { items: { include: { product: true } } }, // Traz os itens e produtos
        orderBy: { createdAt: 'desc' }
      });
      return res.json(orders);
    } catch (e) { return handleError(res, e, "Erro ao buscar pedidos"); }
  }

  // Confirmar Entrega (NOVO)
  async confirmDelivery(req: Request, res: Response) {
    try {
        const { id } = req.params;
        await prisma.order.update({
            where: { id: Number(id) },
            data: { status: "ENTREGUE" }
        });
        return res.json({ message: "Confirmado!" });
    } catch (e) { return handleError(res, e, "Erro ao confirmar"); }
  }
}
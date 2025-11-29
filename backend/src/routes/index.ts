import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { ProductController } from "../controllers/ProductController";
import { OrderController } from "../controllers/OrderController"; // Importou aqui

const router = Router();
const auth = new AuthController();
const prod = new ProductController();
const order = new OrderController(); 
router.post("/orders", order.create);

router.get("/orders/:userId", order.listByUser); // Rota nova
router.patch("/orders/:id/confirm", order.confirmDelivery);// Instanciou aqui

// Rotas Públicas
router.get("/health", (req, res) => res.json({ status: "API Online 🚀" }));
router.post("/register", auth.register);
router.post("/login", auth.login);

// Produtos
router.get("/products", prod.list);
router.post("/products", prod.create);

// PEDIDOS (A nova rota mágica)
router.post("/orders", order.create);

export { router };
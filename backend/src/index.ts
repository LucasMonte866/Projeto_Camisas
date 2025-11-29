import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api", router);

// Rota para servir as imagens (ex: http://localhost:3000/img/camisa.jpg)
app.use("/img", express.static("public/img"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 SERVIDOR RODANDO EM http://localhost:${PORT}`));
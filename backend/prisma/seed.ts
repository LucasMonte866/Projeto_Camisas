import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Semeando produtos...");

  await prisma.product.createMany({
    data: [
      { name: "Camisa Palmeiras 24/25", team: "Palmeiras", price: 249.90, image_url: "img/palmeiras.jpg" },
      { name: "Camisa São Paulo 24/25", team: "São Paulo", price: 249.90, image_url: "img/saopaulo.jpg" },
      { name: "Camisa Seleção Brasil", team: "Brasil", price: 299.90, image_url: "img/brasil.jpg" }
    ]
  });

  console.log("✅ Produtos adicionados!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Navbar } from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";
import { Footer } from "../components/Footer"; // Importando Footer

export function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  function addToCart(product: any) {
    const savedCart = localStorage.getItem("cart");
    const cart = savedCart ? JSON.parse(savedCart) : [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} adicionado!`);
  }

  return (
    <div>
      <Navbar />
      <div className="container" style={{minHeight: '60vh'}}>
        <h3 className="mb-20">Destaques da Temporada</h3>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image_url}
              onAdd={() => addToCart(product)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
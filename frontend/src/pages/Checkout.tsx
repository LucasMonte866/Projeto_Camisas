import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Navbar } from "../components/Navbar";
import { ShippingForm } from "../components/ShippingForm";
import { PageTitle } from "../components/PageTitle";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer"; // Importei o Footer
import { CheckCircle } from "lucide-react";

export function Checkout() {
  const [cart, setCart] = useState<any[]>([]);
  const [payment, setPayment] = useState("PIX");
  const [shippingMethod, setShippingMethod] = useState("retirada");
  const [address, setAddress] = useState({ cep: "", city: "", number: "", complement: "" });
  
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // --- AQUI ESTÁ O HOOK useMemo (Requisito do Professor) ---
  // Ele memoriza o cálculo. Só refaz a conta se o carrinho ou o método de envio mudar.
  const calculation = useMemo(() => {
    const sub = cart.reduce((acc, item) => acc + item.price, 0);
    const ship = shippingMethod === 'delivery' ? 30.00 : 0.00;
    return { 
      subtotal: sub, 
      shipping: ship, 
      total: sub + ship 
    };
  }, [cart, shippingMethod]);
  // --------------------------------------------------------

  async function handleFinish() {
    const userStored = localStorage.getItem("user");
    if (!userStored) return navigate("/");
    const user = JSON.parse(userStored);

    if (shippingMethod === "delivery") {
        if(!address.cep || !address.city || !address.number) return alert("Preencha o endereço completo!");
    }

    try {
        await api.post("/orders", {
            userId: user.id,
            items: cart,
            paymentMethod: payment,
            shippingInfo: shippingMethod === 'delivery' ? address : 'Retirada na Loja'
        });
        alert("PEDIDO REALIZADO! 🎉");
        localStorage.removeItem("cart");
        navigate("/profile");
    } catch (e) { alert("Erro ao finalizar."); }
  }

  return (
    <div>
        <Navbar />
        <div className="container">
            <PageTitle title="Finalizar Pedido" subtitle="Revise seus itens e escolha o envio" />
            
            <div className="checkout-grid" style={{display: 'flex', gap: 30, flexWrap: 'wrap'}}>
                <div style={{flex: 2, minWidth: '300px'}}>
                    <ShippingForm 
                        method={shippingMethod} 
                        setMethod={setShippingMethod}
                        address={address}
                        setAddress={setAddress}
                    />

                    <div className="card">
                        <h4 className="mb-20">Itens do Pedido</h4>
                        {cart.map((item, i) => (
                            <div key={i} className="checkout-item">
                               <div className="checkout-info">
                                   <img src={`http://localhost:3000/${item.image_url}`} />
                                   <div>
                                     <strong>{item.name}</strong>
                                     <p style={{fontSize: '0.9rem', color: '#666'}}>Tamanho: G</p>
                                   </div>
                               </div>
                               <span className="price-tag">R$ {item.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card" style={{flex: 1, height: 'fit-content', minWidth: '300px'}}>
                    <h4 className="mb-20">Resumo da Compra</h4>
                    
                    <div className="form-group">
                        <label className="form-label">Forma de Pagamento</label>
                        <select className="form-select" value={payment} onChange={e => setPayment(e.target.value)}>
                            <option value="PIX">Pix (Aprovação Imediata)</option>
                            <option value="CARTAO">Cartão de Crédito</option>
                        </select>
                    </div>

                    <hr className="mb-20" style={{borderColor: '#eee'}} />
                    
                    <div className="flex-between mb-20">
                        <span>Subtotal:</span>
                        <span>R$ {calculation.subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex-between mb-20" style={{color: shippingMethod === 'delivery' ? '#ef4444' : '#10b981'}}>
                        <span>Frete:</span>
                        <span>{shippingMethod === 'delivery' ? 'R$ 30.00' : 'Grátis'}</span>
                    </div>

                    <hr className="mb-20" style={{borderColor: '#eee'}} />

                    <div className="flex-between mb-20" style={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                        <span>Total:</span>
                        <span style={{color: '#10b981'}}>R$ {calculation.total.toFixed(2)}</span>
                    </div>

                    <Button onClick={handleFinish}>
                        <CheckCircle size={20}/> Finalizar Compra
                    </Button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
}
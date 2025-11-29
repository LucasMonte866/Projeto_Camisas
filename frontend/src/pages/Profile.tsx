import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Navbar } from "../components/Navbar";
import { PageTitle } from "../components/PageTitle";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";

export function Profile() {
  const [orders, setOrders] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStored = localStorage.getItem("user");
    if (userStored) {
        const u = JSON.parse(userStored);
        setUser(u);
        loadOrders(u.id);
    }
  }, []);

  async function loadOrders(id: number) {
      const res = await api.get(`/orders/${id}`);
      setOrders(res.data);
  }

  async function confirmReceipt(id: number) {
      await api.patch(`/orders/${id}/confirm`);
      loadOrders(user.id);
  }

  return (
    <div>
        <Navbar />
        <div className="container" style={{minHeight: '60vh'}}>
            <PageTitle title={`Olá, ${user?.name} 👋`} subtitle="Acompanhe o status das suas compras" />
            
            {orders.length === 0 ? <p>Você ainda não fez nenhum pedido.</p> : null}

            <div className="orders-list">
                {orders.map(order => (
                    <div key={order.id} className="card mb-20">
                        
                        {/* CABEÇALHO DO PEDIDO */}
                        <div className="order-header">
                            <div>
                                <h4>Pedido #{order.id}</h4>
                                <small style={{color: '#64748b'}}>{new Date(order.createdAt).toLocaleDateString()}</small>
                            </div>
                            <StatusBadge status={order.status} />
                        </div>
                        
                        {/* LISTA DE ITENS */}
                        <div>
                           {order.items.map((item: any) => (
                               <div key={item.id} className="order-item-row">
                                   <div className="order-item-info">
                                       {/* Imagem do Produto */}
                                       <img 
                                            src={item.product?.image_url ? `http://localhost:3000/${item.product.image_url}` : "https://via.placeholder.com/50"} 
                                            style={{width: 50, height: 50, objectFit: 'contain', border: '1px solid #eee', borderRadius: 4}} 
                                       />
                                       <div>
                                            <strong>{item.product ? item.product.name : 'Produto Indisponível'}</strong>
                                            <p style={{fontSize: '0.85rem', color: '#666'}}>Qtd: 1</p>
                                       </div>
                                   </div>
                                   <span style={{fontWeight: 'bold'}}>R$ {item.price.toFixed(2)}</span>
                               </div>
                           ))}
                        </div>
                        
                        {/* RODAPÉ DO CARD (TOTAL E PAGAMENTO) */}
                        <div className="order-footer">
                            <div>
                                <span style={{display: 'block', fontSize: '0.85rem', color: '#64748b'}}>Forma de Pagamento</span>
                                <strong>{order.paymentMethod}</strong>
                            </div>
                            <div style={{textAlign: 'right'}}>
                                <span style={{display: 'block', fontSize: '0.85rem', color: '#64748b'}}>Total do Pedido</span>
                                <span className="order-total">R$ {order.total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* BOTÃO DE CONFIRMAR */}
                        {order.status !== "ENTREGUE" && (
                            <div className="mt-20">
                                <Button onClick={() => confirmReceipt(order.id)}>Confirmar Recebimento</Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
        <Footer />
    </div>
  );
}
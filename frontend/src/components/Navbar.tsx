import { ShoppingCart, User, LogOut, Home as HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  
  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <nav>
      <div className="container">
        <h2 style={{cursor: 'pointer'}} onClick={() => navigate("/home")}>CamisasFC 🏆</h2>
        <div style={{display: 'flex', gap: 20, alignItems: 'center'}}>
          <a onClick={() => navigate("/home")}><HomeIcon size={20} /> Loja</a>
          <a onClick={() => navigate("/profile")}><User size={20} /> Meus Pedidos</a>
          <a onClick={() => navigate("/checkout")}><ShoppingCart size={20} /> Carrinho</a>
          <a onClick={handleLogout} style={{color: '#ef4444'}}><LogOut size={20} /> Sair</a>
        </div>
      </div>
    </nav>
  );
}
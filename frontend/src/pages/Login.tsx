import { useState, useRef, useEffect } from "react"; // Adicionei useRef e useEffect
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { PageTitle } from "../components/PageTitle";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // --- HOOK useRef (Requisito do Professor) ---
  // Criamos uma referência direta ao elemento do Input de Email
  const emailRef = useRef<HTMLInputElement>(null);

  // --- HOOK useEffect (Requisito do Professor) ---
  // Assim que a tela carrega (array vazio []), focamos no email
  useEffect(() => {
    emailRef.current?.focus();
  }, []);
  // --------------------------------------------

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home");
    } catch (error) { alert("Erro ao logar."); }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ marginBottom: 20 }}>
           <span style={{fontSize: '3rem'}}>🏆</span>
        </div>
        <PageTitle title="CamisasFC" subtitle="Faça login para continuar" />
        
        <form onSubmit={handleLogin}>
          {/* Passamos a ref para o componente Input */}
          <Input 
            ref={emailRef} 
            label="E-mail" 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
          
          <Input 
            label="Senha" 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          
          <Button type="submit">ENTRAR</Button>
        </form>
        
        <p className="mt-20" style={{fontSize: '0.9rem'}}>
            Ainda não tem conta? <Link to="/register" style={{color: '#10b981', fontWeight: 'bold'}}>Crie agora</Link>
        </p>
      </div>
    </div>
  );
}
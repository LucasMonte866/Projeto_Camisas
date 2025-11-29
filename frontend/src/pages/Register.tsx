import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { PageTitle } from "../components/PageTitle";

export function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", address: "" });
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post("/register", formData);
      alert("Conta criada! Faça login.");
      navigate("/");
    } catch (error) { alert("Erro ao cadastrar."); }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ marginBottom: 20 }}>
           <span style={{fontSize: '3rem'}}>📝</span>
        </div>
        <PageTitle title="Crie sua Conta" subtitle="Preencha seus dados para começar" />

        <form onSubmit={handleRegister}>
          <Input 
            label="Nome Completo" 
            placeholder="Ex: João Silva" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
          />
          <Input 
            label="E-mail" 
            placeholder="seu@email.com" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
          />
          <Input 
            label="Endereço Padrão" 
            placeholder="Rua, Número - Bairro" 
            value={formData.address} 
            onChange={e => setFormData({...formData, address: e.target.value})} 
          />
          <Input 
            label="Senha" 
            type="password" 
            placeholder="******" 
            value={formData.password} 
            onChange={e => setFormData({...formData, password: e.target.value})} 
          />
          
          <Button type="submit">CADASTRAR</Button>
        </form>
        
        <p className="mt-20" style={{fontSize: '0.9rem'}}>
            Já tem conta? <Link to="/" style={{color: '#10b981', fontWeight: 'bold'}}>Faça Login</Link>
        </p>
      </div>
    </div>
  );
}
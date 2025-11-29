# 🏆 CamisasFC - E-commerce Full Stack

Projeto final desenvolvido para a disciplina de **Front-End Frameworks** do curso de Sistemas de Informação.

O **CamisasFC** é uma aplicação completa de comércio eletrônico focada em artigos esportivos, utilizando uma arquitetura moderna com separação entre Backend e Frontend, tipagem estática e banco de dados relacional.

---

## 👥 Integrantes do Grupo

* **Lucas Monte Paes Landim** (Matrícula: 01686862)
* **Fernando José Alves Cardoso Filho** (Matrícula: 01621323)
* **Iago Rafael dos Santos** (Matrícula: 01743655)
* **Thierry Vitor Santos Sousa** (Matrícula: 01720764)
* **Nivaldo Maciel Lima Júnior** (Matrícula: 0171401)

**Professor:** Igor
**Disciplina:** Front-End Frameworks

---

## 🚀 Tecnologias Utilizadas

### Backend (API REST)
* **Node.js & Express**: Servidor robusto e escalável.
* **TypeScript**: Segurança de tipos e código limpo.
* **Prisma ORM**: Gerenciamento de banco de dados e migrações.
* **MySQL**: Banco de dados relacional (Tabelas: Users, Products, Orders).
* **Bcrypt & JWT**: Hash de senhas e Autenticação via Token.
* **Arquitetura MVC**: Separação clara entre Model, View e Controller.

### Frontend (SPA)
* **React + Vite**: Performance e componentização.
* **TypeScript**: Interfaces para Props e Estados.
* **React Router Dom**: Navegação entre páginas sem recarregamento.
* **Axios**: Integração com a API.
* **Hooks**: `useState`, `useEffect`, `useMemo`, `useRef`, `useNavigate`.
* **CSS Modules/Global**: Estilização limpa e responsiva.

---

## ⚙️ Funcionalidades Principais

1.  **Autenticação**: Cadastro de usuários com endereço e Login seguro.
2.  **Vitrine de Produtos**: Listagem dinâmica vinda do banco de dados.
3.  **Carrinho de Compras**: Gestão de estado local (LocalStorage).
4.  **Checkout Inteligente**:
    * Escolha entre Delivery (com taxa de frete) ou Retirada.
    * Opção de pagamento (Pix ou Cartão).
    * Cálculo automático de totais (useMemo).
5.  **Área do Cliente**: Histórico de pedidos com status e confirmação de entrega.

---

## 📦 Como Rodar o Projeto

### Pré-requisitos
* Node.js instalado.
* MySQL rodando na porta 3306.

### 1. Configurando o Backend
```bash
cd backend
npm install

# Configure o arquivo .env com sua senha do MySQL:
# DATABASE_URL="mysql://usuario:senha@localhost:3306/camisasfc"

# Cria as tabelas no banco
npx prisma db push

# Popula o banco com produtos iniciais
npx ts-node prisma/seed.ts

# Inicia o servidor
npm run dev

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  onAdd: () => void;
}

export function ProductCard({ image, name, price, onAdd }: ProductCardProps) {
  return (
    <div className="card">
      <img 
        src={`http://localhost:3000/${image}`} 
        alt={name} 
        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/200?text=Sem+Imagem" }}
      />
      <h4>{name}</h4>
      <span className="price">R$ {price.toFixed(2)}</span>
      <button onClick={onAdd} className="btn btn-primary btn-block">Adicionar</button>
    </div>
  );
}
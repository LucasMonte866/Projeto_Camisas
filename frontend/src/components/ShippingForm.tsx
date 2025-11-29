import { Input } from "./Input";

interface ShippingFormProps {
  method: string;
  setMethod: (v: string) => void;
  address: any;
  setAddress: (v: any) => void;
}

export function ShippingForm({ method, setMethod, address, setAddress }: ShippingFormProps) {
  return (
    <div className="card mb-20">
      <h4>🚚 Forma de Envio</h4>
      <div style={{ margin: '15px 0' }}>
        <label style={{ marginRight: 15 }}>
          <input type="radio" name="shipping" value="retirada" checked={method === "retirada"} onChange={e => setMethod(e.target.value)} /> Retirada na Loja
        </label>
        <label>
          <input type="radio" name="shipping" value="delivery" checked={method === "delivery"} onChange={e => setMethod(e.target.value)} /> Delivery (Entrega)
        </label>
      </div>

      {method === "delivery" && (
        <div style={{ animation: 'fadeIn 0.5s' }}>
          <Input label="CEP" placeholder="00000-000" value={address.cep} onChange={e => setAddress({...address, cep: e.target.value})} />
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
            <Input label="Cidade" placeholder="Ex: São Paulo" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
            <Input label="Número" placeholder="123" value={address.number} onChange={e => setAddress({...address, number: e.target.value})} />
          </div>
          <Input label="Complemento" placeholder="Apto, Bloco..." value={address.complement} onChange={e => setAddress({...address, complement: e.target.value})} />
        </div>
      )}
      {method === "retirada" && <p style={{ color: 'green', fontSize: '0.9rem' }}>📍 Endereço da Loja: Av. da Faculdade, 1000 - Bloco C.</p>}
    </div>
  );
}
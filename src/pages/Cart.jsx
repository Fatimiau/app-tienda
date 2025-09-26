// src/pages/Cart.jsx
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, remove, clear, total } = useCart();
  const nav = useNavigate();

  const goCheckout = () => nav("/checkout");

  return (
    <div className="panel">
      <div className="bar">
        <h2>Carrito</h2>
        <span className="badge">#003 Carrito de compras</span>
        <div className="right">
          {items.length > 0 && (
            <button className="btn" onClick={goCheckout}>Ir al checkout</button>
          )}
        </div>
      </div>

      {items.length === 0 && (
        <>
          <p className="small">Tu carrito está vacío.</p>
          <div className="bar" style={{ marginTop: 10 }}>
            <Link className="btn" to="/catalogo">Ir al catálogo</Link>
          </div>
        </>
      )}

      {items.map((it) => (
        <div key={it.id} className="card">
          <img src={it.image} alt={it.name} />
          <div style={{ flex: 1 }}>
            <div className="bar">
              <strong>{it.name}</strong>
              <span className="badge">{it.category}</span>
              <div className="right"><strong>${it.price * it.qty}</strong></div>
            </div>
            <p className="small">Cantidad: {it.qty}</p>
            <div className="bar">
              <button className="btn danger" onClick={() => remove(it.id)}>Eliminar</button>
            </div>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <hr />
          <div className="bar">
            <strong>Total:</strong>
            <div className="right"><strong>${total}</strong></div>
          </div>

          <div className="bar" style={{ marginTop: 10 }}>
            <button className="btn" onClick={goCheckout}>Proceder al pago</button>
            <button className="btn secondary" onClick={clear}>Vaciar carrito</button>
          </div>
        </>
      )}
    </div>
  );
}

// src/pages/Checkout.jsx
import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFlash } from "../context/FlashContext";

const ORDERS_KEY = "tienda:orders";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const { push } = useFlash();
  const nav = useNavigate();

  const [data, setData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    shipping: "standard",
    payment: "card",
    cardNumber: "",
    cardName: "",
    cardExp: "",
    cardCvv: "",
    notes: "",
  });

  const shippingCost = useMemo(() => (data.shipping === "express" ? 199 : 0), [data.shipping]);
  const grandTotal = total + shippingCost;

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  };

  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const required = (...fields) => fields.every((f) => String(f || "").trim().length > 0);

  const placeOrder = (e) => {
    e.preventDefault();

    if (!required(data.fullname, data.email, data.address, data.city, data.zip)) {
      push({ type: "danger", text: "Completa todos los campos obligatorios." });
      return;
    }
    if (!validEmail(data.email)) {
      push({ type: "danger", text: "Correo con formato inválido." });
      return;
    }
    if (data.payment === "card" && !required(data.cardNumber, data.cardName, data.cardExp, data.cardCvv)) {
      push({ type: "danger", text: "Completa los datos de la tarjeta." });
      return;
    }
    if (items.length === 0) {
      push({ type: "warning", text: "Tu carrito está vacío." });
      return;
    }

    // Crear orden mock
    const order = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      items,
      total,
      shipping: data.shipping,
      shippingCost,
      grandTotal,
      customer: {
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        zip: data.zip,
        notes: data.notes,
      },
      payment: data.payment,
    };

    // Guardar en localStorage
    const prev = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...prev]));

    clear();
    push({ type: "success", text: "¡Pedido realizado con éxito!" });
    nav("/checkout/success", { replace: true, state: { orderId: order.id, grandTotal } });
  };

  if (items.length === 0) {
    return (
      <div className="panel">
        <div className="bar">
          <h2>Checkout</h2>
          <span className="badge">#004 Pago y envío</span>
        </div>
        <p className="small">No hay productos en el carrito.</p>
        <div className="bar" style={{ marginTop: 10 }}>
          <Link className="btn" to="/catalogo">Volver al catálogo</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="bar">
        <h2>Checkout</h2>
        <span className="badge">#004 Pago y envío</span>
        <div className="right">
          <Link className="btn secondary" to="/carrito">Volver al carrito</Link>
        </div>
      </div>

      <div className="checkout-grid">
        {/* Formulario */}
        <form onSubmit={placeOrder} className="checkout-form">
          <h3>Datos de envío</h3>
          <div className="row" style={{ gap: 12 }}>
            <input name="fullname" placeholder="Nombre completo *" value={data.fullname} onChange={onChange} />
            <input name="email" placeholder="Correo electrónico *" type="email" value={data.email} onChange={onChange} />
            <input name="phone" placeholder="Teléfono" value={data.phone} onChange={onChange} />
            <input name="address" placeholder="Dirección *" value={data.address} onChange={onChange} />
            <input name="city" placeholder="Ciudad *" value={data.city} onChange={onChange} />
            <input name="zip" placeholder="Código postal *" value={data.zip} onChange={onChange} />
          </div>

          <div className="row" style={{ gap: 12, marginTop: 8 }}>
            <label className="field">
              <span>Método de envío</span>
              <select name="shipping" value={data.shipping} onChange={onChange}>
                <option value="standard">Estándar (gratis)</option>
                <option value="express">Express 24h (+$199)</option>
              </select>
            </label>

            <label className="field">
              <span>Método de pago</span>
              <select name="payment" value={data.payment} onChange={onChange}>
                <option value="card">Tarjeta</option>
                <option value="cash">Contra entrega</option>
              </select>
            </label>
          </div>

          {data.payment === "card" && (
            <>
              <h3 style={{ marginTop: 18 }}>Datos de tarjeta (demo)</h3>
              <div className="row" style={{ gap: 12 }}>
                <input name="cardNumber" placeholder="Número de tarjeta" value={data.cardNumber} onChange={onChange} />
                <input name="cardName" placeholder="Nombre en la tarjeta" value={data.cardName} onChange={onChange} />
                <input name="cardExp" placeholder="MM/AA" value={data.cardExp} onChange={onChange} />
                <input name="cardCvv" placeholder="CVV" value={data.cardCvv} onChange={onChange} />
              </div>
            </>
          )}

          <textarea
            name="notes"
            placeholder="Notas para el repartidor (opcional)"
            value={data.notes}
            onChange={onChange}
            rows={3}
            style={{ marginTop: 12 }}
          />

          <div className="bar" style={{ marginTop: 14 }}>
            <button className="btn" type="submit">Confirmar pedido</button>
            <Link className="btn secondary" to="/catalogo">Seguir comprando</Link>
          </div>
        </form>

        {/* Resumen */}
        <aside className="summary">
          <h3>Resumen</h3>
          <ul className="summary-list">
            {items.map((it) => (
              <li key={it.id}>
                <div className="sum-line">
                  <span>{it.name} <span className="muted">x{it.qty}</span></span>
                  <strong>${it.price * it.qty}</strong>
                </div>
              </li>
            ))}
          </ul>

          <div className="sum-line">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <div className="sum-line">
            <span>Envío</span>
            <span>{shippingCost ? `$${shippingCost}` : "Gratis"}</span>
          </div>
          <hr className="divider" />
          <div className="sum-line total">
            <span>Total a pagar</span>
            <strong>${grandTotal}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}

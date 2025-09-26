// src/pages/CheckoutSuccess.jsx
import { Link, useLocation } from "react-router-dom";

export default function CheckoutSuccess() {
  const loc = useLocation();
  const orderId = loc.state?.orderId;
  const total = loc.state?.grandTotal;

  return (
    <div className="panel">
      <div className="bar">
        <h2>¡Gracias por tu compra!</h2>
        <span className="badge">#005 Confirmación</span>
      </div>

      <p className="small">
        Hemos recibido tu pedido{orderId ? ` (#${orderId})` : ""}.
        {typeof total === "number" ? ` Importe total: $${total}.` : ""}  
        Te enviaremos actualizaciones al correo que registraste.
      </p>

      <div className="bar" style={{ marginTop: 12 }}>
        <Link className="btn" to="/catalogo">Seguir comprando</Link>
        <Link className="btn secondary" to="/carrito">Ver carrito</Link>
      </div>
    </div>
  );
}

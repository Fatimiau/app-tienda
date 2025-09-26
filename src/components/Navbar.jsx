import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useFlash } from "../context/FlashContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { push } = useFlash();
  const nav = useNavigate();

  const count = items.reduce((a, p) => a + p.qty, 0);

  const handleLogout = () => {
    logout();
    push({ type: "success", text: "Sesión cerrada correctamente." });
    nav("/auth");
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand">
          Tienda App
        </NavLink>

        {user && (
          <nav className="navbar__nav">
            <NavLink
              to="/catalogo"
              className={({ isActive }) =>
                "navlink" + (isActive ? " navlink--active" : "")
              }
            >
              Catálogo
            </NavLink>

            <NavLink
              to="/carrito"
              className={({ isActive }) =>
                "navlink" + (isActive ? " navlink--active" : "")
              }
            >
              Carrito <span className="badge">{count}</span>
            </NavLink>
          </nav>
        )}

        <div className="navbar__right">
          {!user ? (
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                "btn btn--ghost" + (isActive ? " is-current" : "")
              }
            >
              Entrar
            </NavLink>
          ) : (
            <>
              <span className="small muted">
                Hola, {user.username || user.email}
              </span>
              <button className="btn btn--ghost" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

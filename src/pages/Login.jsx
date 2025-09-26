import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFlash } from "../context/FlashContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();
  const loc = useLocation();
  const { login } = useAuth();
  const { push } = useFlash();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !pass) {
      push({ type: "danger", text: "Completa correo y contraseña." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      push({ type: "danger", text: "Correo con formato inválido." });
      return;
    }
    if (pass.length < 6) {
      push({ type: "danger", text: "La contraseña debe tener al menos 6 caracteres." });
      return;
    }

    login({ email, username: email.split("@")[0] });
    push({ type: "success", text: "Sesión iniciada correctamente." });

    const to = loc.state?.from?.pathname || "/catalogo";
    nav(to, { replace: true });
  };

  const clear = () => { setEmail(""); setPass(""); };

  return (
    <div className="panel">
      <div className="bar">
        <h2>Iniciar sesión</h2>
        <span className="badge">#001 Gestión de usuarios</span>
        <div className="right">
          <Link to="/auth/register" className="btn secondary">Ir a registro</Link>
        </div>
      </div>

      <form onSubmit={onSubmit} className="row" style={{ marginTop: 10 }}>
        <input
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
        />
        <input
          placeholder="Contraseña"
          value={pass}
          onChange={e => setPass(e.target.value)}
          type="password"
        />

        <div className="bar">
          <button className="btn" type="submit">Entrar</button>
          <button className="btn secondary" type="button" onClick={clear}>Limpiar</button>
        </div>
      </form>
    </div>
  );
}

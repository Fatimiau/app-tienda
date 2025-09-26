import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFlash } from "../context/FlashContext";

export default function Register() {
  // SIN foto de perfil
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");

  const { register } = useAuth();
  const { push } = useFlash();
  const nav = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !pass) {
      push({ type: "danger", text: "Usuario, correo y contraseña son obligatorios." });
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

    // guardamos sin avatar
    register({ username, email, name, birth, gender });
    push({ type: "success", text: "Cuenta creada. ¡Bienvenida/o!" });
    nav("/catalogo", { replace: true });
  };

  return (
    <div className="panel">
      <div className="bar">
        <h2>Registro</h2>
        <span className="badge">#001 Gestión de usuarios</span>
      </div>

      <form onSubmit={onSubmit} className="row" style={{ gap: 14, marginTop: 10 }}>
        <input
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <input
          placeholder="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <input
          placeholder="Fecha de nacimiento"
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Selecciona género</option>
          <option value="F">Femenino</option>
          <option value="M">Masculino</option>
          <option value="O">Otro</option>
        </select>

        <div className="bar">
          <button className="btn" type="submit">
            Crear cuenta
          </button>
          <Link to="/auth" className="btn secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

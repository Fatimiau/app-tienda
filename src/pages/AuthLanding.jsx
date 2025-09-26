import React from "react";
import { Link } from "react-router-dom";

export default function AuthLanding() {
  return (
    <main className="hero">
      <section className="card card--glass">
        <header className="card__header">
          <h1 className="display">Bienvenida/o</h1>
          <span className="chip">#001 Gestión de usuarios</span>
        </header>

        <p className="muted">Elige una opción para continuar.</p>

        <div className="cta">
          <Link className="btn btn--primary" to="/auth/login">
            Iniciar sesión
          </Link>
          <Link className="btn btn--ghost" to="/auth/register">
            Crear cuenta
          </Link>
        </div>

        <hr className="divider" />

        <p className="hint">
          Validaciones y alertas incluidas en los formularios de login/registro.
        </p>
      </section>

      {/* elementos decorativos */}
      <div className="blob blob--1" />
      <div className="blob blob--2" />
    </main>
  );
}

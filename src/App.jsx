// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout / UI
import Navbar from "./components/Navbar";

// Páginas públicas
import AuthLanding from "./pages/AuthLanding.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// Páginas protegidas
import Catalog from "./pages/Catalog.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import CheckoutSuccess from "./pages/CheckoutSuccess.jsx";

// Guard
import RequireAuth from "./components/RequireAuth.jsx";

function NotFound() {
  return (
    <main className="container">
      <h1>Página no encontrada</h1>
      <p className="muted">La ruta que intentaste abrir no existe.</p>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home redirige a /auth */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* Flujo de autenticación (público) */}
        <Route path="/auth" element={<AuthLanding />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/catalogo"
          element={
            <RequireAuth>
              <Catalog />
            </RequireAuth>
          }
        />
        <Route
          path="/carrito"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout/success"
          element={
            <RequireAuth>
              <CheckoutSuccess />
            </RequireAuth>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

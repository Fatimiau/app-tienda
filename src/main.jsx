import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./styles.css";

import { FlashProvider } from "./context/FlashContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Alert from "./components/Alert";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FlashProvider>
        <AuthProvider>
          <CartProvider>
            <Alert />
            <App />
          </CartProvider>
        </AuthProvider>
      </FlashProvider>
    </BrowserRouter>
  </React.StrictMode>
);

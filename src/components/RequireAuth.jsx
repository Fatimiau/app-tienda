import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFlash } from "../context/FlashContext";

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const { push } = useFlash();
  const location = useLocation();

  if (!user) {
    push({ type: "info", text: "Debes iniciar sesión para continuar." });
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
}

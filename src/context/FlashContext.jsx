import { createContext, useCallback, useContext, useState } from "react";

const FlashContext = createContext(null);

export function FlashProvider({ children }) {
  const [flash, setFlash] = useState(null);

  const push = useCallback((msg) => setFlash(msg), []);
  const dismiss = useCallback(() => setFlash(null), []);

  return (
    <FlashContext.Provider value={{ flash, push, dismiss }}>
      {children}
    </FlashContext.Provider>
  );
}

export const useFlash = () => useContext(FlashContext);

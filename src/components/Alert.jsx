import { useEffect } from "react";
import { useFlash } from "../context/FlashContext";

const Icons = {
  success: "M10 15l-3.5-3.5 1.4-1.4L10 12.2l4.6-4.6 1.4 1.4z",
  danger:  "M11 15h2v2h-2zm0-8h2v6h-2z",
  info:    "M11 9h2v8h-2zm0-4h2v2h-2z",
  warning: "M1 21h22L12 2 1 21z",
};

export default function Alert() {
  const { flash, dismiss } = useFlash();

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => dismiss(), 3000);
    return () => clearTimeout(t);
  }, [flash, dismiss]);

  if (!flash) return null;

  const cls = `alert alert-${flash.type}`;

  return (
    <div className="container" style={{ position: "sticky", top: 10, zIndex: 60 }}>
      <div className={cls}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d={Icons[flash.type] || Icons.info} />
        </svg>
        <span>{flash.text}</span>
        <button className="close-btn" onClick={dismiss}>×</button>
      </div>
    </div>
  );
}

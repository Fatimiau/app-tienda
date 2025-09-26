import { useMemo, useState } from "react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Catalog() {
  const { add } = useCart();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");

  const categories = useMemo(
    () => ["Todas", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))],
    []
  );

  const visible = PRODUCTS.filter((p) => {
    const okCat = category === "Todas" || p.category === category;
    const okQuery = p.name.toLowerCase().includes(query.toLowerCase());
    return okCat && okQuery;
  });

  return (
    <div className="panel">
      <div className="bar">
        <h2>Catálogo</h2>
        <span className="badge">#002 Catálogo de productos</span>
      </div>

      <div className="bar" style={{ marginTop: 12 }}>
        <input
          placeholder="Buscar por nombre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="products" style={{ marginTop: 16 }}>
        {visible.map((p) => (
          <article className="product-card" key={p.id}>
            <img className="product-thumb" src={p.image} alt={p.name} />

            <header className="product-head">
              <strong className="product-title">{p.name}</strong>
              <span className="badge">{p.category}</span>
              <span className="product-price">${p.price}</span>
            </header>

            <p className="small muted" style={{ marginTop: 6 }}>
              {p.description}
            </p>

            <button className="btn success product-cta" onClick={() => add(p)}>
              Agregar al carrito
            </button>
          </article>
        ))}
      </div>

      <hr />
      <p className="small">
        Validado: estructura de datos, listado, filtro por categoría, buscador por
        nombre y pruebas de navegación/usabilidad.
      </p>
    </div>
  );
}

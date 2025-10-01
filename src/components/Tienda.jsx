// src/components/Tienda.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../main";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const normalize = (s) => (s ?? "").toString().trim().toLowerCase();
const toTitle = (s) =>
  (s ?? "").toString().trim().replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());

function Tienda() {
  const [categorias, setCategorias] = useState(["Todas"]);
  const [categoria, setCategoria] = useState("Todas");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, "Items"));
        const map = new Map(); 
        snap.forEach(d => {
          const c = d.data().categoryId;
          if (!c) return;
          const key = normalize(c);
          if (!map.has(key)) map.set(key, c.toString().trim());
        });
        const unicas = Array.from(map.values()).sort((a, b) => a.localeCompare(b));
        setCategorias(["Todas", ...unicas]);
      } catch (e) {
        console.error(e);
        setError("Error al cargar categorías");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const baseRef = collection(db, "Items");
        const q = categoria === "Todas"
          ? baseRef
          : query(baseRef, where("categoryId", "==", categoria)); 
        const snap = await getDocs(q);
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setProductos(data);
      } catch (e) {
        console.error(e);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    })();
  }, [categoria]);

  if (loading) return <p>Cargando productos…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tienda">
      <h2>Nuestros productos</h2>

      {/* Filtro */}
      <div className="filtros" style={{ marginBottom: 16 }}>
        <label>
          Filtrar por categoría:{" "}
          <select value={categoria} onChange={e => setCategoria(e.target.value)}>
            {categorias.map(cat => (
              <option key={cat} value={cat}>
                {cat === "Todas" ? "Todas" : toTitle(cat)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {productos.length === 0 ? (
        <p>No hay productos en “{categoria}”.</p>
      ) : (
        <ul className="cards">
          {productos.map((prod) => (
            <li key={prod.id} className="card">
              <ProductCard product={prod}>
                <p className="price">Precio: <strong>${prod.price}</strong></p>
                <small className="category">Categoría: {prod.categoryId}</small>
                <div className="ver-mas">
                  <Link to={`/tienda/${prod.id}`}>Ver más</Link>
                </div>
              </ProductCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tienda;

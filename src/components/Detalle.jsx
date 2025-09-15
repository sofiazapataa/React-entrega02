import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Detalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        if (!cancel) setProducto(data);
      } catch (e) {
        if (!cancel) setError("Error al cargar el producto");
        console.error(e);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [id]);

  if (loading) return <p>Cargando…</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  // función de ejemplo "agregar al carrito"
  const handleComprar = () => {
    alert(`Agregaste "${producto.title}" al carrito 🛒`);
  };

  return (
    <div>
      <Link to="/tienda">← Volver a Tienda</Link>
      <ProductCard product={producto}>
        <p style={{ fontSize: 20, margin: "8px 0" }}>
          <strong>${producto.price}</strong>
        </p>
        <span
          style={{
            display: "inline-block",
            padding: "4px 8px",
            background: "#eef",
            borderRadius: 6,
            fontSize: 12,
            color: "#334",
            marginBottom: 8,
          }}
        >
          {producto.category}
        </span>
        <p style={{ marginTop: 8, color: "#555" }}>{producto.description}</p>

        {/* Botón Comprar */}
        <button
          onClick={handleComprar}
          style={{
            marginTop: 12,
            padding: "10px 16px",
            background: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Comprar
        </button>
      </ProductCard>
    </div>
  );
}

export default Detalle;

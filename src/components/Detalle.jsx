// src/pages/Detalle.jsx (o donde lo tengas)
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
    return () => { cancel = true; };
  }, [id]);

  if (loading) return <p>Cargando…</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  const handleComprar = () => {
    alert(`Agregaste "${producto.title}" al carrito 🛒`);
  };

  return (
    <section className="detalle">
      <Link to="/tienda" className="back-link">← Volver a Tienda</Link>

      <ProductCard product={producto}>
        <p className="price-lg">
          <strong>${producto.price}</strong>
        </p>

        <span className="badge">{producto.category}</span>

        <p className="description">{producto.description}</p>

        <button className="buy-btn" onClick={handleComprar}>
          Comprar
        </button>
      </ProductCard>
    </section>
  );
}

export default Detalle;

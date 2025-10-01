// src/components/Detalle.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../main"; 
import ProductCard from "./ProductCard"; 

function Detalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancel = false;

    (async () => {
      try {
        const docRef = doc(db, "Items", id); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && !cancel) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else if (!cancel) {
          setError("Producto no encontrado");
        }
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

        <span className="badge">{producto.categoryId}</span>

        <p className="description">{producto.descripcion}</p>
        
        <p>Stock disponible: {producto.stock}</p>

        <button className="buy-btn" onClick={handleComprar}>
          Comprar
        </button>
      </ProductCard>
    </section>
  );
}

export default Detalle;

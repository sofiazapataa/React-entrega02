// src/components/Detalle.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../main";
import ProductCard from "./ProductCard";

function Detalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const docRef = doc(db, "Items", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Producto no encontrado");
        }
      } catch (e) {
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const getCartId = () => {
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
      cartId = crypto.randomUUID(); //identificador unico
      localStorage.setItem("cartId", cartId);
    }
    return cartId;
  };

  const handleComprar = async () => {
    try {
      const cartId = getCartId();
      const itemsRef = collection(db, "carritos", cartId, "items");

      const q = query(itemsRef, where("productoId", "==", producto.id));
      const snap = await getDocs(q);

      if (!snap.empty) {
        // si ya existe → aumentamos cantidad
        const docRef = snap.docs[0].ref;
        const currentData = snap.docs[0].data();
        await updateDoc(docRef, { cantidad: currentData.cantidad + 1 });
      } else {
        await addDoc(itemsRef, {
          productoId: producto.id,
          title: producto.title,
          price: producto.price,
          imageURL: producto.imageURL,
          cantidad: 1,
          fecha: new Date(),
        });
      }

      alert(`✅ "${producto.title}" se agregó al carrito`);
    } catch (e) {
      console.error("Error al agregar al carrito:", e);
      alert("❌ No se pudo agregar el producto");
    }
  };

  if (loading) return <p>Cargando…</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="detalle">
      <Link to="/tienda" className="back-link">← Volver</Link>
      <ProductCard product={producto}>
        <p className="price-lg"><strong>${producto.price}</strong></p>
        <p className="description">{producto.descripcion}</p>
        <p>Stock disponible: {producto.stock}</p>
        <button className="buy-btn" onClick={handleComprar}>🛒 Agregar al carrito</button>
      </ProductCard>
    </section>
  );
}

export default Detalle;

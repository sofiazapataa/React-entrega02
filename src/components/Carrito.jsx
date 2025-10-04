// src/components/Carrito.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../main";

export default function Carrito() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarCarrito = async () => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
      setItems([]);
      setLoading(false);
      return;
    }
    const itemsRef = collection(db, "carritos", cartId, "items");
    const snapshot = await getDocs(itemsRef);
    const productos = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    setItems(productos);
    setLoading(false);
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  const eliminarProducto = async (itemId) => {
    const cartId = localStorage.getItem("cartId");
    await deleteDoc(doc(db, "carritos", cartId, "items", itemId));
    cargarCarrito(); 
  };

  if (loading) return <p>Cargando carrito…</p>;
  if (items.length === 0) return <p>🛒 Tu carrito está vacío.</p>;

  const total = items.reduce((acc, item) => acc + item.price * item.cantidad, 0);

  return (
    <section className="carrito">
      <h2>🛍️ Tu Carrito</h2>
      <ul className="carrito-lista">
        {items.map(item => (
          <li key={item.id} className="carrito-item">
            <img src={item.imageURL} alt={item.title} width={80} />
            <div>
              <h3>{item.title}</h3>
              <p>Precio: ${item.price}</p>
              <p>Cantidad: {item.cantidad}</p>
            </div>
            <button onClick={() => eliminarProducto(item.id)}>❌ Eliminar</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
    </section>
  );
}

// src/components/Tienda.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../main";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function Tienda() {
  const [categorias, setCategorias] = useState(["Todas"]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const normalizarCategoria = (str) => {
    if (!str) return "";
    return str.toString().trim().toLowerCase();
  };

  useEffect(() => {
    async function cargarCategorias() {
      try {
        const snapshot = await getDocs(collection(db, "Items"));
        const todas = snapshot.docs
          .map((doc) => normalizarCategoria(doc.data().categoryId))
          .filter(Boolean);

        const unicas = [...new Set(todas)].sort();
        setCategorias(["Todas", ...unicas]);
      } catch (e) {
        console.error(e);
        setError("Error al cargar categorías");
      }
    }
    cargarCategorias();
  }, []);

  useEffect(() => {
    async function cargarProductos() {
      setLoading(true);
      setError("");

      try {
        const itemsRef = collection(db, "Items");
        let consulta = itemsRef;

        if (categoriaSeleccionada !== "Todas") {
          consulta = query(itemsRef, where("categoryId", "==", categoriaSeleccionada.toLowerCase()));
        }

        const snapshot = await getDocs(consulta);
        const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProductos(lista);
      } catch (e) {
        console.error(e);
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    }
    cargarProductos();
  }, [categoriaSeleccionada]);

  const obtenerCarritoId = () => {
    let carritoId = localStorage.getItem("cartId");
    if (!carritoId) {
      carritoId = crypto.randomUUID();
      localStorage.setItem("cartId", carritoId);
    }
    return carritoId;
  };

  const comprarProducto = async (producto) => {
    try {
      const carritoId = obtenerCarritoId();
      const carritoRef = collection(db, "carritos", carritoId, "items");

      const q = query(carritoRef, where("productoId", "==", producto.id));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const docRef = snap.docs[0].ref;
        const datos = snap.docs[0].data();
        await updateDoc(docRef, { cantidad: datos.cantidad + 1 });
      } else {
        await addDoc(carritoRef, {
          productoId: producto.id,
          title: producto.title,
          price: producto.price,
          imageURL: producto.imageURL,
          cantidad: 1,
          fecha: new Date(),
        });
      }

      alert(`✅ "${producto.title}" agregado al carrito`);
    } catch (e) {
      console.error("Error al agregar al carrito:", e);
      alert("No se pudo agregar el producto");
    }
  };

  if (loading) return <p>Cargando productos…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tienda">
      <h2>Nuestros productos</h2>

      <div className="filtros" style={{ marginBottom: "16px" }}>
        <label>
          Filtrar por categoría:{" "}
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>

      {productos.length === 0 ? (
        <p>No hay productos en “{categoriaSeleccionada}”.</p>
      ) : (
        <ul className="cards">
          {productos.map((producto) => (
            <li key={producto.id} className="card">
              <ProductCard product={producto}>
                <p className="price">
                  Precio: <strong>${producto.price}</strong>
                </p>
                <small className="category">
                  Categoría: {producto.categoryId}
                </small>

                <div className="acciones-card">
                  <Link to={`/tienda/${producto.id}`} className="btn-ver-mas">
                    Ver más
                  </Link>

                  <button
                    className="btn-comprar"
                    onClick={() => comprarProducto(producto)}
                  >
                     Comprar
                  </button>
                </div>
              </ProductCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

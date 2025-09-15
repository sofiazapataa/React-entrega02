// src/components/Tienda.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard"; 

function Tienda() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("HTTP " + res.status);

        const data = await res.json();
        setProductos(data); 
      } catch (e) {
        console.error(e);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) return <p>Cargando productos…</p>;
  if (error) return <p>{error}</p>;
  if (productos.length === 0) return <p>No hay productos.</p>; 

  return (
    <div>
      <h2>Nuestros productos</h2>
      <ul className="cards">
        {productos.map((prod) => ( 
          <li key={prod.id} className="card">
            <ProductCard product={prod}>
              <p style={{ margin: 0 }}>
                Precio: <strong>${prod.price}</strong> 
              </p>
              <small style={{ color: "#777" }}>
                Categoría: {prod.category} 
              </small>
              <div style={{ marginTop: 8 }}>
                <Link to={`/tienda/${prod.id}`}>Ver detalle</Link> 
              </div>
            </ProductCard>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tienda;

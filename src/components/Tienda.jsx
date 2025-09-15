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
    <div className="tienda">
      <h2>Nuestros productos</h2>
      <ul className="cards">
        {productos.map((prod) => (
          <li key={prod.id} className="card">
            <ProductCard product={prod} />
            <p className="price">Precio: <strong>${prod.price}</strong></p>
            <small className="category">Categoría: {prod.category}</small>
            <div className="ver-mas">
              <Link to={`/tienda/${prod.id}`}>Ver más</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tienda;

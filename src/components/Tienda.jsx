import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Tienda(){

const [productos, setProductos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
    const fetchProductos= async () =>{
        try{
           const res = await fetch("https://fakestoreapi.com/products")
           if (!res.ok) throw new Error("HTTP " + res.status);
           const data = await res.json();
           setProductos(data);
        }catch (e) {
        setError("Error al cargar los productos");
        console.error(e);
        } finally{
            setLoading(false)
        }
        setProductos()
    }
    fetchProductos();
},[])
    if (loading) return <p>Cargando productos…</p>;
    if (error) return <p>{error}</p>;
     return (
    <div>
      <h2>Nuestros productos</h2>
      <ul className="cards">
        {productos.map((prod) => (
          <li key={prod.id} className="card">
            <ProductCard product={p}>
            <p style={{ margin: 0 }}>
              Precio: <strong>${p.price}</strong>
            </p>
            <small style={{ color: "#777" }}>Categoría: {p.category}</small>
            <div style={{ marginTop: 8 }}>
              <Link to={`/tienda/${p.id}`}>Ver detalle</Link>
            </div>
          </ProductCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Tienda
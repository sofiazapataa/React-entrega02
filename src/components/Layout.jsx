// src/components/Layout.jsx
import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../main";

function Layout() {
  const [totalCarrito, setTotalCarrito] = useState(0);

  useEffect(() => {
    const carritoId = localStorage.getItem("cartId");
    if (!carritoId) return;

    const carritoRef = collection(db, "carritos", carritoId, "items");

    const cancelarEscucha = onSnapshot(carritoRef, (snapshot) => {
      const total = snapshot.docs.reduce(
        (acc, item) => acc + item.data().cantidad,
        0
      );
      setTotalCarrito(total);
    });

    return () => cancelarEscucha();
  }, []);

  return (
    <div className="app">
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/tienda" className="navbar-link">Productos</Link>
          </li>
          <li className="navbar-item">
            <Link to="/nosotros" className="navbar-link">Nosotros</Link>
          </li>
          <li className="navbar-item">
            <Link to="/carrito" className="navbar-link">
              🛒 Carrito{" "}
              {totalCarrito > 0 && (
                <span className="cart-badge">{totalCarrito}</span>
              )}
            </Link>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;

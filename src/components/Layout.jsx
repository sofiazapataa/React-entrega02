import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";


function Layout() {
  return (
    <div className="app">
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/tienda" className="navbar-link">Tienda</Link>
          </li>
          <li className="navbar-item">
            <Link to="/nosotros" className="navbar-link">Nosotros</Link>
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

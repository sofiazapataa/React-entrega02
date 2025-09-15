import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Bienvenidos a nuestra tienda</h1>
      <p>Podras encontrar variedad de talles y colores!</p>
      <Link to="/tienda">
        <button className="btn-primary">Ver Tienda</button>
      </Link>
    </div>
  );
}
export default Home;

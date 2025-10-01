import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Bienvenidos KOSMOS</h1>
      <p>Una tienda de cosmetica natural</p>
      <Link to="/tienda">
        <button className="btn-primary">Ver Productos</button>
      </Link>
    </div>
  );
}
export default Home;

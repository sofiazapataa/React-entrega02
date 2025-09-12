import { Link } from "react-router-dom";

function Home(){
    return(
        <div>
            <h1>Bienvenidos a nuestra tienda</h1>
            <Link to="/tienda">
            <button>Ver Tienda</button>
            </Link>
        </div>
    )
}
export default Home

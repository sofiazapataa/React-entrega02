import { Link, Outlet } from "react-router-dom";

function Layout(){
    return(
        <>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/tienda">Tienda</Link></li>
                <li><Link to="/nosotros">Nosotros</Link></li>
            </ul>
        </nav>
         <Outlet />
        </>
    )
}

export default Layout
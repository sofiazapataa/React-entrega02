// props: product (objeto de la API) y children (bloque personalizable)
function ProductCard({product, children}){
    return(
        <div>
        <img src={product.image} alt={product.title}/>
        <h3>{product.title}</h3>
        {children}
        </div>
    )
}
export default ProductCard
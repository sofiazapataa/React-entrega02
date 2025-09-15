// src/components/ProductCard.jsx
function ProductCard({ product, children }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      {children} 
    </div>
  );
}

export default ProductCard;

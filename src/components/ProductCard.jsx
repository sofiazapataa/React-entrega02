// src/components/ProductCard.jsx
function ProductCard({ product, children }) {
  return (
    <div className="product-card">
      <img src={product.imageURL} alt={product.title} className="product-img" />
      <h3>{product.title}</h3>
      {children} 
    </div>
  );
}

export default ProductCard;

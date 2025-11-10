import Product from "./Product";

export default function ProductList({ products, setSelectedProductId }) {
  return (
    <div className="card-list">
      {products.map((product) => {
        return (
          <Product
            key={product.id}
            product={product}
            setSelectedProductId={setSelectedProductId}
          />
        );
      })}
    </div>
  );
}

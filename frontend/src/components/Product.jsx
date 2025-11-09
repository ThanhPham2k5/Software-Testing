export default function Product({ product, setSelectedProductId }) {
  return (
    <div
      className="card"
      onClick={() => setSelectedProductId(product.id)}
      data-testid="product-container"
    >
      <div className="card-picture">
        <img
          src="/card-picture-img-default.svg"
          alt="card-picture-img"
          className="card-picture-img"
        />
      </div>

      <div className="card-info">
        <div className="card-price">{product.price}</div>

        <div className="card-name">{product.name}</div>

        <div className="card-quantity">
          <img
            src="/card-quantity-ico-black.svg"
            alt="card-quantity-ico"
            className="card-quantity-ico"
          />

          <div className="card-quantity-number">{product.quantity}</div>
        </div>
      </div>
    </div>
  );
}

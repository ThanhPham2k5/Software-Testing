import "../styles/components/DetailBook.css";
import axios from "axios";

function DetailBook({ product, checkShow, checkModify, onDelete }) {
  const imageUrl = `data:image/jpeg;base64,${product.imgBase64}`;

  async function deleteButton() {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/products/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
    );

    onDelete(product.id);
  }

  return (
    <>
      <div className="detail">
        <div className="return-button" onClick={() => checkShow()}>
          <img
            src="/add-return-img.svg"
            alt="return-img"
            className="return-img"
          />

          <div className="return-text">Return</div>
        </div>

        <div className="detail-main">
          <div className="detail-picture">
            <img
              data-testid="detail-img"
              src={imageUrl}
              alt="detail-img"
              className="detail-img"
            />
          </div>

          <div className="detail-body">
            <div className="detail-info">
              <div className="detail-title">{product.name}</div>
              <div className="detail-price">${product.price}</div>
              <div className="detail-quantity">
                <img
                  src="/card-quantity-ico-black.svg"
                  alt="detail-quantity-ico"
                  className="detail-quantity-ico"
                />

                <div className="detail-quantity-number">{product.quantity}</div>
              </div>
              <div className="detail-desc">Description:</div>
              <textarea
                data-testid="desc-product"
                name="desc"
                id="desc"
                className="detail-desc-area"
                value={product.description}
                readOnly
              ></textarea>
            </div>

            <div className="detail-buttons">
              <div className="modify-button" onClick={() => checkModify(true)}>
                <img
                  src="/modify-button-ico.svg"
                  alt="modify-button-ico"
                  className="modify-button-ico"
                />

                <div className="modify-button-text">Modify</div>
              </div>

              <div className="delete-button" onClick={deleteButton}>
                <img
                  src="/delete-button-ico.svg"
                  alt="delete-button-ico"
                  className="delete-button-ico"
                />

                <div className="delete-button-text">Delete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailBook;

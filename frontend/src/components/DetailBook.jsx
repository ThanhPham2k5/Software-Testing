import "../styles/components/DetailBook.css";
import axios from "axios";

function DetailBook({ product, checkShow, checkModify, checkDelete }) {
  async function deleteButton() {
    await axios.delete(`http://localhost:8080/api/products/${product.id}`);
    checkShow();
    checkDelete();
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
              src="/card-picture-img-default.svg"
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

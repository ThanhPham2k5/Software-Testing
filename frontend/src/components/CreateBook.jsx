import { useState } from "react";
import "../styles/components/Createbook.css";

function CreateBook({ checkCreate }) {
  const [valueName, setValueName] = useState("");
  const [valuePrice, setValuePrice] = useState("");
  const [valueQuantity, setValueQuantity] = useState("");
  const [valueDescription, setValueDescription] = useState("");

  const [validName, setValidName] = useState(true);
  const [validPrice, setValidPrice] = useState(true);
  const [validQuantity, setValidQuantity] = useState(true);
  const [validDescription, setValidDescription] = useState(true);

  // function checkInfo() {
  //   if ()
  // }

  return (
    <>
      <div className="create">
        <div className="create-header">
          <div className="header-title">
            <img
              src="/add-title-img.svg"
              alt="add-title-img"
              className="title-img"
            />

            <div className="title-text">Add New Book</div>
          </div>

          <div className="header-buttons">
            <div className="header-return" onClick={() => checkCreate(false)}>
              <img
                src="/add-return-img.svg"
                alt="add-return-img"
                className="return-img"
              />

              <div className="return-text">Return</div>
            </div>

            <div className="header-done">
              <img
                src="/add-done-img.svg"
                alt="add-done-img"
                className="done-img"
              />

              <div className="done-text">Done</div>
            </div>
          </div>
        </div>

        <div className="create-body">
          <div className="create-info">
            <div className="name">
              <label htmlFor="name" className="info-label">
                Name book:
              </label>

              <input
                type="text"
                id="name"
                value={valueName}
                onChange={(e) => setValueName(e.target.value)}
                className="info-input"
              />

              {!validName ? (
                <div className="error">Name is not valid</div>
              ) : null}
            </div>

            <div className="price">
              <label htmlFor="price" className="info-label">
                Price:
              </label>

              <input
                type="number"
                min="1000"
                step="100"
                value={valuePrice}
                onChange={(e) => setValuePrice(e.target.value)}
                id="price"
                className="info-input"
              />

              {!validPrice ? (
                <div className="error">Price is not valid</div>
              ) : null}
            </div>

            <div className="info-group">
              <div className="category">
                <label htmlFor="category" className="info-label">
                  Category:
                </label>

                <select
                  id="category"
                  name="category"
                  className="category-select"
                >
                  <option value="comic" className="category-opt" selected>
                    Comic
                  </option>

                  <option value="manga" className="category-opt">
                    Manga
                  </option>

                  <option value="novel" className="category-opt">
                    Novel
                  </option>
                </select>
              </div>

              <div className="quantity">
                <label htmlFor="quantity" className="info-label">
                  Quantity:
                </label>

                <input
                  type="number"
                  min="1"
                  id="quantity"
                  value={valueQuantity}
                  onChange={(e) => setValueQuantity(e.target.value)}
                  className="info-input"
                />

                {!validQuantity ? (
                  <div className="error">Quantity is not valid</div>
                ) : null}
              </div>
            </div>

            <div className="desc">
              <label htmlFor="desc" className="info-label">
                Description:
              </label>

              <textarea
                type="text"
                id="desc"
                value={valueDescription}
                onChange={(e) => setValueDescription(e.target.value)}
                className="info-input"
              />

              {!validDescription ? (
                <div className="error">Description is not valid</div>
              ) : null}
            </div>
          </div>

          <div className="create-picture">
            <div className="picture-title">Upload Image</div>

            <div className="picture-box">
              {/* first state: no img */}
              <div className="picture-add">
                <img
                  src="/picture-add-ico.svg"
                  alt="picture-add-ico"
                  className="picture-add-ico"
                />
              </div>

              {/* second state: have an img */}
              {/* <img
                src="/card-picture-img-default.svg"
                alt="picture-img"
                className="Picture-img"
              />

              <div className="picture-modify">
                <img
                  src="/picture-modify-ico.svg"
                  alt="picture-modify-ico"
                  className="picture-modify-ico"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBook;

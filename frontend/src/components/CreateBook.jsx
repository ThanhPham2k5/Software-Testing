import { useRef, useState } from "react";
import "../styles/components/Createbook.css";
import { validateProduct } from "../utils/validateProduct/validateProduct";
import axios from "axios";

function CreateBook({ checkCreate, onAdd }) {
  const [valueName, setValueName] = useState("");
  const [valuePrice, setValuePrice] = useState("");
  const [valueQuantity, setValueQuantity] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const [valueCategory, setValueCategory] = useState("COMIC");
  const [selectedImage, setSelectedImage] = useState(null);

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const imageUrl = `data:image/jpeg;base64,${selectedImage}`;

  const handleSave = async () => {
    if (!selectedImage) {
      alert("Please select a photo for the product!");
      return;
    }

    const newProduct = {
      name: valueName,
      price: valuePrice,
      quantity: valueQuantity,
      description: valueDescription,
      category: valueCategory,
      imgBase64: selectedImage,
    };

    const validationErrors = validateProduct(newProduct);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      onAdd(response.data);
      alert("Success add new book");
      checkCreate(false);
    } catch (error) {
      console.error("Lỗi:", error);
      alert("An error has occurred");
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setValueName(newName);

    if (!newName || newName.trim() === "") {
      setErrors((prev) => ({ ...prev, name: "Product name cannot be empty" }));
    } else if (newName.trim().length < 3 || newName.trim().length > 100) {
      setErrors((prev) => ({
        ...prev,
        name: "Product name must be between 3-100 characters",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.name;
        return newErrors;
      });
    }
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setValuePrice(newPrice);

    if (newPrice < 0 || newPrice > 999999999) {
      setErrors((prev) => ({
        ...prev,
        price: "Product price must be between 0-999,999,999 characters",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.price;
        return newErrors;
      });
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setValueQuantity(newQuantity);

    if (newQuantity < 0 || newQuantity > 99999) {
      setErrors((prev) => ({
        ...prev,
        quantity: "Product quantity must be between 0-99,999 characters",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.quantity;
        return newErrors;
      });
    }
  };

  const handleDescriptionChange = (e) => {
    const newVal = e.target.value;
    setValueDescription(newVal);

    const descToCheck = newVal ? newVal.trim() : "";

    if (descToCheck.length > 500) {
      setErrors((prev) => ({
        ...prev,
        description: "Product description cannot exceed 500 characters",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.description;
        return newErrors;
      });
    }
  };

  const handlOpenFileExplorer = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1]; // remove prefix
      setSelectedImage(base64String); // encoded base64 string
    };
    reader.readAsDataURL(file);
  };

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

            <div
              className="header-done"
              onClick={handleSave}
              data-testid="doneBtn"
            >
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
                data-testid="input-name"
                type="text"
                id="name"
                value={valueName}
                onChange={handleNameChange}
                className="info-input"
              />

              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="price">
              <label htmlFor="price" className="info-label">
                Price:
              </label>

              <input
                data-testid="input-price"
                type="number"
                min="1000"
                step="100"
                value={valuePrice}
                onChange={handlePriceChange}
                id="price"
                className="info-input"
              />

              {errors.price && <div className="error">{errors.price}</div>}
            </div>

            <div className="category">
              <label htmlFor="category" className="info-label">
                Category:
              </label>

              <select
                data-testid="select-category"
                id="category"
                name="category"
                className="category-select"
                value={valueCategory}
                onChange={(e) => setValueCategory(e.target.value)}
              >
                <option value="COMIC" className="category-opt">
                  Comic
                </option>

                <option value="MANGA" className="category-opt">
                  Manga
                </option>

                <option value="NOVEL" className="category-opt">
                  Novel
                </option>

                <option value="ROMANCE" className="category-opt">
                  Romance
                </option>

                <option value="NOTEBOOK" className="category-opt">
                  Notebook
                </option>
              </select>
            </div>

            <div className="quantity">
              <label htmlFor="quantity" className="info-label">
                Quantity:
              </label>

              <input
                data-testid="input-quantity"
                type="number"
                min="1"
                id="quantity"
                value={valueQuantity}
                onChange={handleQuantityChange}
                className="info-input"
              />

              {errors.quantity && (
                <div className="error">{errors.quantity}</div>
              )}
            </div>

            <div className="desc">
              <label htmlFor="desc" className="info-label">
                Description:
              </label>

              <textarea
                data-testid="input-description"
                type="text"
                id="desc"
                value={valueDescription}
                onChange={handleDescriptionChange}
                className="info-input"
              />

              {errors.description && (
                <div className="error">{errors.description}</div>
              )}
            </div>
          </div>

          <div className="create-picture">
            <div className="picture-title">Upload Image</div>

            <div
              className="picture-box"
              data-testid="picture-box"
              onClick={handlOpenFileExplorer}
            >
              {/* first state: no img */}
              {!selectedImage && (
                <div className="picture-add">
                  <img
                    src="/picture-add-ico.svg"
                    alt="picture-add-ico"
                    className="picture-add-ico"
                  />
                </div>
              )}

              {/* second state: preview img */}
              {selectedImage && (
                <>
                  <img src={imageUrl} alt="preview" className="Picture-img" />

                  <div className="picture-modify">
                    <img
                      src="/picture-modify-ico.svg"
                      alt="picture-modify-ico"
                      className="picture-modify-ico"
                    />
                  </div>
                </>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              data-testid="image-input"
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBook;

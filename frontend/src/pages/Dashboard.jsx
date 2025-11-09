import { useEffect, useRef, useState } from "react";
import "../styles/pages/Dashboard.css";
import { Link } from "react-router-dom";
import CreateBook from "../components/CreateBook";
import DetailBook from "../components/DetailBook";
import ModifyBook from "../components/ModifyBook";
import axios from "axios";
import ProductList from "../components/ProductList";

const ITEMS_PER_PAGE = 8;

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [userClicked, setUserClicked] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const userRef = useRef(null);
  const [createButton, setCreateButton] = useState(false);
  const [modifyButton, setModifyButton] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);

  // Phan trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [windowStart, setWindowStart] = useState(1);
  const handlePageClick = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Trường hợp đặc biệt: Nếu tổng số trang quá ít (<= 4),
    // chúng ta chỉ hiển thị 1, 2, 3, 4
    if (totalPages <= 4) {
      setWindowStart(1);
      return;
    }

    // 1. Cố gắng giữ currentPage ở giữa (nút thứ 2)
    let newStart = currentPage - 1;

    // 2. Kẹp ở đầu: Không được nhỏ hơn 1
    if (newStart < 1) {
      newStart = 1;
    }

    // 3. Kẹp ở cuối: 3 nút đầu không được chạm vào nút cuối
    // (newStart + 2) là nút thứ 3. Nó phải < totalPages.
    // Vì vậy newStart tối đa là totalPages - 3.
    if (newStart > totalPages - 3) {
      newStart = totalPages - 3;
    }

    // Cập nhật state của "cửa sổ trượt"
    setWindowStart(newStart);
  }, [currentPage, totalPages]);

  const page1 = windowStart;
  const page2 = windowStart + 1;
  const page3 = windowStart + 2;

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  // San pham
  useEffect(() => {
    async function getProductData() {
      const response = await axios.get("http://localhost:8080/api/products", {
        params: {
          page: currentPage - 1,
          size: 8,
        },
      });
      console.log(response.data);
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    }
    getProductData();
  }, [currentPage, deleteButton]);

  function userClick() {
    setUserClicked((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      // avoid null exception of userRef initialization
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserClicked(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    //clean up function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function categoryClick() {
    setShowCategory((prev) => !prev);
  }

  function priceClick() {
    setShowPrice((prev) => !prev);
  }

  return (
    <>
      <div className="dashboard">
        <div className="Header">
          <Link to={"/"} className="Brand">
            <img src="/logo.svg" alt="logo" className="logo-img" />

            <div className="brand-name">gin</div>
          </Link>

          <div className="search-bar">
            <img
              src="/search-bar-ico.svg"
              alt="search-bar-ico"
              className="search-bar-ico"
            />

            <input
              type="text"
              name="searchBar"
              id="searchBar"
              className="search-bar-input"
            />

            <div className="search-bar-button">Search</div>
          </div>

          <div className="user" ref={userRef}>
            <img
              src="/user-img-default.svg"
              alt="user-img-default"
              className="user-img"
              onClick={() => userClick()}
            />

            {userClicked ? (
              <div className="user-option">
                <div className="user-option-name">Admin123</div>

                <Link to={"/"} className="user-option-logout">
                  <img
                    src="/user-option-logout-img.svg"
                    alt="user-option-logout-img"
                    className="user-option-logout-img"
                  />

                  <div className="user-option-logout-name">Log out</div>
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        <div className="Body">
          <div className="filters">
            <div className="filters-name">Filters</div>

            <div className="filters-body">
              <div className="category">
                <div className="category-title" onClick={() => categoryClick()}>
                  <div className="category-name">Categories</div>

                  {showCategory ? (
                    <img
                      src="/category-ico.svg"
                      alt="category-ico"
                      className="category-ico"
                    />
                  ) : (
                    <img
                      src="/category-ico.svg"
                      alt="category-ico"
                      className="category-ico rotate"
                    />
                  )}
                </div>

                {showCategory ? (
                  <div className="category-body">
                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="categories"
                        id="all"
                        defaultChecked
                      />
                      All
                    </label>

                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="categories"
                        id="comic"
                      />
                      Comic
                    </label>

                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="categories"
                        id="manga"
                      />
                      Manga
                    </label>

                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="categories"
                        id="novel"
                      />
                      Novel
                    </label>

                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="categories"
                        id="novel"
                      />
                      Novel
                    </label>

                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="categories"
                        id="novel"
                      />
                      Novel
                    </label>

                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="categories"
                        id="novel"
                      />
                      Novel
                    </label>

                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="categories"
                        id="novel"
                      />
                      Novel
                    </label>
                  </div>
                ) : null}
              </div>

              <div className="price">
                <div className="price-title" onClick={() => priceClick()}>
                  <div className="price-name">Price</div>

                  {showPrice ? (
                    <img
                      src="/price-ico.svg"
                      alt="price-ico"
                      className="price-ico"
                    />
                  ) : (
                    <img
                      src="/price-ico.svg"
                      alt="price-ico"
                      className="price-ico rotate"
                    />
                  )}
                </div>

                {showPrice ? (
                  <div className="price-body">
                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="prices"
                        id="all"
                        defaultChecked
                      />
                      All
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="prices"
                        id="high-to-low"
                      />
                      Highest to lowest
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="prices"
                        id="low-to-high"
                      />
                      Lowest to highest
                    </label>

                    <div className="price-typing">
                      <input
                        type="text"
                        name="price-input"
                        id="price-input"
                        className="price-input"
                      />

                      <div className="price-typing-text">$</div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="content">
            <div
              className="create-button"
              onClick={() => setCreateButton(true)}
            >
              <img
                src="/create-button-ico.svg"
                alt="create-button-ico"
                className="create-button-ico"
              />

              <div className="create-button-name">New Book</div>
            </div>

            <div className="card-body">
              {/* can be replaced with create or view or modify book */}
              {createButton ? (
                <>
                  <CreateBook checkCreate={setCreateButton}></CreateBook>
                </>
              ) : modifyButton ? (
                <>
                  <ModifyBook
                    product={selectedProduct}
                    checkModify={setModifyButton}
                  ></ModifyBook>
                </>
              ) : selectedProductId !== null ? (
                <>
                  <DetailBook
                    products={products}
                    product={selectedProduct}
                    checkShow={() => setSelectedProductId(null)}
                    checkModify={setModifyButton}
                    checkDelete={() =>
                      setDeleteButton((prevValue) => !prevValue)
                    }
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  ></DetailBook>
                </>
              ) : null}
              {!createButton && selectedProductId === null && !modifyButton ? (
                <>
                  <ProductList
                    products={products}
                    setSelectedProductId={setSelectedProductId}
                  />
                  {totalPages > 3 ? (
                    <div className="card-page">
                      <div
                        className={`page-number ${
                          currentPage === page1 ? "page-selected" : ""
                        } prev-page`}
                        onClick={() => handlePageClick(page1)}
                      >
                        {page1}
                      </div>
                      <div
                        className={`page-number ${
                          currentPage === page2 ? "page-selected" : ""
                        } current-page`}
                        onClick={() => handlePageClick(page2)}
                      >
                        {page2}
                      </div>
                      <div
                        className={`page-number ${
                          currentPage === page3 ? "page-selected" : ""
                        } next-page`}
                        onClick={() => handlePageClick(page3)}
                      >
                        {page3}
                      </div>
                      <input
                        type="text"
                        className="input-page"
                        placeholder="..."
                      />
                      <div
                        className={`page-number ${
                          currentPage === totalPages ? "page-selected" : ""
                        } final-page`}
                        onClick={() => handlePageClick(totalPages)}
                      >
                        {totalPages}
                      </div>
                    </div>
                  ) : (
                    <div className="card-page">
                      {totalPages >= 1 ? (
                        <div
                          className={
                            currentPage === 1
                              ? "page-selected prev-page"
                              : "prev-page"
                          }
                          onClick={() => handlePageClick(1)}
                        >
                          1
                        </div>
                      ) : null}

                      {totalPages >= 2 ? (
                        <div
                          className={
                            currentPage === 2
                              ? "page-selected current-page"
                              : "current-page"
                          }
                          onClick={() => handlePageClick(2)}
                        >
                          2
                        </div>
                      ) : null}
                      {totalPages == 3 ? (
                        <div
                          className={
                            currentPage === 3
                              ? "page-selected next-page"
                              : "next-page"
                          }
                          onClick={() => handlePageClick(3)}
                        >
                          3
                        </div>
                      ) : null}
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

import { useEffect, useRef, useState } from "react";
import "../styles/pages/Dashboard.css";
import { Link } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import axios from "axios";

function Dashboard({ setToken }) {
  useEffect(() => {
    document.title = "Dashboard | Flogin";
  }, []);

  const [userClicked, setUserClicked] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [products, setProducts] = useState([]);
  const [filterPrice, setFilterPrice] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [sortOrder, setSortOrder] = useState("DEFAULT");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const userRef = useRef(null);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`,
          {
            params: {
              page: 0,
              size: 1000,
            },
          }
        );
        setProducts(response.data.content);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }
    getAllProducts();
  }, []);

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

  const handlePriceSearch = () => {
    setFilterPrice(priceInput);
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const getProcessedProducts = () => {
    let result =
      selectedCategory === "ALL"
        ? products
        : products.filter((p) => p.category === selectedCategory);

    if (filterPrice !== "") {
      result = result.filter((p) => p.price === parseFloat(filterPrice));
    }

    if (searchTerm !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "HIGH_TO_LOW") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOrder === "LOW_TO_HIGH") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    return result;
  };

  const processedProducts = getProcessedProducts();

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
              placeholder="Search books..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <div className="search-bar-button" onClick={handleSearch}>
              Search
            </div>
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

                <Link
                  to={"/"}
                  className="user-option-logout"
                  onClick={() => {
                    setToken(null);
                    localStorage.removeItem("accessToken");
                  }}
                >
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
                        checked={selectedCategory === "ALL"}
                        defaultChecked
                        value="ALL"
                        onChange={handleCategoryChange}
                      />
                      All
                    </label>

                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="categories"
                        id="comic"
                        value="COMIC"
                        checked={selectedCategory === "COMIC"}
                        onChange={handleCategoryChange}
                      />
                      Comic
                    </label>

                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="categories"
                        id="manga"
                        value="MANGA"
                        checked={selectedCategory === "MANGA"}
                        onChange={handleCategoryChange}
                      />
                      Manga
                    </label>

                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="categories"
                        id="novel"
                        value="NOVEL"
                        checked={selectedCategory === "NOVEL"}
                        onChange={handleCategoryChange}
                      />
                      Novel
                    </label>

                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="categories"
                        id="novel"
                        value="ROMANCE"
                        checked={selectedCategory === "ROMANCE"}
                        onChange={handleCategoryChange}
                      />
                      Romance
                    </label>

                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="categories"
                        id="novel"
                        value="NOTEBOOK"
                        checked={selectedCategory === "NOTEBOOK"}
                        onChange={handleCategoryChange}
                      />
                      Notebook
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
                        value="DEFAULT"
                        checked={sortOrder === "DEFAULT"}
                        onChange={(e) => setSortOrder(e.target.value)}
                      />
                      All
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="prices"
                        id="high-to-low"
                        value="HIGH_TO_LOW"
                        checked={sortOrder === "HIGH_TO_LOW"}
                        onChange={(e) => setSortOrder(e.target.value)}
                      />
                      Highest to lowest
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        className="radio-button"
                        name="prices"
                        id="low-to-high"
                        value="LOW_TO_HIGH"
                        checked={sortOrder === "LOW_TO_HIGH"}
                        onChange={(e) => setSortOrder(e.target.value)}
                      />
                      Lowest to highest
                    </label>

                    <div className="price-typing">
                      <input
                        type="text"
                        name="price-input"
                        id="price-input"
                        className="price-input"
                        placeholder="Enter price ..."
                        value={priceInput}
                        onChange={(e) => setPriceInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handlePriceSearch();
                        }}
                      />

                      <div
                        className="price-typing-text"
                        onClick={handlePriceSearch}
                        style={{ cursor: "pointer" }}
                      >
                        $
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="content">
            <ProductForm
              products={processedProducts}
              setProducts={setProducts}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

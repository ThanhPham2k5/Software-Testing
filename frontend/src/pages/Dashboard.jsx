import { useEffect, useRef, useState } from "react";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [userClicked, setUserClicked] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const userRef = useRef(null);

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
            <div className="create-button">
              <img
                src="/create-button-ico.svg"
                alt="create-button-ico"
                className="create-button-ico"
              />

              <div className="create-button-name">New Book</div>
            </div>

            <div className="card-body">
              {/* can be replaced with create or view book */}
              <div className="card-list">
                {/* example */}
                <div className="card">
                  <div className="card-picture">
                    <img
                      src="/card-picture-img-default.svg"
                      alt="card-picture-img"
                      className="card-picture-img"
                    />
                  </div>

                  <div className="card-info">
                    <div className="card-price">$1,100</div>

                    <div className="card-name">Đắc Nhân Tâm</div>

                    <div className="card-quantity">
                      <img
                        src="/card-quantity-ico-black.svg"
                        alt="card-quantity-ico"
                        className="card-quantity-ico"
                      />

                      <div className="card-quantity-number">120</div>
                    </div>
                  </div>
                </div>

                {/* fake prods */}
                <div className="card">
                  <div className="card-picture">
                    <img
                      src="/card-picture-img-default.svg"
                      alt="card-picture-img"
                      className="card-picture-img"
                    />
                  </div>

                  <div className="card-info">
                    <div className="card-price">$1,100</div>

                    <div className="card-name">Đắc Nhân Tâm</div>

                    <div className="card-quantity">
                      <img
                        src="/card-quantity-ico-black.svg"
                        alt="card-quantity-ico"
                        className="card-quantity-ico"
                      />

                      <div className="card-quantity-number">120</div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-picture">
                    <img
                      src="/card-picture-img-default.svg"
                      alt="card-picture-img"
                      className="card-picture-img"
                    />
                  </div>

                  <div className="card-info">
                    <div className="card-price">$1,100</div>

                    <div className="card-name">Đắc Nhân Tâm</div>

                    <div className="card-quantity">
                      <img
                        src="/card-quantity-ico-black.svg"
                        alt="card-quantity-ico"
                        className="card-quantity-ico"
                      />

                      <div className="card-quantity-number">120</div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-picture">
                    <img
                      src="/card-picture-img-default.svg"
                      alt="card-picture-img"
                      className="card-picture-img"
                    />
                  </div>

                  <div className="card-info">
                    <div className="card-price">$1,100</div>

                    <div className="card-name">Đắc Nhân Tâm</div>

                    <div className="card-quantity">
                      <img
                        src="/card-quantity-ico-black.svg"
                        alt="card-quantity-ico"
                        className="card-quantity-ico"
                      />

                      <div className="card-quantity-number">120</div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-picture">
                    <img
                      src="/card-picture-img-default.svg"
                      alt="card-picture-img"
                      className="card-picture-img"
                    />
                  </div>

                  <div className="card-info">
                    <div className="card-price">$1,100</div>

                    <div className="card-name">Đắc Nhân Tâm</div>

                    <div className="card-quantity">
                      <img
                        src="/card-quantity-ico-black.svg"
                        alt="card-quantity-ico"
                        className="card-quantity-ico"
                      />

                      <div className="card-quantity-number">120</div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-picture">
                    <img
                      src="/card-picture-img-default.svg"
                      alt="card-picture-img"
                      className="card-picture-img"
                    />
                  </div>

                  <div className="card-info">
                    <div className="card-price">$1,100</div>

                    <div className="card-name">Đắc Nhân Tâm</div>

                    <div className="card-quantity">
                      <img
                        src="/card-quantity-ico-black.svg"
                        alt="card-quantity-ico"
                        className="card-quantity-ico"
                      />

                      <div className="card-quantity-number">120</div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-picture">
                    <img
                      src="/card-picture-img-default.svg"
                      alt="card-picture-img"
                      className="card-picture-img"
                    />
                  </div>

                  <div className="card-info">
                    <div className="card-price">$1,100</div>

                    <div className="card-name">Đắc Nhân Tâm</div>

                    <div className="card-quantity">
                      <img
                        src="/card-quantity-ico-black.svg"
                        alt="card-quantity-ico"
                        className="card-quantity-ico"
                      />

                      <div className="card-quantity-number">120</div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-picture">
                    <img
                      src="/card-picture-img-default.svg"
                      alt="card-picture-img"
                      className="card-picture-img"
                    />
                  </div>

                  <div className="card-info">
                    <div className="card-price">$1,100</div>

                    <div className="card-name">Đắc Nhân Tâm</div>

                    <div className="card-quantity">
                      <img
                        src="/card-quantity-ico-black.svg"
                        alt="card-quantity-ico"
                        className="card-quantity-ico"
                      />

                      <div className="card-quantity-number">120</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-page">
                <div className="prev-page page-selected">1</div>

                <div className="current-page">2</div>

                <div className="next-page">3</div>

                <input type="text" className="input-page" placeholder="..." />

                <div className="final-page">36</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

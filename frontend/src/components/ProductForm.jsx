import { Fragment, useState, useEffect } from "react";
import CreateBook from "../components/CreateBook";
import DetailBook from "../components/DetailBook";
import ModifyBook from "../components/ModifyBook";
import axios from "axios";
import ProductList from "../components/ProductList";

export default function ProductForm() {
  const [createButton, setCreateButton] = useState(false);
  const [modifyButton, setModifyButton] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [deleteButton, setDeleteButton] = useState(false);

  // Phan trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [windowStart, setWindowStart] = useState(1);
  const handlePageClick = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    setCurrentPage(pageNumber);
  };

  const page1 = windowStart;
  const page2 = windowStart + 1;
  const page3 = windowStart + 2;

  // San pham
  useEffect(() => {
    async function getProductData() {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          params: {
            page: currentPage - 1,
            size: 8,
          },
        }
      );
      console.log(response.data);
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    }
    getProductData();
  }, [currentPage, deleteButton]);

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

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  return (
    <Fragment>
      <div className="create-button" onClick={() => setCreateButton(true)}>
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
              checkDelete={() => setDeleteButton((prevValue) => !prevValue)}
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
                <input type="text" className="input-page" placeholder="..." />
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
    </Fragment>
  );
}

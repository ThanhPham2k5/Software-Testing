export function validateProduct(product) {
  if (!product.name || product.name.trim() === "") {
    return "Ten san pham rong";
  }
  if (product.quantity < 0 || product.quantity > 99999) {
    return "So luong san pham phai >=0 va <= 99999";
  }
  if (product.price < 0 || product.price > 999999999) {
    return "Gia san pham phai > 0 va <= 999999999";
  }
  if (product.description.trim().length > 500) {
    return "Mo ta san pham qua 500 ki tu";
  }
  if (
    product.category.trim() !== "Manga" &&
    product.category.trim() !== "Comic" &&
    product.category.trim() !== "Novel"
  ) {
    return "Loai sach phai la Manga hoac Comic hoac Novel";
  }
  return "San pham hop le";
}

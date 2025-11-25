export function validateProduct(product) {
  const errors = {};

  if (!product.name || product.name.trim() === "") {
    errors.name = "Product name cannot be empty";
  }

  const quantity = Number(product.quantity);
  if (product.quantity === "" || quantity < 0 || quantity > 99999) {
    errors.quantity = "Product quantity must be between 0 and 99,999";
  }

  const price = Number(product.price);
  if (product.price === "" || price < 0 || price > 999999999) {
    errors.price = "Product price must be between 0 and 999,999,999";
  }

  const desc = product.description ? product.description.trim() : "";
  if (desc.length > 500) {
    errors.description = "Product description cannot exceed 500 characters";
  }

  const validCategories = ["MANGA", "COMIC", "NOVEL", "NOTEBOOK", "ROMANCE"];

  if (!product.category || !validCategories.includes(product.category.trim())) {
    errors.category = "Invalid category";
  }

  return errors;
}

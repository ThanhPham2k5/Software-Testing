export function validateProduct(product) {
  const errors = {};

  if (!product.name || product.name.trim() === "") {
    errors.name = "Product name cannot be empty";
  }

  if(product.name.trim().length < 3 || product.name.trim().length > 100) {
    errors.name = "Product name must be between 3-100 characters"
  }

  const quantity = Number(product.quantity);
  if (product.quantity === "" || quantity < 0 || quantity > 99999) {
    errors.quantity = "Product quantity must be between 0-99,999 characters";
  }

  const price = Number(product.price);
  if (product.price === "" || price <= 0 || price > 999999999) {
    errors.price = "Product price must be between 0-999,999,999 characters";
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

export function getExistingCart() {
  const cart = localStorage.getItem("cartProducts");

  if (!cart) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

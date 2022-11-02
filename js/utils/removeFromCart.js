import { getExistingCart } from "./getCart.js";

export default function removefromCart(item) {
  const id = item.target.dataset.id;

  const currentCart = getExistingCart();

  const newCart = currentCart.filter((item) => item.id !== id);

  saveNewCart(newCart);
}

function saveNewCart(product) {
  localStorage.setItem("cartProducts", JSON.stringify(product));

  location.reload();
}

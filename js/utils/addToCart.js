import { getExistingCart } from "./getCart.js";
import displayMessage from "../components/displayMessage.js";

export default function addToCart() {
  const id = this.dataset.id;
  const title = this.dataset.name;
  const image = this.dataset.image;
  const price = this.dataset.price;

  const cart = getExistingCart();

  const product = { id: id, title: title, image: image, price: price };
  cart.push(product);
  console.log(product);

  saveCart(cart);
}

function saveCart(cart) {
  localStorage.setItem("cartProducts", JSON.stringify(cart));

  displayMessage(
    "success",
    "Product successfully added to cart",
    ".added-to-cart"
  );
}

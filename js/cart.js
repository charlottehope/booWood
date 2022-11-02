import { getExistingCart } from "./utils/getCart.js";
import removefromCart from "./utils/removeFromCart.js";

const cart = getExistingCart();
console.log(cart);

const cartContainer = document.querySelector(".cart");
const priceContainer = document.querySelector(".checkout-container");
const emptyCartContainer = document.querySelector(".empty-cart");

if (cart.length === 0) {
  emptyCartContainer.innerHTML += `<div class="empty-cart">
  <h5>You have not added any products to your cart yet.</h5>
  <a href="products.html"><button class="btn btn-outline-dark shop-now">SHOP NOW</button></a>
  </div>`;
}

let subtotal = 0;

cart.forEach((cartProduct) => {
  subtotal += parseInt(cartProduct.price);
  cartContainer.innerHTML += `<div class="row justify-content-center">
    <div class="col">
      <div class="card mb-3 cart-card">
        <div class="row g-0">
          <div class="col">
            <a href="product-details.html?id=${cartProduct.id}">
            <div class="img-fluid" style="background-image:url(${cartProduct.image})"></div></a>
          </div>
        <div class="col">
          <div class="card-body">
            <a href="product-details.html?id=${cartProduct.id}"><h5 class="card-title">${cartProduct.title}</h5></a>
          </div>
        </div>
        <div class="col">
          <div class="card-body remove-product">
            <i class="fa-solid fa-trash" data-id="${cartProduct.id}"></i>
            <p class="card-text">$${cartProduct.price}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>`;
});

priceContainer.innerHTML += `<div class="col">
            <div class="card mb-3 checkout">
              <div class="row g-0">
                <div class="col">
                  <h3>Subtotal</h3>
                </div>
                <div class="col">
                  <div class="card-body subtotal">
                    <h3 class="card-title">$${subtotal}</h3>
                  </div>
                </div>
                <button class="btn btn-dark checkout-btn" type="submit">CHECK OUT</button>
              </div>
            </div>
          </div>`;

if (cart.length === 0) {
  priceContainer.innerHTML = "";
}

const removeButton = document.querySelectorAll(".remove-product i");

removeButton.forEach((button) => {
  button.addEventListener("click", removefromCart);
});

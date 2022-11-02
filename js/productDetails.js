import { productsUrl } from "./settings/api.js";
import addToCart from "./utils/addToCart.js";
import displayMessage from "./components/displayMessage.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
  document.location.href = "/products.html";
}

const productID = productsUrl + "/" + id;

console.log(productID);

(async function () {
  try {
    const response = await fetch(productID);
    const details = await response.json();

    document.title = "booWood | " + details.title;

    const container = document.querySelector(".details-container");

    container.innerHTML += `<nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">HOME</a></li>
            <li class="breadcrumb-item"><a href="products.html">ALL PRODUCTS</a></li>
            <li class="breadcrumb-item active" aria-current="page">${details.title}</li>
          </ol>
        </nav>
        <br>
        <div class="added-to-cart"></div>
  <div class="row">
        <div class="col-md">
  <div class="product-photo" style="background-image:url(${details.image_url})"></div>
  </div>
  <div class="col-md">
          <div class="product-info">
            <h1>${details.title}</h1>
            <p>$${details.price}</p>
          </div>
          <form class="order">
          <button class="btn btn-dark add-to-cart" type="button" data-id="${details.id}" data-name="${details.title}" data-image="${details.image_url}" data-price="${details.price}">ADD TO CART</button>
        </form>
        
        <div class="product-information">
          <h5>Product information</h5>
          <p>${details.title}</p>
          <p>${details.description}</p>
        </div>
        </div>
        </div>
        </div>`;

    console.log(details);
  } catch (error) {
    displayMessage(
      "warning",
      "Failed to load product details",
      ".details-container"
    );
  }

  const addToCartButton = document.querySelectorAll(".add-to-cart");
  addToCartButton.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
})();

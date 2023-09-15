import { productsUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import { baseUrl } from "./settings/api.js";

const container = document.querySelector(".product-container");
const search = document.querySelector(".product-search");

(async function () {
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();

    console.log(products);

    let productsToRender = products;

    function renderProducts() {
      container.innerHTML = "";
      productsToRender.forEach(function (product) {
        container.innerHTML += `<div class="col">
              <div class="card products-card">
                <a href="product-details.html?id=${product.id}"><div class="card-img-top products-card-img-top" style="background-image:url(${baseUrl}${product.image.url})"></div></a>
                <div class="card-body">
                  <a href="product-details.html?id=${product.id}"><h4>${product.title}</h4></a>
                    <p class="card-text">
                      $${product.price}
                    </p>
                </div>
              </div>
            </div>`;
      });
    }

    renderProducts();

    search.onkeyup = function () {
      const searchValue = event.target.value.trim().toLowerCase();

      const filteredProducts = products.filter(function (product) {
        if (product.title.toLowerCase().match(searchValue)) {
          return true;
        }
      });

      productsToRender = filteredProducts;

      renderProducts();
    };
  } catch (error) {
    console.log(error);
    displayMessage("warning", "Failed to load products", ".product-container");
  }
})();

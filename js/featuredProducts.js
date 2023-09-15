import { productsUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import { baseUrl } from "./settings/api.js";

const container = document.querySelector(".carousel-inner");

async function getFeaturedProducts() {
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();

    const featuredProducts = products.filter(function (product) {
      if (product.featured === true) {
        return true;
      }
    });

    console.log(featuredProducts);

    for (let i = 0; i < featuredProducts.length; i++) {
      const activeClass = i === 0 ? "active" : "";

      container.innerHTML += `<div class="carousel-item ${activeClass}">
      <div class="col">
    <div class="card carousel-card">
                <a href="product-details.html?id=${featuredProducts[i].id}"><div class="card-img-top carousel-card-img-top" style="background-image:url(${baseUrl}${featuredProducts[i].image.url})"></div></a>
                <div class="card-body">
                  <a href="product-details.html?id=${featuredProducts[i].id}"><h4>${featuredProducts[i].title}</h4></a>
                  <p class="card-text">
                    $${featuredProducts[i].price}
                  </p>
                </div>
              </div>
              </div>
              </div>`;
    }

    let items = document.querySelectorAll(".carousel .carousel-item");

    items.forEach((element) => {
      const minPerSlide = 4;
      let next = element.nextElementSibling;
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          next = items[0];
        }
        let cloneChild = next.cloneNode(true);
        element.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
      }
    });
  } catch (error) {
    displayMessage(
      "warning",
      "Failed to load featured products",
      ".featured-products"
    );
  }
}
getFeaturedProducts();

// Reference: "Bootstrap 5 - Multi Item Carousel". 2022. Codeply.Com. https://www.codeply.com/p/0CWffz76Q9.

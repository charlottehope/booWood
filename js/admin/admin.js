import displayMessage from "../components/displayMessage.js";
import { productsUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import { baseUrl } from "../settings/api.js";
import logoutButton from "../components/logoutButton.js";
import { getUsername } from "../utils/storage.js";

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featured = document.querySelector("#btn-check-outlined");
const image = document.querySelector("#image");
const message = document.querySelector(".message-container");
const container = document.querySelector(".product-container");

logoutButton();

const username = getUsername();

if (!username) {
  location.href = "login.html";
}

// ADD PRODUCTS
form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const featuredValue = featured.checked;
  const imageValue = image.value.trim();

  if (
    titleValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    descriptionValue.length === 0 ||
    imageValue.length === 0
  ) {
    return displayMessage("danger", "Invalid input", ".message-container");
  }

  addProduct(
    titleValue,
    priceValue,
    descriptionValue,
    featuredValue,
    imageValue
  );

  console.log("titleValue", titleValue);
  console.log("priceValue", priceValue);
  console.log("descriptionValue", descriptionValue);
  console.log("featuredValue", featuredValue);
  console.log("imageValue", imageValue);
}

async function addProduct(title, price, description, featured, image) {
  const url = baseUrl + "/products";

  console.log("url", url);

  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    featured: featured,
    image_url: image,
  });

  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);

    if (json.created_at) {
      form.reset();
      return displayMessage(
        "success",
        "Product successfully added",
        ".message-container"
      );
    }
    if (json.error) {
      return displayMessage(
        "danger",
        "Please log in to add products",
        ".message-container"
      );
    }
  } catch (error) {
    console.log(error);
    displayMessage("danger", "An error occurred", ".message-container");
  }
}

// SHOW PRODUCTS TO EDIT
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
                <a href="edit-product.html?id=${product.id}"><div class="card-img-top products-card-img-top" style="background-image:url(${baseUrl}${product.image.url})"></div></a>
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
  } catch (error) {
    console.log(error);
    displayMessage("warning", "Failed to load products", ".product-container");
  }
})();

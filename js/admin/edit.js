import { productsUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import displayMessage from "../components/displayMessage.js";
import deleteButton from "../components/deleteButton.js";
import logoutButton from "../components/logoutButton.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

logoutButton();

if (!id) {
  document.location.href = "/admin.html";
}

const productID = productsUrl + "/" + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featured = document.querySelector("#btn-check-outlined");
const image = document.querySelector("#image");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const breadcrumb = document.querySelector(".breadcrumb");

(async function () {
  try {
    const response = await fetch(productID);
    const details = await response.json();

    document.title = "booWood | Edit " + details.title;

    breadcrumb.innerHTML += `<nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="admin.html">ALL PRODUCTS</a></li>
            <li class="breadcrumb-item active" aria-current="page">${details.title}</li>
          </ol>
        </nav>`;

    title.value = details.title;
    price.value = details.price;
    description.value = details.description;
    featured.checked = details.featured;
    image.value = details.image_url;
    idInput.value = details.id;

    deleteButton(details.id);
  } catch (error) {
    console.log(error);
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const featuredValue = featured.checked;
  const imageValue = image.value.trim();
  const idValue = idInput.value;

  if (
    titleValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    descriptionValue.length === 0 ||
    imageValue.length === 0
  ) {
    return displayMessage("warning", "Invalid input", ".message-container");
  }

  updateProduct(
    titleValue,
    priceValue,
    descriptionValue,
    featuredValue,
    imageValue,
    idValue
  );
}

async function updateProduct(title, price, description, featured, image, id) {
  const url = productsUrl + "/" + id;
  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    featured: featured,
    image_url: image,
  });

  const token = getToken();

  const options = {
    method: "PUT",
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

    if (json.updated_at) {
      return displayMessage(
        "success",
        "Product successfully updated",
        ".message-container"
      );
    }
    if (json.error) {
      return displayMessage(
        "danger",
        "Please login to update products",
        ".message-container"
      );
    }
  } catch (error) {
    console.log(error);
  }
}

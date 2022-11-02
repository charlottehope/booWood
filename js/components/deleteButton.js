import { productsUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";

export default function deleteButton(id) {
  const container = document.querySelector(".delete-product");

  container.innerHTML += `<button type="button" class="btn btn-outline-dark delete-btn">
                            DELETE PRODUCT
                            </button>`;

  const button = document.querySelector(".delete-btn");

  button.onclick = async function () {
    console.log(id);

    const deleteProduct = confirm(
      "Are you sure you want to delete this product?"
    );
    console.log(deleteProduct);

    if (deleteProduct) {
      const url = productsUrl + "/" + id;
      const token = getToken();
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        location.href = "admin.html";

        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
  };
}

import { baseUrl } from "./settings/api.js";
import { heroUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";

(async function () {
  try {
    const response = await fetch(heroUrl);
    const photo = await response.json();

    const container = document.querySelector(".hero");

    container.innerHTML += `<div class="hero-image" style="background-image:url(${baseUrl}${photo.hero_banner.formats.medium.url})">
          <div class="hero-text drop-shadow-text">
            <h3>NOW INTRODUCING</h3>
            <h2>Fall Collection <br />2022</h2>
            <a href="products.html"
              ><button class="btn btn-light">SHOP NOW</button></a
            >
          </div>
        </div>`;
  } catch (error) {
    displayMessage("warning", "Failed to load hero banner", ".hero");
  }
})();

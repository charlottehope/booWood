import displayMessage from "./displayMessage.js";

export default function logoutButton() {
  const container = document.querySelector(".logout");

  container.innerHTML += `<a href="#"><i class="fa-solid fa-right-from-bracket logout-btn"></i></a>`;

  const logoutBtn = document.querySelector(".logout-btn");

  logoutBtn.onclick = async function () {
    const logout = confirm("Are you sure you want to log out?");
    console.log(logout);

    if (logout) {
      displayMessage(
        "success",
        "Logged out successfully",
        ".message-container"
      );
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      location.href = "/index.html";
    }
  };
}

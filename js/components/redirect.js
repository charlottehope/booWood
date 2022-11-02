import { getUsername } from "../utils/storage.js";
export default function redirect() {
  const username = getUsername();
  console.log(username);

  if (username) {
    location.href = "admin.html";
  }
}

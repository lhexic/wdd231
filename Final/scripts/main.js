import { setWayfinding, handleLastVisit } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  setWayfinding();
  handleLastVisit();

  const hamburger = document.querySelector("#hamburger");
  const nav = document.querySelector("nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});
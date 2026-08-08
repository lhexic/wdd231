import { setWayfinding, handleLastVisit } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  setWayfinding();
  handleLastVisit();
  initDirectory();

  const hamburger = document.querySelector("#hamburger");
  const nav = document.querySelector("nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});

async function initDirectory() {
  const container = document.querySelector("#directory-container");
  const filterSelect = document.querySelector("#category-filter");
  const modal = document.querySelector("#resource-modal");
  const modalDetails = document.querySelector("#modal-details");
  const closeModal = document.querySelector("#close-modal");

  if (!container) return;

  try {
    const response = await fetch("data/resources.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const resources = await response.json();
    renderCards(resources, container);

    if (filterSelect) {
      filterSelect.addEventListener("change", (e) => {
        const category = e.target.value;
        const filtered = category === "all" 
          ? resources 
          : resources.filter(item => item.category === category);
        renderCards(filtered, container);
      });
    }

    container.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const id = Number(e.target.dataset.id);
        const item = resources.find(r => r.id === id);
        if (item) {
          modalDetails.innerHTML = `
            <h2>${item.icon} ${item.title}</h2>
            <p style="margin-top: 0.5rem;"><strong>Category:</strong> ${item.category}</p>
            <p style="margin-top: 0.5rem;"><strong>Description:</strong> ${item.description}</p>
            <p style="margin-top: 1rem;"><a href="${item.url}" target="_blank" rel="noopener">Visit Web Resource &rarr;</a></p>
          `;
          modal.showModal();
        }
      }
    });

    if (closeModal) {
      closeModal.addEventListener("click", () => modal.close());
    }

  } catch (error) {
    console.error("Failed to load resources:", error);
    container.innerHTML = `<p class="error">Unable to load developer resources at this time.</p>`;
  }
}

function renderCards(items, container) {
  container.innerHTML = items.map(item => `
    <article class="card">
      <div>
        <h3><span>${item.icon}</span> ${item.title}</h3>
        <span class="category">${item.category}</span>
        <p>${item.description}</p>
      </div>
      <button data-id="${item.id}">View Details</button>
    </article>
  `).join("");
}
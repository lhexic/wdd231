import { items } from '../data/items.mjs';

document.addEventListener('DOMContentLoaded', () => {
  displayVisitMessage();
  renderCards(items);
  updateFooterInfo();
});

// 1. Visit Counter Message (localStorage)
function displayVisitMessage() {
  const messageEl = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('chamber_last_visit');
  const now = Date.now();

  if (!lastVisit) {
    messageEl.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDiffMs = now - parseInt(lastVisit, 10);
    const msInDay = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor(timeDiffMs / msInDay);

    if (daysBetween < 1) {
      messageEl.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      messageEl.textContent = "You last visited 1 day ago.";
    } else {
      messageEl.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }

  // Update last visit timestamp
  localStorage.setItem('chamber_last_visit', now.toString());
}

// 2. Render 8 Cards with specific grid-area assignments
function renderCards(itemList) {
  const container = document.querySelector('.discover-grid');
  container.innerHTML = '';

  itemList.forEach((item) => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.style.gridArea = item.id; // Assigns grid area matching named grid areas in CSS

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button" class="learn-btn">Learn More</button>
    `;

    container.appendChild(card);
  });
}

// 3. Populate Footer Year and Last Modified
function updateFooterInfo() {
  const yearEl = document.getElementById('year');
  const modifiedEl = document.getElementById('lastModified');

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modifiedEl) modifiedEl.textContent = `Last Modified: ${document.lastModified}`;
}
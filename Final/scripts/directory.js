// Resources array matching your filter options
const resources = [
  {
    name: "MDN Web Docs",
    category: "Development Tools",
    icon: "🌐",
    description: "Comprehensive documentation for Web standards, HTML5, CSS3, and JavaScript.",
    url: "https://developer.mozilla.org"
  },
  {
    name: "GitHub",
    category: "Development Tools",
    icon: "🐙",
    description: "Cloud-based hosting service for software development and version control using Git.",
    url: "https://github.com"
  },
  {
    name: "CSS-Tricks",
    category: "Design & CSS",
    icon: "🎨",
    description: "Daily articles about CSS, HTML, JavaScript, and web design/development.",
    url: "https://css-tricks.com"
  },
  {
    name: "Stack Overflow",
    category: "Community",
    icon: "💬",
    description: "A public platform serving 100 million developers to learn and share technical knowledge.",
    url: "https://stackoverflow.com"
  },
  {
    name: "PageSpeed Insights",
    category: "Performance",
    icon: "⚡",
    description: "Analyze your web page performance and receive actionable recommendations.",
    url: "https://pagespeed.web.dev"
  },
  {
    name: "Unsplash",
    category: "Media",
    icon: "📷",
    description: "Beautiful, free images and photos that you can download and use for any project.",
    url: "https://unsplash.com"
  }
];

// DOM Selectors
const directoryContainer = document.querySelector("#directory-container");
const filterSelect = document.querySelector("#category-filter");
const modal = document.querySelector("#resource-modal");
const modalContent = document.querySelector("#modal-content");
const closeModal = document.querySelector("#close-modal");

// Render cards function
function renderCards(data) {
  if (!directoryContainer) return;
  directoryContainer.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "resource-card";

    // Store item data as JSON string in data-resource attribute
    const jsonString = JSON.stringify(item).replace(/'/g, "&apos;");

    card.innerHTML = `
      <h3>${item.icon || ''} ${item.name}</h3>
      <p>${item.description}</p>
      <button class="details-btn primary-btn" data-resource='${jsonString}'>View Details</button>
   `;

    directoryContainer.appendChild(card);
  });
}

// Display Modal function
function displayModal(resource) {
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <h2>${resource.icon || ''} ${resource.name}</h2>
    <p><strong>Category:</strong> ${resource.category}</p>
    <p><strong>Description:</strong> ${resource.description}</p>
    <p><a href="${resource.url}" target="_blank" rel="noopener">Visit Web Resource &rarr;</a></p>
  `;

  modal.showModal();
}

// Filter Event Listener matching your select option values
if (filterSelect) {
  filterSelect.addEventListener("change", (e) => {
    const selected = e.target.value;
    if (selected === "all" || selected === "All Categories") {
      renderCards(resources);
    } else {
      const filtered = resources.filter(
        (res) => res.category.toLowerCase() === selected.toLowerCase()
      );
      renderCards(filtered);
    }
  });
}

// Event Delegation for "View Details" buttons inside container
if (directoryContainer) {
  directoryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("details-btn")) {
      const resourceData = JSON.parse(e.target.dataset.resource);
      displayModal(resourceData);
    }
  });
}

// Close Modal Event Listener
if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.close();
  });
}

// Close Modal when clicking outside the dialog backdrop
if (modal) {
  modal.addEventListener("click", (e) => {
    const dialogBounds = modal.getBoundingClientRect();
    if (
      e.clientX < dialogBounds.left ||
      e.clientX > dialogBounds.right ||
      e.clientY < dialogBounds.top ||
      e.clientY > dialogBounds.bottom
    ) {
      modal.close();
    }
  });
}

// Initial render on page load
renderCards(resources);
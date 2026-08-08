export function setWayfinding() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav a");
  
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

export function handleLastVisit() {
  const lastVisitDisplay = document.querySelector("#last-visit");
  if (!lastVisitDisplay) return;

  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    lastVisitDisplay.textContent = "Welcome! This is your first visit.";
  } else {
    const daysAgo = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    lastVisitDisplay.textContent = daysAgo < 1 
      ? "Welcome back! You last visited today." 
      : `Welcome back! Last visit: ${daysAgo} day(s) ago.`;
  }

  localStorage.setItem("lastVisit", now.toString());
}
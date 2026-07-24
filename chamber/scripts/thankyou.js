document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.getElementById("results");

  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.has("fname") && !urlParams.has("email")) {
    resultsContainer.innerHTML = "<p>No submission data found. Please submit the application form first.</p>";
    return;
  }

  // Format timestamp if available
  let rawDate = urlParams.get("timestamp");
  let formattedDate = rawDate ? new Date(rawDate).toLocaleString() : "N/A";

  resultsContainer.innerHTML = `
    <h3>Submitted Application Summary</h3>
    <p><strong>First Name:</strong> ${urlParams.get("fname") || "N/A"}</p>
    <p><strong>Last Name:</strong> ${urlParams.get("lname") || "N/A"}</p>
    <p><strong>Email Address:</strong> ${urlParams.get("email") || "N/A"}</p>
    <p><strong>Mobile Phone:</strong> ${urlParams.get("phone") || "N/A"}</p>
    <p><strong>Business / Organization:</strong> ${urlParams.get("organization") || "N/A"}</p>
    <p><strong>Membership Level:</strong> ${(urlParams.get("membership") || "N/A").toUpperCase()}</p>
    <p><strong>Submission Timestamp:</strong> ${formattedDate}</p>
  `;
});
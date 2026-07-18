// Footer Timestamps
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;

// Mobile Nav Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// --- OpenWeatherMap API Implementation ---
const weatherKey = 'b2d1b1c1906dbb2bf494172ea37a98bd'; 
const lat = '5.6037'; // Accra, Ghana latitude
const lon = '-0.1870'; // Accra, Ghana longitude
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${weatherKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeatherData(data);
        } else {
            console.error("Weather response issue:", response.statusText);
        }
    } catch (error) {
        console.error("Weather API connection failure:", error);
    }
}

function displayWeatherData(data) {
    const weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.innerHTML = ""; 

    // Extract current metrics (first index slot)
    const current = data.list[0];
    const tempNow = Math.round(current.main.temp);
    const desc = current.weather[0].description;

    const currentContainer = document.createElement('div');
    currentContainer.innerHTML = `<p><strong>Current Temperature:</strong> ${tempNow}°C</p>
                                  <p class="tagline" style="text-transform: capitalize;">Condition: ${desc}</p><br>`;
    weatherDisplay.appendChild(currentContainer);

    // Build Forecast Tracker Element
    const forecastHeader = document.createElement('h4');
    forecastHeader.textContent = "3-Day Local Forecast:";
    weatherDisplay.appendChild(forecastHeader);

    // Filter index data array (step by 8 items for roughly 24-hour increments)
    let count = 0;
    for (let i = 8; i < data.list.length && count < 3; i += 8) {
        const dayData = data.list[i];
        const dayTemp = Math.round(dayData.main.temp);
        const dayDate = new Date(dayData.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
        
        const forecastItem = document.createElement('p');
        forecastItem.innerHTML = `${dayDate}: <strong>${dayTemp}°C</strong> - ${dayData.weather[0].description}`;
        weatherDisplay.appendChild(forecastItem);
        count++;
    }
}

// --- Filtered Member Spotlights Implementation ---
const membersUrl = 'data/members.json';

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data);
        }
    } catch (error) {
        console.error("Error connecting to members file:", error);
    }
}

function displaySpotlights(members) {
    const wrapper = document.getElementById('spotlight-wrapper');
    wrapper.innerHTML = "";

    // Filter out Bronze (level 1) members, leaving only Silver (2) and Gold (3)[cite: 2]
    const eligibleMembers = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

    // Shuffle profiles randomly
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

    // Pull either 2 or 3 items randomly
    const selectedCount = Math.floor(Math.random() * 2) + 2; 
    const chosenSpotlights = shuffled.slice(0, selectedCount);

    chosenSpotlights.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-inner-card');

        let levelLabel = member.membershipLevel === 3 ? "Gold Member" : "Silver Member";

        card.innerHTML = `
            <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p class="member-level level-${member.membershipLevel}">${levelLabel}</p>
            <p class="tagline">${member.description}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Corporate Site</a>
        `;
        wrapper.appendChild(card);
    });
}

// Fire async runtime scripts
fetchWeather();
fetchSpotlights();
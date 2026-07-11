// Dynamic Footer Data
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;

// Navigation Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Grid/List View Selection Layout Switcher
const container = document.getElementById('directory-container');
const gridBtn = document.getElementById('grid-view-btn');
const listBtn = document.getElementById('list-view-btn');

gridBtn.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

// Fetch Member Details Asynchronously
const membersUrl = 'data/members.json';

async function getMembers() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error("Failed to fetch data:", response.statusText);
        }
    } catch (error) {
        console.error("Error connecting to members file:", error);
    }
}

function displayMembers(members) {
    container.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement('section');
        const logo = document.createElement('img');
        const name = document.createElement('h3');
        const tagline = document.createElement('p');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const websiteLink = document.createElement('a');
        const membership = document.createElement('p');

        name.textContent = member.name;
        tagline.textContent = member.description;
        tagline.classList.add('tagline');
        address.textContent = member.address;
        phone.textContent = member.phone;

        websiteLink.href = member.website;
        websiteLink.textContent = "Visit Website";
        websiteLink.target = "_blank";

        let levelText = "Member";
        if (member.membershipLevel === 2) levelText = "Silver Member";
        if (member.membershipLevel === 3) levelText = "Gold Member";
        membership.textContent = levelText;
        membership.classList.add('member-level', `level-${member.membershipLevel}`);

        logo.setAttribute('src', `images/${member.image}`);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(membership);
        card.appendChild(tagline);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(websiteLink);

        container.appendChild(card);
    });
}

getMembers();
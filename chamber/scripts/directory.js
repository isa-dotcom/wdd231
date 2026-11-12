
/* ========================================
   CAUCAIA CONNECT
   BUSINESS DIRECTORY - JAVASCRIPT
======================================== */

// SELECT HTML ELEMENTS
const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");


// LOAD MEMBERS FROM JSON
async function getMembers() {

    membersContainer.setAttribute("aria-busy", "true");

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {

        console.error("Error loading members:", error);

        membersContainer.textContent =
            "Sorry! The business directory could not be loaded.";

        membersContainer.classList.add("error-message");

    } finally {

        membersContainer.setAttribute("aria-busy", "false");

    }
}


// DISPLAY MEMBERS ON THE PAGE
function displayMembers(members) {

    // CLEAR PREVIOUS CONTENT
    membersContainer.replaceChildren();

    members.forEach((member, index) => {

        // CREATE MEMBER CARD
        const card = document.createElement("article");
        card.classList.add("member-card");

        // COMPANY IMAGE
        const image = document.createElement("img");

        image.src = `images/${member.image}`;
        image.alt = `${member.companyName} business`;

        // Reserve image dimensions
        image.width = 600;
        image.height = 400;

        // Load the first image immediately
        // Load the remaining images when needed
        image.loading = index === 0 ? "eager" : "lazy";

        image.decoding = "async";

        if (index === 0) {
            image.fetchPriority = "high";
        }

        // COMPANY NAME
        const name = document.createElement("h3");
        name.textContent = member.companyName;

        // MEMBERSHIP LEVEL
        const membership = document.createElement("span");

        membership.classList.add("membership-level");

        if (member.membershipLevel === 1) {
            membership.textContent = "Member";
        } else if (member.membershipLevel === 2) {
            membership.textContent = "Silver Member";
        } else if (member.membershipLevel === 3) {
            membership.textContent = "Gold Member";
        } else {
            membership.textContent = "Member";
        }

        // COMPANY DESCRIPTION
        const description = document.createElement("p");
        description.textContent = member.description;

        // COMPANY ADDRESS
        const address = document.createElement("p");
        address.textContent = member.address;

        // COMPANY PHONE
        const phone = document.createElement("p");
        phone.textContent = member.phone;

        // COMPANY WEBSITE
        const website = document.createElement("a");

        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";

        // ADD ELEMENTS TO CARD
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(membership);
        card.appendChild(description);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        // ADD CARD TO MEMBERS CONTAINER
        membersContainer.appendChild(card);

    });

}


// GRID VIEW
gridButton.addEventListener("click", () => {

    membersContainer.classList.remove("list");
    membersContainer.classList.add("grid");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");

});


// LIST VIEW
listButton.addEventListener("click", () => {

    membersContainer.classList.remove("grid");
    membersContainer.classList.add("list");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");

});


// MOBILE NAVIGATION
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});


// FOOTER - CURRENT YEAR
const currentYear = document.querySelector("#current-year");

currentYear.textContent = new Date().getFullYear();


// FOOTER - LAST MODIFICATION
const lastModified = document.querySelector("#last-modified");

lastModified.textContent = document.lastModified;


// LOAD DIRECTORY
getMembers();

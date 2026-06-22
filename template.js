document.addEventListener("DOMContentLoaded", () => {

    updateThemeColours()

    // ==========================
    // Active Navigation Link
    // ==========================
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-list a").forEach(link => {
        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    // ==========================
    // Theme Toggle Button
    // ==========================
    const themeButton = document.createElement("button");
    themeButton.textContent = "🌙 Dark Mode";
    themeButton.classList.add("theme-btn");

    document.querySelector(".site-header").appendChild(themeButton);

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeButton.textContent = "☀️ Light Mode";
    }

    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        if (document.body.classList.contains("light-theme")) {
            localStorage.setItem("theme", "light");
            themeButton.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("theme", "dark");
            themeButton.textContent = "🌙 Dark Mode";
        }
        updateThemeColours()
    });

    // ==========================
    // Auto Update Copyright Year
    // ==========================
    const copyright = document.querySelector(".footer-copy");

    if (copyright) {
        copyright.innerHTML =
            `&copy; ${new Date().getFullYear()} PiXELL River Financial. All rights reserved.`;
    }

    // ==========================
    // Last Updated Information
    // ==========================
    const footer = document.querySelector(".site-footer");

    const updateInfo = document.createElement("p");

    updateInfo.textContent =
        `Last visited: ${new Date().toLocaleString()}`;

    footer.appendChild(updateInfo);

    // ==========================
    // Welcome Message
    // ==========================
    const welcomeMessage = document.createElement("p");

    welcomeMessage.textContent =
        "Welcome to the PiXELL River Financial Community Support Tracker.";

    welcomeMessage.classList.add("welcome-message");

    document.querySelector("main").prepend(welcomeMessage);

});

function updateThemeColours(){
    //updates theme colours to match local storage key value
    if (localStorage.getItem("theme") === "light") {
            //sets css current colours to light mode variables
            document.documentElement.style.setProperty('--background-colour','var(--light-background-colour)');
            document.documentElement.style.setProperty('--text-colour','var(--light-text-colour)');
            document.documentElement.style.setProperty('--accent-colour','var(--light-accent-colour)');
        } 
    else {
        //sets css current colours to dark mode variables
        document.documentElement.style.setProperty('--background-colour','var(--dark-background-colour)')
        document.documentElement.style.setProperty('--text-colour','var(--dark-text-colour)')
        document.documentElement.style.setProperty('--accent-colour','var(--dark-accent-colour)');
    }
}

// ==========================
// Navigation Menu Toggle
// ==========================
const menuButton = document.createElement("button");
menuButton.textContent = "☰ Menu";
menuButton.classList.add("menu-btn");

// Insert button before navigation
const nav = document.querySelector(".site-nav");
if (nav){
    nav.parentNode.insertBefore(menuButton, nav);
}
// Hide navigation by default on small screens
if (window.innerWidth <= 768) {
    nav.style.display = "none";
}

// Toggle navigation visibility
menuButton.addEventListener("click", () => {
    if (nav.style.display === "none") {
        nav.style.display = "block";
        menuButton.textContent = "✖ Close";
    } else {
        nav.style.display = "none";
        menuButton.textContent = "☰ Menu";
    }
});

// Handle screen resizing
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        nav.style.display = "block";
    } else {
        nav.style.display = "none";
        menuButton.textContent = "☰ Menu";
    }
});
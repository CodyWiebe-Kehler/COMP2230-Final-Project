document.addEventListener("DOMContentLoaded", () => {

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
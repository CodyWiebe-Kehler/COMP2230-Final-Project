// Create a theme toggle button
const button = document.createElement("button");
button.textContent = "Toggle Theme";
document.body.prepend(button);

// Toggle theme when button is clicked
button.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
});

// Set default theme
document.body.classList.add("dark-mode");
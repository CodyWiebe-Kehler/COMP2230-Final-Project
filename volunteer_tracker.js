
// CLOSE MENU WHEN LINK IS CLICKED

const navLinks = document.querySelectorAll(".nav-list a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navList.classList.remove("active");
    });
});

// VOLUNTEER FORM

const form = document.getElementById("volunteer-form");
const entriesDiv = document.getElementById("entries");

// Load previous records
let entries =
    JSON.parse(localStorage.getItem("volunteerEntries")) || [];

// Display records when page loads
window.onload = renderEntries;

// Only attach listener if the form exists
if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const charity =
            document.getElementById("charity").value;

        const hours =
            document.getElementById("hours").value;

        const date =
            document.getElementById("date").value;

        const rating =
            document.getElementById("rating").value;

        const entry = {
            charity,
            hours,
            date,
            rating
        };

        entries.push(entry);

        localStorage.setItem(
            "volunteerEntries",
            JSON.stringify(entries)
        );

        form.reset();

        renderEntries();

    });

}
// DISPLAY ENTRIES
function renderEntries(){

    entriesDiv.innerHTML = "";

    if(entries.length === 0){

        entriesDiv.innerHTML =
            "<p>No volunteer records found.</p>";
        return;
    }
    entries.forEach((entry,index)=>{

        const div =
            document.createElement("div");

        div.classList.add("entry");

        div.innerHTML = `
            <h3>${entry.charity}</h3>
            <p><strong>Hours:</strong> ${entry.hours}</p>
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Experience Rating:</strong> ${entry.rating}/5</p>

            <button onclick="deleteEntry(${index})">
                Delete Record
            </button>
        `;
        entriesDiv.appendChild(div);
    });
}

// DELETE RECORD
function deleteEntry(index){
    entries.splice(index,1);
    localStorage.setItem(
        "volunteerEntries",
        JSON.stringify(entries)
    );
    renderEntries();
}

// const {
//     setCookie,
//     getCookie
// } = require("./volunteer_tracker");


// ====================
// COOKIE FUNCTIONS
// ====================

// Create a cookie
function setCookie(name, value, days) {

    let expires = "";

    if (days) {

        const date = new Date();

        date.setTime(
            date.getTime() + (days * 24 * 60 * 60 * 1000)
        );

        expires = "; expires=" + date.toUTCString();
    }

    document.cookie =
        name + "=" + value + expires + "; path=/";
}

// Read a cookie
function getCookie(name) {

    const cookieName = name + "=";

    const cookieArray = document.cookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {

        let cookie = cookieArray[i].trim();

        if (cookie.indexOf(cookieName) === 0) {

            return cookie.substring(cookieName.length);
        }
    }

    return "";
}

// Save last visit information
window.addEventListener("load", () => {

    const lastVisit = getCookie("lastVisit");

    if (lastVisit !== "") {

        console.log(
            "Previous visit: " + lastVisit
        );
    }

    setCookie(
        "lastVisit",
        new Date().toLocaleString(),
        30
    );

});

// Export functions for Jest testing
if (typeof module !== "undefined") {

    module.exports = {
        setCookie,
        getCookie,
        renderEntries,
        deleteEntry
    };

}
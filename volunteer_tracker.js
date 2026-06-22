
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

const {
    setCookie,
    getCookie
} = require("./volunteer_tracker");


describe("Cookie Functions", () => {

    beforeEach(() => {

        document.cookie = "";

    });


    test("should set a cookie", () => {

        setCookie(
            "username",
            "Kavya",
            1
        );

        expect(
            getCookie("username")
        ).toBe("Kavya");

    });

});


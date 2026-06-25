// get the form element
const form = document.getElementById("event-signup-form");
const formStatus = document.getElementById("form-status");

/**
 * Save signups array to localStorage
 * @param {Array} signups - contain array of signup objects
 */
function saveSignupsToLocalStorage(signups) {
    localStorage.setItem("eventSignups", JSON.stringify(signups));
}

/**
 * Load signups array to localStorage
 */
function loadSignupsFromLocalStorage() {
    const data = localStorage.getItem("eventSignups");
    return data ? JSON.parse(data) : [];
}

/**
 * Fill the table with signup data from localStorage
 * @param {Array} signups - array of signup objects to display in the table
 */
function displaySignupsTable() {
    // get the table body element where rows will be added
    const tbody = document.getElementById("signups-tbody");
    const signups = loadSignupsFromLocalStorage();

    // clear all existing rows from the table
    tbody.innerHTML = "";

    // loop throught each signup and create a table row for it 
    signups.forEach((signup, index) => {
        // create a new table row element
        const row = document.createElement("tr");

        // add the signup data and delete button to the row
        row.innerHTML = `
            <td>${signup.eventName}</td>
            <td>${signup.repName}</td > 
            <td>${signup.repEmail}</td>
            <td>${signup.role}</td>
            <td>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </td>
        `;

        // add the row to the table body
        tbody.appendChild(row);
    });

    // add a deletion button in each table row
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            deleteSignups(index);
        });
    });
}

/**
 * Delete a signup by index
 */
function deleteSignups(index) {
    const signups = loadSignupsFromLocalStorage();

    // confirmation of deleting the button
    if (confirm("Are you sure you want to delete this signup?")) {
        signups.splice(index, 1);

        saveSignupsToLocalStorage(signups);

        displaySignupsTable();

        showUpcomingEventsSummary();
    }
}

/**
 * Validate the event name field that is not empty
 * @param {string} eventName - to validate the event name
 * @returns {boolean} - True if event name is valid, otherwise false
 */
function isValidEventName(eventName) {
    return eventName.trim().length > 0;
}

/**
 * Validate the representative name field that is not empty
 * @param {string} repName - to validate the representative name
 * @returns {boolean} - True if representative name is valid, otherwise false
 */
function isValidRepName(repName) {
    return repName.trim().length > 0;
}

// Email validation regex
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate the email format field using the regex pattern
 * @param {string} email - to validate the email address
 * @returns {boolean} - True if email matches the emailPattern, otherwise false
 */
function isValidEmail(email) {
    return emailPattern.test(email.trim());
}

/**
 * Validate that a role has been selected
 * @param {string} role - the selected role value
 * @returns {boolean} - True if role is selected, otherwise false
 */
function isValidRole(role) {
    return role.length > 0;
}

/**
 * Get the form values from the DOM
 * @returns {object} - object that contain the eventName, repName, repEmail, and role
 */
function getFormValues() {
    const formValues = {
        eventName: document.getElementById("event-name").value,
        repName: document.getElementById("rep-name").value,
        repEmail: document.getElementById("rep-email").value,
        role: document.getElementById("role-selection").value
    };
    return formValues;
}

// a function to clear the errors
function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(message => {
        message.style.display = "none";
    });
}

// a function to display error for a specific field
function showError(fieldId) {
    const formGroup = document.getElementById(fieldId);
    const errorMessages = formGroup.querySelector(".error-message");
    if (errorMessages) {
        errorMessages.style.display = "block";
    }
}

// calculate role breakdown
function calculateRoleBreakdown() {
    const signups = loadSignupsFromLocalStorage();

    const breakdown = {
        sponsor: 0,
        participant: 0,
        organizer: 0

    };

    // count each 
    signups.forEach(signup => {
        if (breakdown.hasOwnProperty(signup.role)) {
            breakdown[signup.role]++;
        }
    });

    return breakdown;
}

// render the upcoming events summary
function showUpcomingEventsSummary() {
    const breakdown = calculateRoleBreakdown();

    let summarySection = document.getElementById("summary-section");
    
    if(!summarySection) {
    summarySection = document.createElement("section");
    summarySection.id = "summary-section";
    document.querySelector("main").appendChild(summarySection);

    }

    summarySection.innerHTML = `
        <h2>Upcoming Event Summary</h2>
        <div class="summary-stats">
            <div class="stat-card">
                <h3>Sponsors</h3>
                <p class="stat-number">${breakdown.sponsor}</p>
            </div>
            <div class="stat-card">
                <h3>Participants</h3>
                <p class="stat-number">${breakdown.participant}</p>
            </div>
            <div class="stat-card">
                <h3>Organizers</h3>
                <p class="stat-number">${breakdown.organizer}</p>
            </div>
        </div>
    `;
}

function initializePage() {
    displaySignupsTable();
    showUpcomingEventsSummary();
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("event-signup-form");
    const formStatus = document.getElementById("form-status");

    // form submission handler
    form.addEventListener("submit", function (event) {
        event.preventDefault();


        clearErrors();

        let isValid = true;

        // temporary store data object
        const formValues = getFormValues();

        // validate event name
        if (!isValidEventName(formValues.eventName)) {
            showError("group-event-name");
            isValid = false;
        }

        // validate representative name
        if (!isValidRepName(formValues.repName)) {
            showError("group-rep-name");
            isValid = false;
        }

        // validate email 
        if (!isValidEmail(formValues.repEmail)) {
            showError("group-rep-email");
            isValid = false;
        }

        // validate role selection
        if (!isValidRole(formValues.role)) {
            showError("group-role");
            isValid = false;
        }

        if (isValid) {
            // get existing signups from localStorage
            const signups = loadSignupsFromLocalStorage();

            // add new signup to the array
            signups.push(formValues);

            // save updated array back to localStorage
            saveSignupsToLocalStorage(signups);

            // display success message
            formStatus.textContent = "Form submitted successfully!";
            formStatus.style.color = "#2e7d32";

            form.reset();
            displaySignupsTable();
            showUpcomingEventsSummary();
        } else {
            // display error message
            formStatus.textContent = "Please correct the errors above";
            formStatus.style.color = "#c0392b"
        }
    });
    // initialize the page when it loads
    initializePage();
});

// exports the method to be accessed by a node module
module.exports = { 
    getFormValues, 
    isValidEventName, 
    isValidRepName, 
    isValidEmail, 
    isValidRole, 
    displaySignupsTable, 
    loadSignupsFromLocalStorage, 
    calculateRoleBreakdown, 
    showUpcomingEventsSummary, 
    deleteSignups
};
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
            const signups =loadSignupsFromLocalStorage();

            // add new signup to the array
            signups.push(formValues);

            // save updated array back to localStorage
            saveSignupsToLocalStorage(signups);

            // display success message
            formStatus.textContent = "Form submitted successfully!";
            formStatus.style.color = "#2e7d32";

            form.reset();
        } else {
            // display error message
            formStatus.textContent = "Please correct the errors above";
            formStatus.style.color = "#c0392b"
        }
    });
});

// exports the method to be accessed by a node module
module.exports = { getFormValues, isValidEventName, isValidRepName, isValidEmail, isValidRole };


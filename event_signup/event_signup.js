import "../template.js"

// get the form element
const form = document.getElementById("event-signup-form");
const formStatus = document.getElementById("form-status");

// a function to validate the Event Name
function isValidEventName(eventName) {
    return eventName.trim().length > 0;
}

// a function to validate the Company Representative's Name
function isValidRepName(repName) {
    return repName.trim().length > 0;
}

// Email validation regex
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// a function to validate the Representative's email
function isValidEmail(email) {
    return email.test(email.trim());
}

// a function to validate the role at the event
function isValidRole(role) {
    return role.length > 0;
}

// a function that collect the form values
function formValues() {
    const formValues = {
        eventName: document.getElementById("event-name").value,
        repName: document.getElementById("rep-name").value,
        repEmail: document.getElementById("rep-email").value,
        role: document.getElementById("role-selection").value
    };
    return formValues;
}

// a function to collect form value
function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(message => {
        message.computedStyleMap.display = "none";
    });
}

// a function to display error for a specific field
function showError(fieldId) {
    const formGroup = document.querySelectorAll(".error-message");
    const errorMessages = formGroup.querySelector(".error-message");
    if (errorMessages) {
        errorMessages.style.display = "block";
    }
}


// form submission handler
form.addEventListener("submit", function(event) {
    event.preventDefault();

    clearErrors();

    formValues();

    let isValid = true;

// validate event name
if (!isValidEventName(formValues.eventName)) {
    showError("group-event-name");
    isValidEventName = false;
}

// validate representative name
if (!isValidRepName(formValues.repName)) {
    showError("group-rep-name");
    isValidRepName = false;
}

// validate email 
if (!isValidEmail(formValues.repEmail)) {
    showError("group-rep-email");
    isValidEmail = false;
}

// validate role selection
if (!isValidRole(formValues.role)) {
    showError("group-role");
    isValidRole = false;
}

if (isValid) {
    // display success message
    formStatus.textContent = "Form submitted successfully!";
    formStatus.style.color = "#2e7d32";

    // console.log("Form value are collected:", formValue);
} else {
    // display error message
    formStatus.textContent = "Please coorect the errors above";
    formStatus.style.color = "#c0392b"
}
});
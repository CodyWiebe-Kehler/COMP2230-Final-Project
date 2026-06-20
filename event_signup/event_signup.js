import "../template.js";

// get the form element
const form = document.getElementById("event-signup-form");

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

// a function to collect form value
function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(message => {
        message.computedStyleMap.display = "none";
    });
}

// a function that collect the form values
function formValues() {
    const formValues = {
        eventName = document.getElementById("event-name").value,
        repName = document.getElementById("rep-name").value,
        repEmail = document.getElementById("rep-email").value,
        role = document.getElementById("role-selection").value
    };
    return formValues;
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
})

// validate event name
if (!validateEventName(formValues.eventName)) {
    showError("group-event-name");
    isValidEventName = false;
}

// validate representative name
if (!validateRepName(formValues.repName)) {
    showError("group-rep-name");
    isValidRepName = false;
}

// validate email 
if (!validateEmail(formValues.repEmail)) {
    showError("group-rep-email");
    isValidEmail = false;
}

// validate role selection
if (!validateRole(formValues.role)) {
    showError("group-role");
    isValidEmail = false;
}
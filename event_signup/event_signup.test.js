/**
 * jest test script copied from template
 * 
 * @author Mina Liang
 * @version 1.0.1
 */

const fs = require("fs");
const path = require("path");

// reads the HTML the script thats being tested works with
const html = fs.readFileSync(path.resolve(__dirname,"./event_signup.html"), "utf-8")

//import methods we need for testing
// const {updateThemeColours} = require("./template.js"); //imports functions from our script
// const { testEnvironment } = require("./jest.config.js"); //imports dependancy functions from jest.config.js
// const { addUncaughtExceptionCaptureCallback } = require("process");

//executes before each test in the module
beforeEach(() => {
    // mount the HTML content to the virtual DOM
    document.documentElement.innerHTML = html.toString();
    // load the form script - run after DOM is ready
    require("./event_signup.js")
    // manually trigger DOMContentLoaded event since jsdom doesn't fire it automatically
    document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true }));
});

// Integration Test 1
/**
 * test that submitting the form 
 * updates the temporary data object correctly
 */

describe("Test Validation for Event Signup Form Submission", () => {

    test("should display success message when form is submitted with valid information", () => {
    // Arrange - set up the variables, inputs, or configurations
    const eventNameInput = document.getElementById("event-name");
    const repNameInput = document.getElementById("rep-name");
    const repEmailInput = document.getElementById("rep-email");
    const roleSelect = document.getElementById("role-selection");
    const form = document.getElementById("event-signup-form");
    const formStatus = document.getElementById("form-status");

    // Act - execute the target logic
    eventNameInput.value = "Wife-Carrying World Championship";
    repNameInput.value = "Sanna-Mari Nuutinen";
    repEmailInput.value = "sannamari_k@hotmail.com";
    roleSelect.value = "organizer";

    form.dispatchEvent(new Event("submit", {bubbles: true}));

    // Assert - validate the outcome matches expectations
    expect(formStatus.textContent).toBe("Form submitted successfully!");
    expect(formStatus.style.color).toBe("rgb(46, 125, 50)"); // hex #2e7d32 converts to rgb
    });
});


// Integration Test 2
/**
 * test that submitting the form 
 * with invalid email format
 */

describe("Test Validation Error for Email Format", () => {

    test("should display error message for invalid email format", () => {

    // Arrange - set up the variables, inputs, or configurations
    const eventNameInput = document.getElementById("event-name");
    const repNameInput = document.getElementById("rep-name");
    const repEmailInput = document.getElementById("rep-email");
    const roleSelect = document.getElementById("role-selection");
    const form = document.getElementById("event-signup-form");

    // Act - execute the target logic
    eventNameInput.value = "Wife-Carrying World Championship";
    repEmailInput.value = "Sanna-Mari Nuutinen";
    repEmailInput.value = "sannamari_kotmail.com";
    roleSelect.value = "Organizer";

    form.dispatchEvent(new Event("submit", {bubbles: true}));

    // Assert - validate the outcome matches expectations
    const emailError = document.querySelector("#group-rep-email .error-message");
    expect(emailError.style.display).toBe("block")
    });
});
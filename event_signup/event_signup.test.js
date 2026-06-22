/**
 * jest test script copied from template
 * 
 * @author Mina Liang
 * @version 1.0.1
 */

const fs = require("fs");
const path = require("path");
// imports method from event_signup.js script
const { getFormValues, isValidEventName, isValidEmail, isValidRepName, isValidRole } = require("./event_signup.js")

// reads the HTML the script thats being tested works with
const html = fs.readFileSync(path.resolve(__dirname, "./event_signup.html"), "utf-8")

//executes before each test in the module
beforeEach(() => {
    // mount the HTML content to the virtual DOM
    document.documentElement.innerHTML = html.toString();
    // load the form script - run after DOM is ready
    require("./event_signup.js")
    // manually trigger DOMContentLoaded event since jsdom doesn't fire it automatically
    document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true }));
});

/**
 * Integration Test 1
 * test that submitting the form 
 * updates the temporary data object correctly
 */

describe("Test Validation for Event Signup Form Submission", () => {

    test("should display success message when form is submitted with valid information", () => {
        // Arrange - set up the variables
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

        form.dispatchEvent(new Event("submit", { bubbles: true }));

        // Assert - validate the outcome matches expectations
        expect(formStatus.textContent).toBe("Form submitted successfully!");
        expect(formStatus.style.color).toBe("rgb(46, 125, 50)"); // hex #2e7d32 converts to rgb
    });
});
 
/**
 * Integration Test 2
 * test that submitting the form 
 * with invalid email format
 */

describe("Test Validation Error for Email Format", () => {

    test("should display error message for invalid email format", () => {

        const eventNameInput = document.getElementById("event-name");
        const repNameInput = document.getElementById("rep-name");
        const repEmailInput = document.getElementById("rep-email");
        const roleSelect = document.getElementById("role-selection");
        const form = document.getElementById("event-signup-form");

    
        eventNameInput.value = "Wife-Carrying World Championship";
        repNameInput.value = "Sanna-Mari Nuutinen";
        repEmailInput.value = "sannamari_kotmail.com";
        roleSelect.value = "organizer";

        form.dispatchEvent(new Event("submit", { bubbles: true }));

        const emailError = document.querySelector("#group-rep-email .error-message");
        expect(emailError.style.display).toBe("block")
    });
});


/**
 * Unit Test 1
 * test the function for validating required fields
 */

describe("Validation Function Unit Tests", () => {

    // Test for event name fields (empty values)
    describe("isValidEventName - Required Field Validation", () => {

        test("should return false for empty event name", () => {

            const result = isValidEventName("");
            expect(result).toBe(false);
        });
    });

    // Test for representative name (required filed)
    describe("isValidRepName - Required Field Validation", () => {

        test("should return false for empty rep name", () => {

            const result = isValidRepName("");
            expect(result).toBe(false);
        });
    });

    // Test for empty email (required filed)
    describe("isValidEmail - Format Validation", () => {

        test("should return false for empty email", () => {

            const result = isValidEmail("");
            expect(result).toBe(false);
        });
    });

    // Test for email format (required filed)
    describe("isValidEmail - Format Validation", () => {

        test("should return false for invalid email format", () => {

            const result = isValidEmail("sannamari_kotmail.com");
            expect(result).toBe(false);
        });
    });

    // Test for role selection (required)
    describe("isValidRole - Required Filed Validation", () => {

        test("should return false for empty role", () => {
            const result = isValidRole("");
            expect(result).toBe(false);
        })
    });
});


/**
 * Unit Test 2
 * test the getFromValues() that will returns correct data structure
 */

describe("Data Processing - getFromValues Function", () => {
    test("should return correct data object with valid form inputs", () => {

        const eventNameInput = document.getElementById("event-name");
        const repNameInput = document.getElementById("rep-name");
        const repEmailInput = document.getElementById("rep-email");
        const roleSelect = document.getElementById("role-selection");

        eventNameInput.value = "Wife-Carrying World Championship";
        repNameInput.value = "Sanna-Mari Nuutinen";
        repEmailInput.value = "sannamari_kotmail.com";
        roleSelect.value = "organizer";

        
        const formData = getFormValues();

        expect(formData.eventName).toBe("Wife-Carrying World Championship");
        expect(formData.repName).toBe("Sanna-Mari Nuutinen");
        expect(formData.repEmail).toBe("sannamari_kotmail.com");
        expect(formData.role).toBe("organizer");
    });
}); 
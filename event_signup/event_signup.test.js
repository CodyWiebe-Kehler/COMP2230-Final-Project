/**
 * jest test script copied from template
 * 
 * @author Mina Liang
 * @version 1.0.1
 */

const fs = require("fs");
const path = require("path");
// imports method from event_signup.js script
const { 
    getFormValues, 
    isValidEventName, 
    isValidEmail, 
    isValidRepName, 
    isValidRole, 
    displaySignupsTable,
    loadSignupsFromLocalStorage, 
    calculateRoleBreakdown, 
    showUpcomingEventsSummary, deleteSignups } = require("./event_signup.js");
const { table } = require("console");
const { json } = require("stream/consumers");

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
    // clear localStorage before each test
    localStorage.clear();
});

/**
 * Integration Test 1 - Stage One
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
 * Integration Test 2 - Stage One
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
 * Unit Test 1 - Stage One
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
 * Unit Test 2 - Stage One
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

/**
 * Integration Test 1 - Stage Two
 * test that the event signup updates correctly 
 * after data is added to localStorage
 */

describe("localStorage Integration Tests - Event Signup Table", () => {

    test("should update the table correctly when data is added to localStorage", () => {
        // Arrange - set up the variables
        const testSignupData = [
            {
                eventName: "Wife-Carrying World Championship",
                repName: "Sanna-Mari Nuutinen",
                repEmail: "sannamari_k@hotmail.com",
                role: "organizer"

            },
            {
                eventName: "Husband-Carrying World Championship",
                repName: "Robert Nuutinen",
                repEmail: "robert_n@hotmail.com",
                role: "participant"
            }
        ]

        // Act - add data directly to localStorage
        localStorage.setItem("eventSignups", JSON.stringify(testSignupData));
        // trigger the display function to populate the table
        displaySignupsTable();

        // Assert
        const rows = document.querySelectorAll("#signups-tbody tr");
        expect(rows.length).toBe(2);

        // check the first row of content
        expect(rows[0].cells[0].textContent).toBe("Wife-Carrying World Championship");
        expect(rows[0].cells[1].textContent).toBe("Sanna-Mari Nuutinen");
        expect(rows[0].cells[2].textContent).toBe("sannamari_k@hotmail.com");
        expect(rows[0].cells[3].textContent).toBe("organizer");

        // check the second row of content
        expect(rows[1].cells[0].textContent).toBe("Husband-Carrying World Championship");
        expect(rows[1].cells[1].textContent).toBe("Robert Nuutinen");
        expect(rows[1].cells[2].textContent).toBe("robert_n@hotmail.com");
        expect(rows[1].cells[3].textContent).toBe("participant");

    });

    /**
     * Integration Test 2 - Stage Two
     * test that submitting the form 
     * with invalid email format
     */
    test("should correctly retrieve and display data persisted in localStorage", () => {
        // Arrange - set up the variables
        const persistedData = [
            {
                eventName: "Sibling-Carrying World Championship",
                repName: "Jemma Nuutinen",
                repEmail: "jama_k@hotmail.com",
                role: "sponsor"

            },
        ]
        localStorage.setItem("eventSignups", JSON.stringify(persistedData));
        // Act - add data directly to localStorage
        const retrievedData = loadSignupsFromLocalStorage();
        displaySignupsTable();


        // Assert - verify data was retrieved
        expect(retrievedData).toEqual(persistedData);
        expect(retrievedData.length).toBe(1);
        expect(retrievedData[0].eventName).toBe("Sibling-Carrying World Championship");
        expect(retrievedData[0].repName).toBe("Jemma Nuutinen");

        // Assert - verify table displays the retrieved data
        const tableRows = document.querySelectorAll("#signups-tbody tr");
        expect(tableRows.length).toBe(1);
        expect(tableRows[0].cells[0].textContent).toBe("Sibling-Carrying World Championship");
        expect(tableRows[0].cells[1].textContent).toBe("Jemma Nuutinen");
        expect(tableRows[0].cells[2].textContent).toBe("jama_k@hotmail.com");
        expect(tableRows[0].cells[3].textContent).toBe("sponsor");

    });
});


/**
 * Unit Test 1 - Stage Two
 * test the function for validating required fields
 */

describe("Function Unit Tests", () => {

    describe("CalculateRoleBreakdown - Role Summary Generation", () => {

        test("should return correct count of each role", () => {
            // Arrange
            const fakeData = [
                {
                    eventName: "Wife-Carrying World Championship",
                    repName: "Sanna-Mari Nuutinen",
                    repEmail: "sannamari_k@hotmail.com",
                    role: "organizer"

                },
                {
                    eventName: "Husband-Carrying World Championship",
                    repName: "Robert Nuutinen",
                    repEmail: "robert_n@hotmail.com",
                    role: "participant"
                },
                {
                    eventName: "Sibling-Carrying World Championship",
                    repName: "Jemma Nuutinen",
                    repEmail: "jama_k@hotmail.com",
                    role: "sponsor"

                }
            ]
            localStorage.setItem("eventSignups", JSON.stringify(fakeData));

            // Act
            const breakdown = calculateRoleBreakdown();

            // Assert 
            expect(breakdown.participant).toBe(1);
            expect(breakdown.organizer).toBe(1);
            expect(breakdown.sponsor).toBe(1);
        });
    });
});

/**
 * Unit Test 2 - Stage Two
 * test that deleting a record updates localStorage and table correctly
 */

describe("deleteSignups - Delete Record Updates localStorage and Table", () => {

    test("should delete record from localStorage when delete button is clicked", () => {
        // Arrange
        const fakeData = [
            {
                eventName: "Wife-Carrying World Championship",
                repName: "Sanna-Mari Nuutinen",
                repEmail: "sannamari_k@hotmail.com",
                role: "organizer"

            },
            {
                eventName: "Husband-Carrying World Championship",
                repName: "Robert Nuutinen",
                repEmail: "robert_n@hotmail.com",
                role: "participant"
            },

        ]
        localStorage.setItem("eventSignups", JSON.stringify(fakeData));
        displaySignupsTable();
        window.confirm = jest.fn(() => true)

        // Act
        const deleteButton = document.querySelector(".delete-btn");
        deleteButton.click();

        // Assert 
        const signups = loadSignupsFromLocalStorage();
        expect(signups.length).toBe(1);
        expect(signups[0].eventName).toBe("Husband-Carrying World Championship");

    });

    test("should update table after deleting a record", () => {
        // Arrange
        const fakeData = [
            {
                eventName: "Wife-Carrying World Championship",
                repName: "Sanna-Mari Nuutinen",
                repEmail: "sannamari_k@hotmail.com",
                role: "organizer"

            },
            {
                eventName: "Husband-Carrying World Championship",
                repName: "Robert Nuutinen",
                repEmail: "robert_n@hotmail.com",
                role: "participant"
            },

        ]
        localStorage.setItem("eventSignups", JSON.stringify(fakeData));
        displaySignupsTable();
        window.confirm = jest.fn(() => true)

        // Act
        const deleteButton = document.querySelector(".delete-btn");
        deleteButton.click();

        // Assert 
        const rows = document.querySelectorAll("#signups-tbody tr");
        expect(rows.length).toBe(1);
        expect(rows[0].cells[0].textContent).toBe("Husband-Carrying World Championship");
    });
});

/**
 * Unit Test 3 - Stage Two
 * test that the upcoming events summary updates when a record is deleted
 */
describe("Summary Updates on REcord Deletion", () => {

    test("should update summary when a record a deleted", () => {
        // Arrange
        const fakeData = [
            {
                eventName: "Wife-Carrying World Championship",
                repName: "Sanna-Mari Nuutinen",
                repEmail: "sannamari_k@hotmail.com",
                role: "organizer"

            },
            {
                eventName: "Husband-Carrying World Championship",
                repName: "Robert Nuutinen",
                repEmail: "robert_n@hotmail.com",
                role: "participant"
            },
            {
                eventName: "Sibling-Carrying World Championship",
                repName: "Jemma Nuutinen",
                repEmail: "jama_k@hotmail.com",
                role: "sponsor"

            }
        ]
        localStorage.setItem("eventSignups", JSON.stringify(fakeData));
        displaySignupsTable();
        showUpcomingEventsSummary();
        window.confirm = jest.fn(() => true);

        // Act
        const deleteButton = document.querySelector(".delete-btn");
        deleteButton.click();

        // Assert 
        const statCards = document.querySelectorAll(".stat-card");
        expect(statCards[0].querySelector(".stat-number").textContent).toBe("1");
    });
});

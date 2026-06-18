/**
 * jest test script copied from template
 * 
 * @author Cody Wiebe-Kehler
 * @version 1.0.1
 * 
 */

const fs = require("fs");
const path = require("path");

// reads the HTML the script thats being tested works with
const html = fs.readFileSync(path.resolve(__dirname,"./donation-tracker.html"), "utf-8")

//import methods we need for testing
const {initialize, collectFormData, validateInputs} = require("./donation-tracker.js"); //imports functions from our script
const { testEnvironment } = require("../jest.config.js"); //imports dependancy functions from jest.config.js
const { addUncaughtExceptionCaptureCallback } = require("process");

//executes before each test in the module
beforeEach(() => {
    // mount the HTML content to the virtual DOM
    document.documentElement.innerHTML = html.toString();
})

/**
 * Tests the collectFormData() function
 * collectFormData() takes in DOM elements as input, so fake ones are created and passed in
 * -- 1. tests name output is correct
 */
describe("tests the collectFormData() function", () => {
    test("tests that collect form data object output is correct based on input values", () => {
        //arrange
        const nameInput = { value: "Red Cross" };
        const amountInput = { value: "50" };
        const dateInput = {
            valueAsDate: new Date("2026-06-17")
        };
        const messageInput = { value: "Thanks" };
        //act
        const result = collectFormData(
            nameInput,
            amountInput,
            dateInput,
            messageInput
        );
        //assert
        expect(result).toEqual({
            name: "Red Cross",
            amount: "50",
            date: new Date("2026-06-17").toISOString(),
            message: "Thanks"
        });
    })
})
/**
 * Tests the validateInputs() function
 * validateInputs directly pulls DOM elements from the active html page, therefore
 * this one adjusts the jest testing environment document to fake the inputs
 * 
 * -- 1. return false since chosen charity is empty
 */
describe("tests the validateInputs() function", () => {
    test("test that validateInput retruns true when all inputs are valid", () => {
        //arrange
        document.getElementById("charity-name-input").value = "test name";
        document.getElementById("amount-input").value = "1";
        document.getElementById("date-input").valueAsDate = new Date(Date.now());
        document.getElementById("message-input").value = "test message";
        //act and assert
        expect(validateInputs()).toBe(true);
    });
    test("test that validate inputs returns false with invalid input", () => {
        //arrange
        document.getElementById("charity-name-input").value = "";
        document.getElementById("amount-input").value = "1";
        document.getElementById("date-input").valueAsDate = new Date(Date.now());
        document.getElementById("message-input").value = "test message";
        //act && assert
        expect(validateInputs()).toBe(false);
    });
})
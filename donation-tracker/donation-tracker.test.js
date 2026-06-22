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
const {initialize, getGlobalVariables, collectFormData, validateInputs, displayError, clearErrorUI, getToday} = require("./donation-tracker.js"); //imports functions from our script
const { testEnvironment } = require("../jest.config.js"); //imports dependancy functions from jest.config.js
const { addUncaughtExceptionCaptureCallback } = require("process");
const { get } = require("http");

//executes before each test in the module
beforeEach(() => {
    // mount the HTML content to the virtual DOM
    document.documentElement.innerHTML = html.toString();
})
/**
 * tests the initialize function
 * -- 1. DOM elements are gotten and stored
 * -- 2. regex variables are stored
 */
describe("tests the initilize() function", () => {
    test("DOM element variables are gotten and stored", () => {
        //act
        initialize()
        //assert
        expect(getGlobalVariables().form.id).toBe("donation-tracker-form");
        expect(getGlobalVariables().nameInput.id).toBe("charity-name-input");
    })
    test("regex variables are assigned", () => {
        //act
        initialize()
        //assert
        expect(getGlobalVariables().alphanumericPlusRegex).toEqual(/^[a-zA-Z0-9!@#\$%\^\&\*()_+\-=\[\]{};':"\\| ,.<>\/?]+$/);
        expect(getGlobalVariables().moneyRegex).toEqual(/^\d{1,5}$|(?=^.{1,5}$)^\d+\.\d{0,2}$/)
    })
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

/**
 * Tests the display error function
 * 
 * -- 1. new span object is added to DOM as sibling to passed in element
 * -- 2. tests that new span object has class 'error-message'
 */
describe("tests the displayError() function", () => {
    test("tests that the function does add a span element under the parent element", () => {
        //arrange
        let testInput = document.getElementById("charity-name-input");
        //act
        displayError(testInput,"test error message")
        //assert
        expect(testInput.parentElement.querySelector("span").tagName).toBe("SPAN")
    })
    test("tests that the returned span does contain class 'error-message'", () => {
        //arrange
        let testInput = document.getElementById("charity-name-input");
        //act
        displayError(testInput,"test error message")
        //assert
        expect(testInput.parentElement.querySelector("span").classList).toContain("error-message")
    })
})

/**
 * tests the clearErrorUI() function
 * 
 * -- 1. there are no elements with class 'error-message' left on the page after running
 */
describe("tests the clearErrorUI() function", () => {
    test("there are not elements with class 'error-message' left after running", () => {
        //arrange
        let testInput = document.getElementById("charity-name-input")
        displayError(testInput,"test error message")
        //act
        clearErrorUI()
        //assert
        expect(document.getElementsByClassName("error-message")).toHaveLength(0)
    })
})

/**
 * tests the getToday() function
 * 
 * -- 1. ensure the returned object is an instance of the Date class
 * -- 2. the returned objects year,month, and day value are correct
 */
describe("tests the getToday() funciton",() => {
    test("the returned object is a Date object", () => {
        //act, assert
        expect(getToday() instanceof Date).toBe(true)
    })
    test("the returned date is the correct year,month, and day", () => {
        //arrange
        let expected = new Date(Date.now())
        //act
        let result = getToday();
        //assert
        expect(result.getFullYear()).toBe(expected.getFullYear());
        expect(result.getMonth()).toBe(expected.getMonth());
        expect(result.getDay()).toBe(expected.getDay());
    })
})
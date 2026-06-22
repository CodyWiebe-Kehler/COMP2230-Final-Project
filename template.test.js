/**
 * jest test script copied from template
 * 
 * @author Cody Wiebe-Kehler
 * @version 1.0.1
 */

const fs = require("fs");
const path = require("path");

// reads the HTML the script thats being tested works with
const html = fs.readFileSync(path.resolve(__dirname,"./template.html"), "utf-8")

//import methods we need for testing
const {updateThemeColours} = require("./template.js"); //imports functions from our script
const { testEnvironment } = require("./jest.config.js"); //imports dependancy functions from jest.config.js
const { addUncaughtExceptionCaptureCallback } = require("process");

//executes before each test in the module
beforeEach(() => {
    // mount the HTML content to the virtual DOM
    document.documentElement.innerHTML = html.toString();
    document.body.innerHTML = '<nav class="site-nav"></nav>'
})

/**
 * tests if updateThemeColours runs without errors
 * more of a test of jest than of the code.
 */

//tests for the addNumbers function
describe("example test for updateThemeColours()",() => {
    //runs a jest test, takes label, and testing function as input
    test("updateThemeColours does not throw any errors", () => {
        //function to run and expected return value
        expect(() => updateThemeColours).not.toThrow();
    })
})
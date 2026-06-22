/**
 * Jest tests for Volunteer Tracker
 */

const fs = require("fs");
const path = require("path");

// Read HTML
const html = fs.readFileSync(
    path.resolve(__dirname, "volunteer_tracker.html"),
    "utf8"
);

// Import functions from JS file
const {
    setCookie,
    getCookie
} = require("./volunteer_tracker");

// Runs before each test
beforeEach(() => {

    document.documentElement.innerHTML = html.toString();

});

describe("Cookie functions", () => {

    test("setCookie and getCookie work correctly", () => {

        setCookie("username", "Kavya", 1);

        expect(
            getCookie("username")
        ).toBe("Kavya");

    });

});
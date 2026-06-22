module.exports = {
    testEnvironment: "jsdom"
};
const { testEnvironment } = require("jest-environment-jsdom")

//jest.config.js
module.exports ={
    testEnvironment: "jsdom",
    collectCoverage: true, //includes function coverage % chart
}

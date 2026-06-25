/*variables for all necessary DOM elements*/
let form;
let nameInput;
let amountInput;
let dateInput;
let messageInput;

/*regular expressions*/
let alphanumericPlusRegex;
let moneyRegex;

let donations;

document.addEventListener("DOMContentLoaded", (event) => {
    initialize()

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (validateInputs()){
            console.log(collectFormData(nameInput,amountInput,dateInput,messageInput));
            //adds new donation to the local variable list
            donations.push(collectFormData(nameInput,amountInput,dateInput,messageInput));
        }
        //sets localstorage to match local variable
        localStorage.setItem("donationsEntries",JSON.stringify(donations))
    })

    //update table to show newly added donation
    displayEntries()
})

/**
 * initializes page by pulling references to global variables for input objects,
 * setting global regex variables, and running startup functions such as setting
 * todays date.
 */
function initialize(){
    //fills in global variables
    //DOM elements
    form = document.getElementById("donation-tracker-form");
    nameInput = document.getElementById("charity-name-input");
    amountInput = document.getElementById("amount-input");
    dateInput = document.getElementById("date-input");
    messageInput = document.getElementById("message-input");
    //Regex
    alphanumericPlusRegex = /^[a-zA-Z0-9!@#\$%\^\&\*()_+\-=\[\]{};':"\\| ,.<>\/?]+$/;
    moneyRegex = /^\d{1,5}$|(?=^.{1,5}$)^\d+\.\d{0,2}$/;

    //Retrieves donations log from localStorage
    localEntries = JSON.parse(localStorage.getItem("donationsEntries"))
    if (localEntries){
        console.log("localstorage entries found")
        donations = localEntries
    }else{
        console.log("localstorage entries not found")
        donations = [];
    }

    //update donations table
    displayEntries()

    //sets date input to todays date
    console.log(getToday())
    dateInput.valueAsDate = getToday();
}

/**
 * Function checks all input values and determines whether or not the form can be submitted
 * @returns {boolean} whether or not the form inputs are valid and can be submitted 
 */
function validateInputs(){
    //gets DOM elements from HTML page
    form = document.getElementById("donation-tracker-form");
    nameInput = document.getElementById("charity-name-input");
    amountInput = document.getElementById("amount-input");
    dateInput = document.getElementById("date-input");
    messageInput = document.getElementById("message-input");
    alphanumericPlusRegex = /^[a-zA-Z0-9!@#\$%\^\&\*()_+\-=\[\]{};':"\\| ,.<>\/?]+$/;
    moneyRegex = /^\d{1,5}$|(?=^.{1,5}$)^\d+\.\d{0,2}$/;

    clearErrorUI()
    let valid = true;
    //ensures there is a value in chosen charity
    if (nameInput.value == ""){
        valid = false;
        displayError(nameInput,"Charity input must not be empty");
        console.warn("Charity input must not be empty");
    }
    //name input matches to alphanumeric only
    if (!(alphanumericPlusRegex.test(nameInput.value))){
        valid = false;
        displayError(nameInput,"Charity input must be only alphanumeric characters");
        console.warn("Charity input must be only alphanumeric characters");
    }

    //ensures amount is numeric and positive
    if (!(moneyRegex.test(amountInput.value))){
        valid = false;
        displayError(amountInput,"Donation amount must be a positive number");
        console.warn("Donation amount must be a positive number");
    }
    //validates that money amount is greater than 0
    if (amountInput.value <= 0){
        valid = false;
        displayError(amountInput,"Donation amount must be a positive number");
        console.warn("Donation amount must be a positive number");
    }
    
    //validates that date not empty/blank
    if (dateInput.valueAsDate === null){
        valid = false;
        displayError(dateInput,"Donation date must not be empty");
        console.warn("Donation date must not be empty");
    }

    //message input matches to alphanumeric only
    if (!(alphanumericPlusRegex.test(messageInput.value))){
        valid = false;
        displayError(messageInput,"Donation message must only contain standard characters")
        console.warn("Donation message must only contain standard characters")
    }

    return valid
}

/**
 * Displays a given error message as a span placed next to the given element
 * @param {HTMLElement} inputElement The input element that triggered this error
 * @param {string} errorMessage The message to display to the user
 */
function displayError(inputElement, errorMessage){
    //alert(errorMessage)
    let messageSpan = document.createElement("span");
    messageSpan.innerHTML = errorMessage;
    messageSpan.classList.add("error-message")
    
    //adds message span to the parent, aka the div containing the input
    inputElement.parentElement.appendChild(messageSpan);
}

/**
 * This function clears all error message objects from the UI
 */
function clearErrorUI(){
    let errorSpans = [...document.querySelectorAll(".error-message")]
    errorSpans.forEach(errorSpan => {
        errorSpan.remove()
    })
}

/**
 * collects formData from provided input DOM elements and returns it as a JSON object for later storage
 * @param {object} nameInput The charity name DOM input element
 * @param {object} amountInput  The donation amount DOM input element
 * @param {object} dateInput  The donation date DOM input element
 * @param {object} messageInput The donation message DOM input element
*/
function collectFormData(nameInput,amountInput,dateInput,messageInput){
    let data = {
        "name":"",
        "amount":0,
        "date":"UTCstring", //stored as ISO string for international standardization
        "message":""
    }

    data.name = nameInput.value;
    data.amount = amountInput.value;
    data.date = dateInput.valueAsDate.toISOString();
    data.message = messageInput.value;

    return data;
}

/**
 * updates donations table with entries to match current localstorage data
 */
function displayEntries(){
    //clear old donation entries from screen
    clearEntries()
    let donationTable = document.getElementById("donations-table");
    let donationTableBody = donationTable.querySelector("tbody");
    //adds a table row for each donation entry in local storage
    donations = JSON.parse(localStorage.getItem("donationsEntries"))
    donations.forEach((donationEntry,index) => {
        //console.log(donationEntry)
        //creates new row element
        let newRow = document.createElement("tr");
        newRow.classList.add("donation-record");
        //appends cells for each donation entry data value to row
        newRow.appendChild(buildTableCell(donationEntry.name,""));
        newRow.appendChild(buildTableCell("Amount: ", donationEntry.amount));
        newRow.appendChild(buildTableCell("Date: ", donationEntry.date));
        newRow.appendChild(buildTableCell("Comment: ", donationEntry.message));

        //creates and adds the remove element button
        let buttonCell = document.createElement("td")
        let removeButton = document.createElement("button");
        removeButton.textContent = "Delete Record";
        removeButton.addEventListener("click", (event) => {
            /*
            * removes the this element from the donations array at the index for this
            * loop through the donation list, and upidates new spliced donations
            * list to localstorage, then re displays the donation records table.
            */
            donations.splice(index,1);
            localStorage.setItem("donationsEntries",JSON.stringify(donations));
            displayEntries();
        })
        buttonCell.appendChild(removeButton)
        newRow.appendChild(buttonCell);

        //appends row to table body
        donationTableBody.appendChild(newRow);
    })
}
/**
 * Builds a HTMLTableCellElement with text content with the strongText tect first
 * in a strong tag, and followed by the normal text.
 * @param {string} strongText The text you want to be set as strong text at the
 *  front of the cells text content.
 * @param {string} text the normal text content for the cell which follows the 
 * strong text.
 * @returns {HTMLTableCellElement} a cell element with text content based on
 *  given string inputs
 */
function buildTableCell(strongText,text){
    //creates individual elements with values
    let cell = document.createElement("td");
    //sets inner html to appropriate text string including strong tag
    cell.innerHTML = `<strong>${strongText}</strong>${text}`
    return cell
}
/**
 * clears all donation entry table rows from the donations table 
 */
function clearEntries(){
    let donationRows = [...document.getElementsByClassName("donation-record")];
    donationRows.forEach(tableRow => {
        tableRow.remove()
    })
}

/**
 * returns the date object for todays date, with timezone adjusted hours, at minute 0, second 0
 * @returns {Date} date object with todays year, month, and day, and hours, minutes, seconds, and milliseconds set to 0
 */
function getToday(){
    let today = new Date(Date.now())
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)
    return today
}

/**
 * gets references to all global variables
 * @returns {object} globalVariables object containing references to all form 
 * inputs objects and the regex variables,
 */
function getGlobalVariables(){
    return {
        form,
        nameInput,
        amountInput,
        dateInput,
        messageInput,
        alphanumericPlusRegex,
        moneyRegex
    }
}

if (typeof module !== "undefined"){
    module.exports = {initialize, getGlobalVariables ,collectFormData, validateInputs, displayError, clearErrorUI, getToday}
}


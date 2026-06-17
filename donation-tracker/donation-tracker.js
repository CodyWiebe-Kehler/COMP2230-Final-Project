/**
 * ToDO:
 * - set date input to todays date, and lock it there
 */

document.addEventListener("DOMContentLoaded", (event) => {
    /*Grab all necessary form components*/
    const form = document.getElementById("donation-tracker-form")
    const nameInput = document.getElementById("charity-name-input")
    const amountInput = document.getElementById("amount-input")
    const dateInput = document.getElementById("date-input")
    const messageInput = document.getElementById("message-input")

    /*regular expressions*/
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    const alphanumericPlusRegex = /^[a-zA-Z0-9!@#\$%\^\&\*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
    const moneyRegex = /^\d{1,5}$|(?=^.{1,5}$)^\d+\.\d{0,2}$/;
    const dateRegex = 0;

    initialize()

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log("inputs:"+validateInputs())
    })

    function initialize(){
        console.log("initializing form javascript")
        //sets date input to todays date
        dateInput.valueAsDate = new Date(Date.now());
    }

    /**
     * Function checks all input values and determines whether or not the form can be submitted
     * @returns {boolean} whether or not the form inputs are valid and can be submitted 
     */
    function validateInputs(){
        clearErrorUI()
        let valid = true;
        //ensures there is a value in chosen charity
        if (nameInput.value == ""){
            valid = false;
            displayError(nameInput,"Charity input must not be empty");
            console.warn("Charity input must not be empty");
        }
        //name input matches to alphanumeric only
        if (!(alphanumericRegex.test(nameInput.value))){
            valid = false;
            displayError(nameInput,"Charity input must be only alphanumeric characters");
            console.warn("Charity input must be only alphanumeric characters");
        }
        //console.log(nameRegex.test(nameInput.value))

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

        //validates that date not empty/blank, and is in valid date format
        if (dateInput.valueAsDate === null){
            valid = false;
            displayError(dateInput,"Donation date must not be empty");
            console.warn("Donation date must not be empty");
        }
        /*validates that date is today
        *ISO string representing today at hour 0, minute 0, etc
        *fixes timezone issues when comparing to date input value
        */        
        let todayUTC = new Date(Date.now())
        todayUTC.setHours(-5)
        todayUTC.setMinutes(0)
        todayUTC.setSeconds(0)
        todayUTC.setMilliseconds(0)
        todayUTC = todayUTC.toISOString()
        if (!(dateInput.valueAsDate.toISOString() == todayUTC)){
            //console.log("donation dateis not today")
            valid = false;
            displayError(dateInput,"Donation date must be todays date");
            console.warn("Donation date must be todays date");
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

})

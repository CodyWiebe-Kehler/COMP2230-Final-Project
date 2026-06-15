/**
 * ToDO:
 * - set date input starting and minimum value to todays date
 */

/*Grab all necessary form components*/
const form = document.getElementById("donation-tracker-form")
const nameInput = document.getElementById("charity-name-input")
const amountInput = document.getElementById("amount-input")

/*regular expressions*/
const nameRegex = /^[a-zA-Z0-9]*$/;
const moneyRegex = /^\d{1,5}$|(?=^.{1,5}$)^\d+\.\d{0,2}$/;
form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("inputs:"+validateInputs())
})

function validateInputs(){
    let valid = true;
    //ensures there is a value in chosen charity
    if (nameInput.value == ""){
        valid = false;
    }
    //name input matches to alphanumeric only
    if (!(nameRegex.test(nameInput.value))){
        valid = false;
    }
    //console.log(nameRegex.test(nameInput.value))

    //ensures amount is numeric and positive
    if (!(moneyRegex.test(amountInput.value))){
        valid = false;
    }
    //validates that money amount is greater than 0
    if (amountInput.value <= 0){
        valid = false;
    }
    return valid
}

function displayError(inputElement){

}
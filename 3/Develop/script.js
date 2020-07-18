// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
  alert("A series of questions will be used to determine what kind of password will be generated");

  // Generates strings consisting of all possibilities for each category
  const lowers = "abcdefghijklmnopqrstuvwxyz";
  const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specials = "!@#$%^&*";

  // Determines the length of the password
  var qLength = confirm("Should the length of the password be a value other than 8?");
  var length = 0;
  while ((length < 8)||(length > 500)) {
    if (qLength == true) {
      length = parseInt(prompt("What is the length of the password? Choose a value ranging from 8 to 128:"));
      if ((length < 8)||(length > 500)) {
        alert("You must select a number between 8 and 128 (inclusive)");
      }
    }
    else {
      length = 8;
    }
  }

  // Questions to determine which character types are used
  var numTypes = -1;
  var types = [];
  while (numTypes == -1) {
    var qLower = confirm("Should the password have lowercase letters?")
    var qUpper = confirm("Should the password have uppercase letters?");
    var qNumber = confirm("Should the password have numbers?");
    var qSpecial = confirm("Should the password have special characters? Such as '!' '@' '#' ");
    
    // Determines the number of types selected
    if (qLower == true){
      numTypes++;
      types[0] = "lowers";
    }
    if (qUpper == true){
      numTypes++;
      types[types.length] = "uppers";
    }
    if (qNumber == true){
      numTypes++;
      types[types.length] = "numbers";
    }
    if (qSpecial == true){
      numTypes++;
      types[types.length] = "specials";
    }
    if (numTypes == -1) {
      alert("Please select at least one category");
    }
  }

  alert("Your password will now be generated based on the specified criteria");
  var password = "";

  for (i = 0; i < length; i++) {
    // Randomly selects a type of those specified
    randomType = Math.round(numTypes * Math.random());

    // Identifies which type was selected and generates a random character of the specified type
    let newChar = "";
    switch (types[randomType]) {
      case "lowers":
        newChar = lowers.charAt(Math.round(25*Math.random()));
        break;
      case "uppers":
        newChar = uppers.charAt(Math.round(25*Math.random()));
        break;
      case "numbers":
        newChar = numbers.charAt(Math.round(9*Math.random()));
        break;
      case "specials":
        newChar = specials.charAt(Math.round(7*Math.random()));
        break;
    }

    password += newChar;

  }

  return password;
  
}
//console.log("h");
const form = document.querySelector("#signup-form");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#cpassword");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const countryInput = document.querySelector("#country");
const zipInput = document.querySelector("#zip");
const zipError = document.querySelector("#zip-error");

// Optional: live check for passwords matching while typing
confirmPasswordInput.addEventListener("input", () => {
  if (passwordInput.value !== confirmPasswordInput.value) {
    console.log("Passwords do not match yet...");
  } else {
    console.log("Passwords match!");
  }
});

emailInput.addEventListener("input", () => {
  // Check if the input is valid based on HTML rules
  if (emailInput.validity.valid) {
    // Clear the error message if it's valid
    emailError.textContent = "";
    emailError.className = "error-message"; // reset styling classes
  } else {
    // Show a custom error message if it's invalid
    showEmailError();
  }
});

function showEmailError() {
  if (emailInput.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address.";
  } else if (emailInput.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (emailInput.validity.tooShort) {
    emailError.textContent = `Email should be at least ${emailInput.minLength} characters; you entered ${emailInput.value.length}.`;
  }
  emailError.className = "error-message active";
}

function validatePasswordMatch() {
  if (passwordInput.value !== confirmPasswordInput.value) {
    // This marks the input as invalid and sets a custom error message
    confirmPasswordInput.setCustomValidity("Passwords do not match!");
  } else {
    // Clear the custom error when they match (makes it valid again)
    confirmPasswordInput.setCustomValidity("");
  }
}

// Run the check whenever the user types in either password field
passwordInput.addEventListener("input", validatePasswordMatch);
confirmPasswordInput.addEventListener("input", validatePasswordMatch);

// 2. Zip Code Validation Logic based on Country
const zipPatterns = {
  us: [/^\d{5}(-\d{4})?$/, "US Zip Code must look like 12345 or 12345-6789"],
  ca: [
    /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    "Canadian Postal Code must look like A1A 1A1",
  ],
  uk: [
    /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/,
    "UK Postal Code must be a valid format",
  ],
};

function validateZip() {
  const country = countryInput.value;
  const constraint = zipPatterns[country];

  if (!constraint) {
    zipInput.setCustomValidity("Please select a country first.");
    return;
  }

  const [pattern, errorMessage] = constraint;

  if (pattern.test(zipInput.value)) {
    zipInput.setCustomValidity("");
    zipError.textContent = "";
  } else {
    zipInput.setCustomValidity(errorMessage);
    zipError.textContent = errorMessage;
  }
}

zipInput.addEventListener("input", validateZip);
countryInput.addEventListener("change", validateZip);

// Handle the form submission
form.addEventListener("submit", (event) => {
  // 1. Check if the entire form is valid using HTML's built-in method
  if (!form.checkValidity()) {
    // 2. Stop the form from submitting/refreshing
    event.preventDefault();

    alert("Please fix the errors in the form before submitting.");

    // Optional: You can trigger your custom error display functions here
    // for all fields so the user sees what's wrong immediately.
  } else {
    // 3. If valid, you can let it submit or handle it via JavaScript (like an API fetch)
    event.preventDefault(); // Keep this if you aren't sending it to a backend server yet
    alert("High five! Form submitted successfully!");
  }
});

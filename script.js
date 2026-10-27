//console.log("h");
const form = document.querySelector("#signup-form");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#cpassword");
const cpasswordError = document.querySelector("#cpassword-error"); // Make sure to add this span in HTML!

const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

const countryInput = document.querySelector("#country");
const zipInput = document.querySelector("#zip");
const zipError = document.querySelector("#zip-error");

// 1. Email Validation Logic
emailInput.addEventListener("input", () => {
  if (emailInput.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error-message";
  } else {
    showEmailError();
  }
});

function showEmailError() {
  if (emailInput.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address.";
  } else if (emailInput.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be a valid email address.";
  } else if (emailInput.validity.tooShort) {
    emailError.textContent = `Email should be at least ${emailInput.minLength} characters.`;
  }
  emailError.className = "error-message active";
}

// 2. Password Matching Logic
function validatePasswordMatch() {
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity("Passwords do not match!");
    cpasswordError.textContent = "Passwords do not match!";
    cpasswordError.className = "error-message active";
  } else {
    confirmPasswordInput.setCustomValidity("");
    cpasswordError.textContent = "";
    cpasswordError.className = "error-message";
  }
}

passwordInput.addEventListener("input", validatePasswordMatch);
confirmPasswordInput.addEventListener("input", validatePasswordMatch);

// 3. Zip Code Validation Logic based on Country
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
    zipError.textContent = "Please select a country first.";
    zipError.className = "error-message active";
    return;
  }

  const [pattern, errorMessage] = constraint;

  if (pattern.test(zipInput.value)) {
    zipInput.setCustomValidity("");
    zipError.textContent = "";
    zipError.className = "error-message";
  } else {
    zipInput.setCustomValidity(errorMessage);
    zipError.textContent = errorMessage;
    zipError.className = "error-message active";
  }
}

zipInput.addEventListener("input", validateZip);
countryInput.addEventListener("change", validateZip);

// 4. Handle the Form Submission
form.addEventListener("submit", (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    alert("Please fix the errors in the form before submitting.");
  } else {
    event.preventDefault();
    alert("High five! Form submitted successfully!");
  }
});

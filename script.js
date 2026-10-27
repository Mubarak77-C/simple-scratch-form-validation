//console.log("h");
const form = document.querySelector("#signup-form");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#cpassword");

// Optional: live check for passwords matching while typing
confirmPasswordInput.addEventListener("input", () => {
  if (passwordInput.value !== confirmPasswordInput.value) {
    console.log("Passwords do not match yet...");
  } else {
    console.log("Passwords match!");
  }
});
// Handle the form submission
form.addEventListener("submit", (event) => {
  // Prevent the form from refreshing the page automatically
  event.preventDefault();

  if (passwordInput.value !== confirmPasswordInput.value) {
    alert("Error: Passwords must match!");
    return;
  }

  console.log("Form submitted successfully!");
  // Here you can send data or proceed further
});

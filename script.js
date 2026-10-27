//console.log("h");
const name = document.querySelector("#name");
const phone = document.querySelector("#ph_num");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const cpassword = document.querySelector("#cpassword");
const btn = document.querySelector("button");

name.addEventListener("input", (event) => {
  console.log("name typed, ", name.value);
});

phone.addEventListener("input", (event) => {
  console.log("phone added");
});

email.addEventListener("input", (event) => {
  console.log("email");
});

cpassword.addEventListener("input", (event) => {
  console.log("pass");
  if (password.value != cpassword.value) {
    console.log("please confirm match password both");
  } else {
    console.log("password matched");
  }
});

btn.addEventListener("click", (event) => {
  console.log("submit");
});

/*=============== SHOW HIDDEN - PASSWORD ===============*/  
const showHiddenPass = (loginPass, loginEye) => {  
  const input = document.getElementById(loginPass),  
    iconEye = document.getElementById(loginEye);  
  
  iconEye.addEventListener("click", () => {  
    // Change password to text  
    if (input.type === "password") {  
      // Switch to text  
      input.type = "text";  
  
      // Icon change  
      iconEye.classList.add("ri-eye-line");  
      iconEye.classList.remove("ri-eye-off-line");  
    } else {  
      // Change to password  
      input.type = "password";  
  
      // Icon change  
      iconEye.classList.remove("ri-eye-line");  
      iconEye.classList.add("ri-eye-off-line");  
    }  
  });  
};  
  
showHiddenPass("login-pass", "login-eye");  
  
/*=============== POST LOGIN DATA ===============*/  
const loginForm = document.querySelector(".login__form");  
  
loginForm.addEventListener("submit", async (e) => {  
  e.preventDefault(); // Prevent form submission  
  
  // Get the values from the form inputs  
  const emailInput = document.querySelector(".login__input[type='email']");  
  const passwordInput = document.querySelector(".login__input[type='password']");  
  const email = emailInput.value.trim(); // Trim whitespace from email input  
  const password = passwordInput.value.trim(); // Trim whitespace from password input  
  
  // Validate email and password  
  if (!validateEmail(email)) {  
    // Display error message for invalid email  
    displayErrorMessage(emailInput, "Invalid email");  
    return; // Stop form submission  
  }  
  
  if (!validatePassword(password)) {  
    // Display error message for invalid password  
    displayErrorMessage(passwordInput, "Invalid password");  
    return; // Stop form submission  
  }  
  
  // Hash the email and password  
  const emailHash = btoa(email);  
  const passwordHash = await sha256(password);  
  
  // Create an object with the login data  
  const loginData = {  
    email: emailHash,  
    password: passwordHash  
  };  
  console.log(loginData);  
  
  // Post the login data to the TEST endpoint  
	// Modify the fetch() call to handle the authentication response
  fetch("https://py-vercel-sage.vercel.app/auth/", {  
    method: "POST",  
    headers: {  
      "Content-Type": "application/json"  
    },  
    body: JSON.stringify(loginData)  
  })  
    .then(response => response.json())  
   .then(data => {
    // Check the authentication status
    if (data.status === "auth success") {
      // Display a success message and redirect to the next URI
      displayAuthStatus("success", data.next_uri);
    } else {
      // Display an error message
      displayAuthStatus("fail", null);
    }
  }) 
    .catch(error => {  
      // Handle any errors that occur during the request  
      console.error(error);  
    });  
});  



  .then(response => response.json())
  

  
function validateEmail(email) {  
  // Use regular expression to validate email format  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
  return emailRegex.test(email);  
}  
  
function validatePassword(password) {  
  // Check if password is at least 8 characters long  
  return password.length >= 8;  
}  
  
function displayErrorMessage(inputElement, message) {  
  // Display error message below the input element  
  const errorMessage = document.createElement("div");  
  errorMessage.className = "error-message";  
  errorMessage.innerText = message;  
  inputElement.parentNode.appendChild(errorMessage);  
}  
  
async function sha256(message) {  
  // encode as UTF-8  
  const msgBuffer = new TextEncoder().encode(message);  
  
  // hash the message  
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);  
  
  // convert ArrayBuffer to Array  
  const hashArray = Array.from(new Uint8Array(hashBuffer));  
  
  // convert bytes to hex string  
	const hashHex = hashArray.map((b) => ("00" + b.toString(16)).slice(-2)).join("");  
	return hashHex;  
}  

// Add a new function to display the authentication status
function displayAuthStatus(status, nextUri) {
  // Display the authentication status message
  const authStatusMessage = document.createElement("div");
  authStatusMessage.className = `auth-status ${status}`;
  authStatusMessage.innerText = status;
  document.body.appendChild(authStatusMessage);

  // Redirect to the next URI if it exists
  if (nextUri) {
    window.location.href = nextUri;
  }
}

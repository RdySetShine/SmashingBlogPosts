// Event handler for signup form

const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log('sending something')
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  const username = document.querySelector("#username").value.trim();

  if (email && password) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ email, password, username }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/login");
    } else {
      alert(response.statusText);
    }
  }
};


// Event listener for signup form
const signupForm = document.querySelector(".signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", signupFormHandler);
}

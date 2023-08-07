const loginFormHandler = async (event) => {
  event.preventDefault();
  //  values from login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  // Send a POST request to the API endpoint
  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // redirect the browser to the dashboard page
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert("Incorrect email or password, please try again");
    }
  }
};
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);




// // Event handler for login form
// const loginFormHandler = async (event) => {
//     event.preventDefault();
  
//     // Collect values from the login form
//     const email = document.querySelector("#email-login").value.trim();
//     const password = document.querySelector("#password-login").value.trim();
  
//     if (email && password) {
//       // Send a POST request to the API endpoint
//       const response = await fetch("/api/user/login", {
//         method: "POST",
//         body: JSON.stringify({ email, password }),
//         headers: { "Content-Type": "application/json" },
//       });
  
//       if (response.ok) {
//         // If successful, change the text and ID of the login button
//         const loginButtons = document.querySelectorAll(".login-button");
//         loginButtons.forEach((button) => {
//           button.textContent = "Logout";
//           button.id = "logout";
//         });
//         // If successful, redirect the browser to the expenses page
//         document.location.replace("/blogposts");
//       } else {
//         alert(response.statusText);
//       }
//     }
//   };

//   // Event listener for login form
// const loginForm = document.querySelector(".login-form");
// if (loginForm) {
//   loginForm.addEventListener("submit", loginFormHandler);
// }


// // Make sure the Layouts are all connecting and that the Public/Js folder has the proper consts / if statments / else 
// Event handler for signup form

const logoutFormHandler = async (event) => {
  event.preventDefault();
  console.log('sending something')

  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);

  }
};


// Event listener for signup form
const logoutForm = document.querySelector("#logout1");
if (logoutForm) {
  logoutForm.addEventListener("click", logoutFormHandler);
}

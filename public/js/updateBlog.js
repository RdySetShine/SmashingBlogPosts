const updateFormHandler = async (event) => {

  const id = event.target.getAttribute('data-id');
  const title = document.querySelector("#title").value.trim();
  const blogbody = document.querySelector("#content").value.trim();

  const response = await fetch(`/api/blog/update/${id}`, {
    method: 'POST',
    body: JSON.stringify({ title, blogbody }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // Refresh page to display updated blog
    document.location.replace(`/`);
  } else {
    alert("Blog not found!")
  }
};

// to delete current blog
const delBtnHandler = async (event) => {

  const id = event.target.getAttribute('data-id');

  const response = await fetch(`/api/blog/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Blog not found!")
  }

};

document
  .querySelector("#del-btn")
  .addEventListener("click", delBtnHandler);

document
  .querySelector(".updateBlog-form")
  .addEventListener("submit", updateFormHandler);
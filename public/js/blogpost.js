const Blogpost = document.findElementById('blogpost')

Blogpost.addEventListener("submit", async (e) => {
  e.preventDefault();

  const blogbody = document.getElementById("iblog").value;
  // const user_id = document.getElementById("").value;
  const title = parseFloat(
    document.getElementById("blog-title-description").value
  );

  const newBlogPost = {
    blogbody,
    //   user_id,
    title,
  };


  try {
    const response = await fetch("/api/blog", {
      // Updated endpoint to "/api/income"
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlogPost),
    });

    if (response.ok) {
      const newBlogPost = await response.json();
      console.log("New Blog created:", newBlogPost);
      // Perform any necessary UI updates or redirect to a new page
    } else {
      console.log("Failed to create blog:", response.statusText);
      // Perform error handling or show an error message to the user
    }
  } catch (error) {
    console.log("Error creating blog:", error);
    // Perform error handling or show an error message to the user
  }
});


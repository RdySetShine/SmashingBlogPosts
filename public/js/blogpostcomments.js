const Blogpostcomments = document.findElementById('blogpostcomment')

Blogpostcomments.addEventListener("submit", async (e) => {
  e.preventDefault();

  const blogpostcomment = document.getElementById("startcomment").value;
  // const user_id = document.getElementById("").value;

  const newBlogPostcomment = {

    blogpostcomment,
    //   user_id,
  };


  try {
    const response = await fetch("/api/blogpostcomments", {


      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlogPostcomment),
    });

    if (response.ok) {
      const newBlogPostComment = await response.json();
      console.log("New comment created:", newBlogPostComment);
      // Perform any necessary UI updates or redirect to a new page
    } else {
      console.log("Failed to create comment:", response.statusText);
      // Perform error handling or show an error message to the user
    }
  } catch (error) {
    console.log("Error creating comment:", error);
    // Perform error handling or show an error message to the user
  }
});


// use BUDGET BUDDY TO FINISH THESE CONTROLLERS

// USE THE STEPS TO MAKE REPO FOR ASSIGNMENT 9 /10/ 11


const express = require("express");
const router = express.Router();
const {Blogposts} = require("../../models");
const withAuth = require('../../utils/auth')


//  to create new post
router.get('/new', withAuth, async (req, res) => {
  try {
    const newBlog = true;
    res.render('blogForm', {
      newBlog,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// current blog form with value to edit
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blogposts.findByPk(req.params.id);
    const blog = blogData.get({ plan: true });
    const editBlog = true;
    res.render('blogForm', {
      ...blog,
      editBlog,
      username: req.session.username,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err);
  }
});
// Route to update a post
router.post('/update/:id', withAuth,  async (req, res) => {
  try {
    const updatedBlog = await Blogposts.update(
      {
        title: req.body.title,
        content: req.body.blogbody,
        user_id: req.session.user_id,
      },
      {
        where: {
          id: req.params.id,
        }
      }
    );
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Route to create a new post
router.post('/', withAuth,  async (req, res) => {
  try {
    const newBlog = await Blogposts.create({
      title: req.body.title,
      blogbody: req.body.blogbody,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteBlog = await Blogposts.destroy({
      where: {
        id: req.params.id,
      }
    })
    if (!deleteBlog) {
      res.status(404).json({ message: 'No Blog found with this id!' });
      return;
    }
    res.status(200).json(deleteBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;


// Route: POST /api/blogpost
// router.post("/", async (req, res) => {
//   try {
//     const {blogbody, user_id, title  } = req.body;

   
// const datecreated = new Date()

//     console.log(blogbody,user_id, title )

//     const newBlogPost = await Blogpost.create({

//       blogbody,
//       user_id,
//       title,
//       datecreated

//       // Additional properties related to the user or any other necessary fields
//     });
//     res.status(201).json(newBlogPost);

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Failed to create blogpost" });
//   }
// });

// // Route: GET /blogpost/:id
// router.get("/:id", async (req, res) => {
//   try {
//     const {id } = req.params;
//     const blogpost = await Blogpost.findByPk(id);
//     if (blogpost) {
//       res.status(200).json(blogpost);
//     } else {
//       res.status(404).json({ error: "blogpost not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to get blogpost" });
//   }
// });



// // Route: PUT/blogpost/:id
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {blogbody, title} = req.body;
//     const blogpost = await Blogpost.findByPk(id);
//     if (blogpost) {

//         blogpost.blogbody = blogbody;
//        blogpost.title = title
//         blogpost.datecreated = new Date();

//       await expense.save();
//       res.json(blogpost);
//     } else {
//       res.status(404).json({ error: "Post not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update Post" });
//   }
// });

// // Route: DELETE /expenses/:id
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blogpost = await Blogpost.findByPk(id);
//     if (blogpost) {

//       await blogpost.destroy();

//       res.sendStatus(204);
//     } else {
//       res.status(404).json({ error: "Blogpost not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete Blogpost" });
//   }
// });

// module.exports = router;

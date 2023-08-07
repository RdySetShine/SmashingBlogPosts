// use BUDGET BUDDY TO FINISH THESE CONTROLLERS

// USE THE STEPS TO MAKE REPO FOR ASSIGNMENT 9 /10/ 11


const express = require("express");
const router = express.Router();
const {BlogpostComments} = require("../../models");
const withAuth = require('../../utils/auth')


// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await BlogpostComments.create({
      blogcommentbody: req.body.blogcommentbody,
      blogpost_id: req.body.blogpost_id,
      user_id: req.session.user_id,
      username: req.session.username,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;


// Route: POST /api/blogpostcomments
// router.post("/", async (req, res) => {
//   try {
//     const {blogcommentbody, user_id, blogpost_id } = req.body;

   
// const datecreated = new Date()

//     console.log(blogcommentbody, username, )

//     const newComment = await BlogpostComments.create({

//       blogcommentbody,
//       user_id,
//       datecreated,
//       blogpost_id

//       // Additional properties related to the user or any other necessary fields
//     });
//     res.status(201).json(newComment);

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Failed to create blogpostcomment" });
//   }
// });

// // Route: GET /blogpostcomments/:id
// router.get("/:id", async (req, res) => {
//   try {
//     const {id } = req.params;
//     const blogpostcomment = await BlogpostComments.findByPk(id);
//     if (blogpostcomment) {
//       res.status(200).json(blogpostcomment);
//     } else {
//       res.status(404).json({ error: "blogpostcomment not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to get blogpostcomment" });
//   }
// });

// // Route: PUT/blogpostcomments/:id
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {blogcommentbody} = req.body;
//     const blogpostcomments = await BlogpostComments.findByPk(id);
//     if (blogpostcomments) {

//         blogpostcomments.blogcommentbody = blogcommentbody;
       
//         blogpostcomments.datecreated = new Date();

//       await expense.save();
//       res.json(expense);
//     } else {
//       res.status(404).json({ error: "Comment not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update Comment" });
//   }
// });

// // Route: DELETE /expenses/:id
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blogpostcomments = await BlogpostComments.findByPk(id);
//     if (blogpostcomments) {

//       await blogpostcomments.destroy();

//       res.sendStatus(204);
//     } else {
//       res.status(404).json({ error: "Comment not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete Comment" });
//   }
// });

// module.exports = router;

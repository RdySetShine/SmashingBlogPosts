
const router = require('express').Router();
const {BlogpostComments, Blogposts, User } = require('../models');
// const Blogpost = require("../models/blogposts");
const withAuth = require('../utils/auth')

// Route: GET /incomes/:id
// router.get("/", (req, res) => {
//     res.render("layouts/main");
//   });
// Route to render home page
router.get('/', async (req, res) => {
  try {
    // Get all blog data
    const blogdata = await Blogposts.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data
    const blogs = blogdata.map((blog) => blog.get({ plain: true }));
blogs.map(blog => {
  blog.canEdit = blog.user_id === req.session.user_id
})
    res.render('blogposts', {
      blogs,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
 
router.get('/blog/:id', withAuth, async (req, res) => {
try {
 // Get blog data with match id from req params
 const blogData = await Blogposts.findByPk(req.params.id, {
   include: [
     {
       model: User,
       attributes: ['username']
     },
   ],
 });

 const blog = blogData.get({ plan: true });
 console.log(blog)
 
 // const blogUser = blog.user.get({ plan:true });

 const commentData = await BlogpostComments.findAll({
   where: {
     blogpost_id: req.params.id,
   },
   include: [
     {
       model: User,
       attributes: ['username'],
     }
   ],
 });

 const comments = commentData.map((comment) => comment.get({ plain: true }));

 res.render('blog', {
   blog,
        comments,
   username: req.session.username,
   logged_in: req.session.logged_in
 });
} catch (err) {
 res.status(500).json(err);
}
});


router.get('/dashboard', withAuth, async (req, res) => {
try {
 const blogData = await Blogposts.findAll({
   where: {
     user_id: req.session.user_id,
   },
   include: [
     {
       model: User,
       attributes: ['username'],
     },
   ],
 });

 const blogs = blogData.map((blog) => blog.get({ plain: true }));

 res.render('dashboard', {
   blogs,
   username: req.session.username,
   logged_in: req.session.logged_in
 });
} catch (err) {
 res.status(500).json(err);
}
});

router.get('/login', (req, res) => {

if (req.session.logged_in) {
 res.redirect('/api/dashboard');
 return;
}

res.render('login');
});

router.get('/signup', (req, res) => {
res.render('signup');
});

router.get('/newwblog', async (req, res) => {
  try {

    
    res.render('blogForm', {
      newBlog: true,
      editBlog: false,
      content: {},

      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/editblog/:id', async (req, res) => {
  try {
    const blogData = await Blogposts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
      ],
    });

    const blog = blogData.get({ plan: true });
    res.render('blogForm', {
      newBlog: false,
      editBlog: true,
      content: blog,

      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/deleteBlog/:id', withAuth, async (req, res) => {
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
    res.redirect('/')
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;




//   router.get("/blogposts", (req, res) => {
//     res.render("blogposts", { logged_in: req.session.logged_in });
//   });
  
//   router.get("/blogpostcomments", (req, res) => {
//     res.render("blogpostcomments", { logged_in: req.session.logged_in });
//   });

//   router.get("/signup", (req, res) => {
//     res.render("signup");
//   });

// // Route: PUT /incomes/:id

// router.get("/login", (req, res) => {
//   res.render("login");

// })

// // Route: DELETE /incomes/:id

// router.get("/logout", (req, res) => {
//   // Set `loggedIn` to `false`
//   req.session.logged_in = false;

//   // Destroy the session
//   req.session.destroy((err) => {
//     if (err) {
//       console.log(err);
//     }

//     // Redirect to the desired page after successful logout
//     res.redirect("index");
//   });
// });



// module.exports = router;

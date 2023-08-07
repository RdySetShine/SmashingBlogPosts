const sequelize = require('../config/connection')
const { User, Blogposts, BlogpostComments } = require('../models')

const userdata = require('./userdata.json')
const blogdata = require('./blogdata.json')
const commentdata = require('./commentdata.json')
// const Blogpost = require('../models/blogposts')

// ctrl + d twice will allow you to you in multiple place the same word

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  try {
    await User.bulkCreate(userdata, {
      individualHooks: true,
      returning: true,
    });
  } catch (err) {
    console.log(err);
  };

  try {
    await Blogposts.bulkCreate(blogdata);
  } catch (err) {
    console.log(err);
  };

  try {
    await BlogpostComments.bulkCreate(commentdata);
  } catch (err) {
    console.log(err);
  };

  process.exit(0);
};

seedDatabase();
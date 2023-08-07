const User = require("./user");
const Blogposts = require("./blogposts");
const BlogpostComments = require("./blogpostcomments");


User.hasMany(Blogposts, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(BlogpostComments, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Blogposts.hasMany(BlogpostComments, {
  foreignKey: "blogpost_id",
  onDelete: "CASCADE",
});

Blogposts.belongsTo(User, {
  foreignKey: "user_id",
});

BlogpostComments.belongsTo(User, {
  foreignKey: "user_id",
});

BlogpostComments.belongsTo(Blogposts, {
  foreignKey: "blogpost_id",
});

module.exports = { Blogposts, BlogpostComments, User};

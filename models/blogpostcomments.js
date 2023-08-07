const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// const Blogpost = require("./blogposts");

class BlogpostComments extends Model {

}

BlogpostComments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },


    blogcommentbody: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User', // Use the User model
        key: "id",
      },
    },

    blogpost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blogpost', // Use the User model
        key: "id",
      },
    }


  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    tableName: "blogpostcomments",
    modelName: "blogpostcomments",
  }
);

module.exports = BlogpostComments;


//   BlogpostComments
//   Comment
//   commentbelongstopost
//   commentcreator
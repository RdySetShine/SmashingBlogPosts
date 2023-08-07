const { Model, DataTypes } = require("sequelize");
// const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Blogpost extends Model {

}

Blogpost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {

      type: DataTypes.STRING,
      allowNull: false,
    },

    blogbody: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User', // Use the User model
        key: "id",
      },
    }

  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    // tableName: "blogpost",
    modelName: "blogpost",
  }
);

module.exports = Blogpost;
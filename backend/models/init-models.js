var DataTypes = require("sequelize").DataTypes;
var _comments = require("./comments");
var _post = require("./posts");
var _users = require("./users");


function initModels(sequelize) {
  var comments = _comments(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);



  return {
    comments,
    post,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

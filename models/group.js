const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Group= sequelize.define("group", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  groupname: {
    type: Sequelize.STRING(128),
    allowNull: false,
  },
  userId:{
    type:Sequelize.INTEGER,
    allowNull:false
  }
});

module.exports=Group
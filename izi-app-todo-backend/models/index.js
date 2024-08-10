const Sequelize = require('sequelize');
const config = require('../config/config.js')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Task = require('./task')(sequelize, Sequelize);

db.User.hasMany(db.Task, { as: 'tasks' });
db.Task.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

module.exports = db;
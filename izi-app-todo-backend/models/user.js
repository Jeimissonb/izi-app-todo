module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  }, {
    tableName: 'User'
  });

  User.associate = function(models) {
    User.hasMany(models.Task, { foreignKey: 'userId', as: 'tasks' });
  };

  return User;
};
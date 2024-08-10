module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    isCompleted: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Task.associate = function(models) {
    Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Task;
};
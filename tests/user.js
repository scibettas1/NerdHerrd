module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
        displayname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1],
            }
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1],
              isEmail: true, 
            }
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          }
    });
  
    user.associate = function(models) {
      user.hasMany(models.card, {
        onDelete: "cascade"
      });
    };
  
    return user;
  };
  
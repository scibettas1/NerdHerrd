module.exports = function(sequelize, DataTypes) {
    var card = sequelize.define("card", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            validate: {
              len: [1]
            }
          },
        attributes: {
          type: DataTypes.TEXT,
            get: function () {
                return JSON.parse(this.getDataValue('attributes'));
            },
            set: function (value) {
                this.setDataValue('attributes', JSON.stringify(value));
            },
            allowNull: false,
            validate: {
              len: [1]
            }
          }

    });

  // connect playlist to a user
    card.associate = function(models) {
        card.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    // card.associate = function(models) {
    //   card.belongsToMany(models.trade, {});
    // };  

    return card;
  };
  
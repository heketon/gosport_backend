'use strict';
module.exports = (sequelize, DataTypes) => {
  var Venue = sequelize.define('Venue', {
    venue_name: DataTypes.STRING,
    address: DataTypes.STRING,
    coordinates: DataTypes.STRING,
    plus_codes: DataTypes.STRING,
    phone: DataTypes.STRING,
    time_open: DataTypes.TIME,
    time_close: DataTypes.TIME,
    remarks: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Venue.associate = function (models) {
    Venue.belongsTo(models.User);
  };
  return Venue;
};
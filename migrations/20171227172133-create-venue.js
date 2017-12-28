'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Venues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      venue_name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      coordinates: {
        type: Sequelize.STRING
      },
      plus_codes: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      time_open: {
        type: Sequelize.TIME
      },
      time_close: {
        type: Sequelize.TIME
      },
      remarks: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Venues');
  }
};
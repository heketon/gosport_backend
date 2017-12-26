'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Users', [
      {
        email: 'test1@gosport.com',
        password: 'spo123',
        fullname: 'Mas Test 1',
        phone: '081234',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'test2@gosport.com',
        password: 'spo123',
        fullname: 'Mas Test 2',
        phone: '081234',
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        email: 'test3@gosport.com',
        password: 'spo123',
        fullname: 'Mas Test 3',
        phone: '081234',
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ], {})

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

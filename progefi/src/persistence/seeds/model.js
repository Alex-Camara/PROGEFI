
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('model').del()
    .then(function () {
      // Inserts seed entries
      return knex('model').insert([
        {id: 1, name: 'iPhone 3', deviceId: 5},
        {id: 2, name: 'iPhone 5', deviceId: 5},
        {id: 3, name: 'iPhone 6', deviceId: 5},
        {id: 4, name: 'Gt5', deviceId: 4},
        {id: 5, name: 'Galaxy S10', deviceId: 1},
        {id: 6, name: 'Galaxy J8', deviceId: 1},
        {id: 7, name: 'Galaxy A8', deviceId: 1 },
        {id: 8, name: 'Brownie II', deviceId: 2 },
        {id: 9, name: 'Cross', deviceId: 2},
        {id: 10, name: 'Ektra 1', deviceId: 2},
        {id: 11, name: 'Ektra 2', deviceId: 2 }
      ]);
      
    });
};

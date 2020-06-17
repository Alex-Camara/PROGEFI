
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Device').del()
    .then(function () {
      // Inserts seed entries
      return knex('Device').insert([
        {id: 1, name: 'Samsung'},
        {id: 2, name: 'Kodak'},
        {id: 3, name: 'Nikon'},
        {id: 4, name: 'Motorola'},
        {id: 5, name: 'Apple'}
      ]);
    });
};

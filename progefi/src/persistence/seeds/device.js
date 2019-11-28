
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('device').del()
    .then(function () {
      // Inserts seed entries
      return knex('device').insert([
        {id: 1, name: 'Samsung'},
        {id: 2, name: 'Kodak'},
        {id: 3, name: 'Nikon'},
        {id: 4, name: 'Motorola'},
        {id: 5, name: 'Apple'}
      ]);
    });
};

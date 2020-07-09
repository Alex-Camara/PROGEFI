
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Sex').del()
    .then(function () {
      // Inserts seed entries
      return knex('Sex').insert([
        {id: 1, name: 'Hembra', symbol: "♀",iconPath: 'female.png'},
        {id: 2, name: 'Macho', symbol: "♂", iconPath: 'male.png'},
        {id: 3, name: 'Indeterminado', symbol: null, iconPath: 'indeterminate.png'}
      ]);
    });
};


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sex').del()
    .then(function () {
      // Inserts seed entries
      return knex('sex').insert([
        {id: 1, name: 'Hembra', iconPath: 'sex_icons/female.png'},
        {id: 2, name: 'Macho', iconPath: 'sex_icons/male.png'},
        {id: 3, name: 'Indeterminado', iconPath: 'sex_icons/question.png'}
      ]);
    });
};

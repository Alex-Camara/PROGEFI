
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('lifeStage').del()
    .then(function () {
      // Inserts seed entries
      return knex('lifeStage').insert([
        {id: 1, name: 'Cría'},
        {id: 2, name: 'Juvenil'},
        {id: 3, name: 'Subadulto'},
        {id: 4, name: 'Adulto'}
      ]);
    });
};

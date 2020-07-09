
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('LifeStage').del()
    .then(function () {
      // Inserts seed entries
      return knex('LifeStage').insert([
        {id: 1, name: 'Cría'},
        {id: 2, name: 'Juvenil'},
        {id: 3, name: 'Subadulto'},
        {id: 4, name: 'Adulto'},
        {id: 5, name: 'Indeterminado'}
      ]);
    });
};

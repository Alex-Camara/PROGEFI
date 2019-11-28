
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('collection').del()
    .then(function () {
      // Inserts seed entries
      return knex('collection').insert([
        {id: 1, name: "Colección Fotográfica de Vertebrados Terrestres 'Alvar González Cristen'", instituteId: 1},
        {id: 2, name: "Colección de fotografías de flora de Xalapa ", instituteId: 1}
      ]);
    });
};

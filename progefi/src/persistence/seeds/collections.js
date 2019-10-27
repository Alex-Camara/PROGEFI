exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('collections').del()
    .then(function () {
      // Inserts seed entries
      return knex('collections').insert([{
          id: 1,
          name: 'Colección de prueba',
          institute_id: 1
        },
        {
          id: 2,
          name: 'Alvar Cristhen',
          institute_id: 1
        }
      ]);
    });
};
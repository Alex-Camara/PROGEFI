exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Project').del()
    .then(function () {
      // Inserts seed entries
      return knex('Project').insert([{
        id: 1,
        name: 'Captura de aves en Belice',
        sponsor: 'INECOL',
        description: 'Captura de anfíbios en la zona colindante entre Belice y Yucatan para obtener especies endemicas representativas de la zona.'
      }]);
    });
};
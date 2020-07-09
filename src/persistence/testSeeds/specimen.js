
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Specimen').del()
    .then(function () {
      // Inserts seed entries
      return knex('Specimen').insert([
        { id: 1, lifeStageId: 1, sexId: 1, speciesId: 1 },
      ]);
    });
};

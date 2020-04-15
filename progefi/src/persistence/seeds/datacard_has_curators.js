exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Datacard_has_curators').del()
};

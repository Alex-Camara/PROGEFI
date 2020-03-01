exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('datacard_has_curators').del()
};

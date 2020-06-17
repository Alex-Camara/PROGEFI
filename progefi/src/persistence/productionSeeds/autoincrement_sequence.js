exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sqlite_sequence').del()
};

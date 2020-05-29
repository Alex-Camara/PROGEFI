exports.up = function(knex) {
  return knex.schema.createTable("User", table => {
    table.increments("id").primary();
    table.string("name");
    table.string("lastName");
    table.string("hash");
    table.string("keepSession");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("User");
};

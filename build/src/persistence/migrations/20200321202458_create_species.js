exports.up = function(knex) {
  return knex.schema.createTable("Species", table => {
    table.increments("id").primary();
    table.string("scientificName");
    table.string("commonName");
    table.string("genus");
    table.string("order");
    table.string("family");
    table.string("phylum");
    table.string("kingdom");
    table.string("speciesClass");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Species");
};

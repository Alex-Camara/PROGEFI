exports.up = function(knex) {
  return knex.schema.createTable("Datacard", table => {
    table.increments("id").primary();
    table.string("code");
    table.boolean("validated");
    table.string("datacardPath");
    table.string("collectorCode");
    table.date("creationDate");
    table.inc;

    table
      .integer("catalogueId")
      .references("id")
      .inTable("Catalogue")
      .onDelete("cascade");
    table
      .integer("templateId")
      .references("id")
      .inTable("Template")
      .onDelete("cascade");
    table
      .integer("collectId")
      .references("id")
      .inTable("Collect")
      .onDelete("cascade");
    table
      .integer("userId")
      .references("id")
      .inTable("User")
      .onDelete("cascade");
    table
      .integer("curatorId")
      .references("id")
      .inTable("Curator")
      .onDelete("cascade");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Datacard");
};

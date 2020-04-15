exports.up = function(knex) {
  return knex.schema
    .createTable("Collect", table => {
      table.increments("id").primary();
      table.date("collectDate");
      table.decimal("longitude");
      table.decimal("latitude");
      table.decimal("altitude");
      table.string("country");
      table.string("countryState");
      table.string("municipality");
      table.string("locality");
      table.string("customClimateTypeCode");
      table.string("customVegetationTypeName");
      table
        .integer("modelId")
        .references("id")
        .inTable("Model")
        .onDelete("cascade");
      table
        .integer("projectId")
        .references("id")
        .inTable("Project")
        .onDelete("cascade");
      table
        .integer("collectorId")
        .references("id")
        .inTable("Collector")
        .onDelete("cascade");
      table
        .integer("climateTypeId")
        .references("code")
        .inTable("ClimateType")
        .onDelete("cascade");
      table
        .integer("vegetationTypeId")
        .references("id")
        .inTable("VegetationType")
        .onDelete("cascade");
      table
        .integer("specimenId")
        .references("id")
        .inTable("Specimen")
        .onDelete("cascade");
    })
    .createTable("Specimen", table => {
      table.increments("id").primary();
      table.string("observations");
      table.string("customSexName");
      table.string("customLifeStageName");
      table
        .integer("lifeStageId")
        .references("id")
        .inTable("LifeStage")
        .onDelete("cascade");
      table
        .integer("sexId")
        .references("id")
        .inTable("Sex")
        .onDelete("cascade");
      table
        .integer("speciesId")
        .references("id")
        .inTable("Species")
        .onDelete("cascade");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Collect").dropTableIfExists("Specimen");
};

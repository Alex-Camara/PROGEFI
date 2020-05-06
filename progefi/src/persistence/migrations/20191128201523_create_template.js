exports.up = function(knex) {
  return knex.schema
    .createTable("Template", table => {
      table.increments("id").primary();
      table.string("name");
      table.string("height");
      table.string("width");
        table.string("marginX");
        table.string("marginY");
        table.string("fontFamily");
        table.string("fontSize");
      table.string("backgroundColor");
      table.string("fontColor");
      table.string("samplePath");
      table.boolean("active")
    })
    .createTable("Tag", table => {
      table.increments("id").primary();
      table.string("tagName");
      table.string("tagBefore");
      table.string("tagAfter");
      table.string("model");
      table.string("modelAttribute");
      table.string("fontSize");
        table.string("fontWeight");
        table.string("fontStyle");
      table.string("fontColor");
        table.string("textAlignment");
        table.string("backgroundColor");
        table.string("exampleValue");
        table.boolean("draggable");
        table.boolean("resizable");
        table.boolean("isStatic");
      table.integer("x");
      table.integer("y");
      table.integer("w");
      table.integer("h");
      table.string("i");
      table.string("style");
      table
        .integer("templateId")
        .references("id")
        .inTable("Template")
        .onDelete("cascade");
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("Template")
    .dropTableIfExists("Tag")
    .dropTableIfExists("Layout");
};

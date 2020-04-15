exports.up = function (knex) {
  return knex.schema
    .createTable('Datacard', table => {
        table.increments('id').primary()
      table.string('code')
      table.boolean('validated')
      table.string('datacardPath')
      table.string('collectorCode')
      table.date('creationDate')
      table.inc

      table
        .integer('catalogueId')
        .references('id')
        .inTable('Catalogue')
        .onDelete('cascade')
      table
        .integer('templateId')
        .references('id')
        .inTable('Template')
        .onDelete('cascade')
      table
        .integer('collectId')
        .references('id')
        .inTable('Collect')
        .onDelete('cascade')

    })
    .createTable('Datacard_has_curators', table => {
      table
        .integer('datacardId')
        .references('id')
        .inTable('Datacard')
        .onDelete('cascade')
      table
        .integer('curatorId')
        .references('id')
        .inTable('Curator')
        .onDelete('cascade')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Datacard')
    .dropTableIfExists('Datacard_has_curators')
}

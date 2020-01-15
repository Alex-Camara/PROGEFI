exports.up = function (knex) {
  return knex.schema
    .createTable('template', table => {
      table.increments('id').primary()
      table.string('name')
      table.string('height')
      table.string('width')
      table.string('backgroundColor')
      table.string('fontColor')
      table.string('samplePath')
    })
    .createTable('tag', table => {
      table.increments('id').primary()
      table.string('tag')
      table.string('tagBefore')
      table.string('tagAfter')
      table.string('model')
      table.string('retrieveMethod')
      table
        .integer('templateId')
        .references('id')
        .inTable('template')
        .onDelete('cascade')
    })
    .createTable('layout', table => {
      table.increments('id').primary()
      table.integer('x')
      table.integer('y')
      table.integer('w')
      table.integer('h')
      table.string('i')
      table.string('value')
      table.json('style')
      table
        .integer('templateId')
        .references('id')
        .inTable('template')
        .onDelete('cascade')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('template')
    .dropTableIfExists('tag')
    .dropTableIfExists('layout')
}

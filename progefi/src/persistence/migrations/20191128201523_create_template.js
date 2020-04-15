exports.up = function (knex) {
  return knex.schema
    .createTable('Template', table => {
      table.increments('id').primary()
      table.string('name')
      table.string('height')
      table.string('width')
      table.string('backgroundColor')
      table.string('fontColor')
      table.string('samplePath')
    })
    .createTable('Tag', table => {
      table.increments('id').primary()
      table.string('tag')
      table.string('tagBefore')
      table.string('tagAfter')
      table.string('model')
      table.string('modelAttribute')
      table.json('style')
      table
        .integer('templateId')
        .references('id')
        .inTable('Template')
        .onDelete('cascade')
    })
    .createTable('Layout', table => {
      table.increments('id').primary()
      table.integer('x')
      table.integer('y')
      table.integer('w')
      table.integer('h')
      table.string('i')
      table.string('value')
      table
        .integer('templateId')
        .references('id')
        .inTable('Template')
        .onDelete('cascade')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Template')
    .dropTableIfExists('Tag')
    .dropTableIfExists('Layout')
}

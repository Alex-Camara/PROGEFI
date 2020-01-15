exports.up = function (knex) {
  return knex.schema.createTable('climateType', table => {
    table.increments('id').primary()
    table.string('code')
    table.string('colorCode')
    table.string('description')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('climateType')
}

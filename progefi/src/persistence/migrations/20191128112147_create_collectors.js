
exports.up = function(knex) {
    return knex.schema
    .createTable('collector', table => {
        table.increments('id').primary();
        table.string('name');
    })
    .createTable('curator', table => {
        table.increments('id').primary();
        table.string('name');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('collector')
    .dropTableIfExists('curator');
};

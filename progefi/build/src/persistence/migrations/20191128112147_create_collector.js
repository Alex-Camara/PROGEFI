
exports.up = function(knex) {
    return knex.schema
    .createTable('Collector', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('code');
    })
    .createTable('Curator', table => {
        table.increments('id').primary();
        table.string('name');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('Collector')
    .dropTableIfExists('Curator');
};

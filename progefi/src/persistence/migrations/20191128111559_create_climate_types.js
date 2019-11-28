
exports.up = function(knex) {
    return knex.schema
    .createTable('climateType', table => {
        table.string('code').primary();
        table.string('colorCode');
        table.string('description');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('climateType');
};

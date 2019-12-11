
exports.up = function(knex) {
    return knex.schema
    .createTable('sex', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('iconPath');
    })
    .createTable('lifeStage', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('iconPath');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('sex')
    .dropTableIfExists('lifeStage');
};

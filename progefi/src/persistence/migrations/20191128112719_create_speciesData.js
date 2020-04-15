
exports.up = function (knex) {
    return knex.schema
        .createTable('Sex', table => {
            table.increments('id').primary();
            table.string('name');
            table.string('iconPath');
        })
        .createTable('LifeStage', table => {
            table.increments('id').primary();
            table.string('name');
            table.string('iconPath');
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('Sex')
        .dropTableIfExists('LifeStage');
};

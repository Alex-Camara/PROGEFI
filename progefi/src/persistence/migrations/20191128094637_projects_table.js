exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('project', table => {
            table.increments('id').primary();
            table.string('name');
            table.string('sponsor');
            table.string('description');
        })
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTableIfExists('project');
};
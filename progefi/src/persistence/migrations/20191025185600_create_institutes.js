exports.up = function (knex) {
    return knex.schema
        .createTable('institutes', table => {
            table.increments('id').primary();
            table.string('name');
        })
        .table('collections', function (table) {
            table.integer('institute_id')
                .unsigned()
                .references('id')
                .inTable('institutes')
                .onDelete('SET NULL')
                .index();
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('collections')
        .dropTableIfExists('institutes');
};
exports.up = function (knex) {
    return knex.schema
        .createTable('Device', table => {
            table.increments('id').primary();
            table.string('name');
        })
        .createTable('Model', table => {
            table.increments('id').primary();
            table.string('name');
            table.integer('deviceId')
                .references('id')
                .inTable('Device')
                .onDelete('cascade');
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('Model')
        .dropTableIfExists('Device');
};
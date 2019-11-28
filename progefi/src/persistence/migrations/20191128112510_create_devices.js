exports.up = function (knex) {
    return knex.schema
        .createTable('device', table => {
            table.increments('id').primary();
            table.string('name');
        })
        .createTable('model', table => {
            table.increments('id').primary();
            table.string('name');
            table.integer('deviceId')
                .references('id')
                .inTable('device')
                .onDelete('cascade');
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('model')
        .dropTableIfExists('device');
};
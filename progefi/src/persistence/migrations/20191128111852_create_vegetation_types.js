
exports.up = function(knex) {
    return knex.schema
    .createTable('vegetalFormation', table => {
        table.integer('id').primary();
        table.string('name');
        table.string('imagePath');
    })
    .createTable('vegetationType', table => {
        table.integer('id').primary();
        table.string('name');
        table.integer('vegetalFormationId')
                .references('id')
                .inTable('vegetalFormation')
                .onDelete('cascade');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('vegetationType')
    .dropTableIfExists('vegetalFormation');
};

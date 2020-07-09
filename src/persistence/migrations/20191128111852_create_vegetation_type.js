
exports.up = function(knex) {
    return knex.schema
    .createTable('VegetalFormation', table => {
        table.integer('id').primary();
        table.string('name');
        table.string('imagePath');
    })
    .createTable('VegetationType', table => {
        table.integer('id').primary();
        table.string('name');
        table.integer('vegetalFormationId')
                .references('id')
                .inTable('VegetalFormation')
                .onDelete('cascade');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('VegetationType')
    .dropTableIfExists('VegetalFormation');
};

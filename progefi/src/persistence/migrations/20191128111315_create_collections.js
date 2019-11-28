exports.up = function (knex) {
    return knex.schema
        .createTable('institute', table => {
            table.increments('id').primary();
            table.string('name');
            table.string('acronym');
            table.string('address');
            table.string('researchArea');
            table.string('description');
            table.string('imagePath');
        })
        .createTable('collection', table => {
            table.increments('id').primary();
            table.string('name');
            table.integer('instituteId')
                .references('id')
                .inTable('institute')
                .onDelete('cascade');
        })
        .createTable('catalogue', table => {
            table.increments('id').primary();
            table.string('name');
            table.integer('collectionId')
                .references('id')
                .inTable('collection')
                .onDelete('cascade');
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('catalogue')
        .dropTableIfExists('collection')
        .dropTableIfExists('institute');
};
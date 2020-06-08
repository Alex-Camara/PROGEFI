exports.up = function (knex) {
    return knex.schema
        .createTable('Collection', table => {
            table.increments('id').primary();
            table.string('name');
            table.string('code');
            table.string('description');
            table.string('instituteName');
            table.string('instituteAcronym');
            table.string('entityName');
            table.string('entityAcronym');
            table.string('instituteLogoPath');
            table.string('cataloguesFolderPath');
        })
        .createTable('Catalogue', table => {
            table.increments('id').primary();
            table.string('name');
            table.string('code');
            table.string('description');
            table.integer('collectionId')
                .references('id')
                .inTable('Collection')
                .onDelete('cascade');
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('Catalogue')
        .dropTableIfExists('Collection')
};
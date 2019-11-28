
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('catalogue').del()
    .then(function () {
      // Inserts seed entries
      return knex('catalogue').insert([
        {name: 'Reptiles', collectionId: 1},
        {name: 'Mamíferos', collectionId: 1},
        {name: 'Anfibios', collectionId: 1},
        {name: 'Aves', collectionId: 1}
      ]);
    });
};

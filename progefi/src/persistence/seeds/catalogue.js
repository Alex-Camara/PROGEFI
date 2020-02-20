
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('catalogue').del()
    .then(function () {
      // Inserts seed entries
      return knex('catalogue').insert([
        {code: 'IIBUV-REP', name: 'Reptiles', collectionId: 1},
        {code: 'IIBUV-MAM', name: 'Mamíferos', collectionId: 1},
        {code: 'IIBUV-ANF', name: 'Anfibios', collectionId: 1},
        {code: 'IIBUV-AVE', name: 'Aves', collectionId: 1},
        {code: 'INECOL-AVE', name: 'Aves', collectionId: 2},
        {code: 'INECOL-MAM', name: 'Mamíferos', collectionId: 2}
      ]);
    });
};

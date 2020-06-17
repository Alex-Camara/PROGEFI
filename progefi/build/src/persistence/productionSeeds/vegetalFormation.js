
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('VegetalFormation').del()
    .then(function () {
      // Inserts seed entries
      return knex('VegetalFormation').insert([
        {id: 0, name: 'Indeterminado', imagePath: 'indeterminate.png'},
        {id: 1, name: 'Bosque mesófilo de montaña', imagePath: 'trees.png'},
        {id: 2, name: 'Bosque templado', imagePath: 'trees.png'},
        {id: 3, name: 'Selva húmeda', imagePath: 'palm-tree.png'},
        {id: 4, name: 'Selva subhúmeda', imagePath: 'palm-tree.png'},
        {id: 5, name: 'Manglar', imagePath: 'mangrove.png'},
        {id: 6, name: 'Matorral xerófilo', imagePath: 'bush.png'},
        {id: 7, name: 'Otra vegetación hidrófila', imagePath: 'reed-bed.png'},
        {id: 8, name: 'Pastizal natural', imagePath: 'grass.png'},
        {id: 9, name: 'Vegetación halófila y gipsófila', imagePath: 'cactus.png'},
        {id: 10, name: 'Otros tipos de vegetación', imagePath: 'grass-2.png'},
        {id: 11, name: 'Pastizal inducido o cultivado', imagePath: 'grass-3.png'},
        {id: 12, name: 'Plantación forestal', imagePath: 'trees.png'}
      ]);
    });
};


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('vegetalFormation').del()
    .then(function () {
      // Inserts seed entries
      return knex('vegetalFormation').insert([
        {id: 1, name: 'Bosque mesófilo de montaña', imagePath: 'vegetalFormation_icons/trees.png'},
        {id: 2, name: 'Bosque templado', imagePath: 'vegetalFormation_icons/trees.png'},
        {id: 3, name: 'Selva húmeda', imagePath: 'vegetalFormation_icons/palm-tree.png'},
        {id: 4, name: 'Selva subhúmeda', imagePath: 'vegetalFormation_icons/palm-tree.png'},
        {id: 5, name: 'Manglar', imagePath: 'vegetalFormation_icons/mangrove.png'},
        {id: 6, name: 'Matorral xerófilo', imagePath: 'vegetalFormation_icons/bush.png'},
        {id: 7, name: 'Otra vegetación hidrófila', imagePath: 'vegetalFormation_icons/reed-bed.png'},
        {id: 8, name: 'Pastizal natural', imagePath: 'vegetalFormation_icons/grass.png'},
        {id: 9, name: 'Vegetación halófila y gipsófila', imagePath: 'vegetalFormation_icons/cactus.png'},
        {id: 10, name: 'Otros tipos de vegetación', imagePath: 'vegetalFormation_icons/grass-2.png'},
        {id: 11, name: 'Pastizal inducido o cultivado', imagePath: 'vegetalFormation_icons/grass-3.png'},
        {id: 12, name: 'Plantación forestal', imagePath: 'vegetalFormation_icons/trees.png'}
      ]);
    });
};

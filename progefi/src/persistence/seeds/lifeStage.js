
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('lifeStage').del()
    .then(function () {
      // Inserts seed entries
      return knex('lifeStage').insert([
        {id: 1, name: 'Cría', iconPath: 'life_stage_icons/brood.png'},
        {id: 2, name: 'Juvenil', iconPath: 'life_stage_icons/young.png'},
        {id: 3, name: 'Subadulto', iconPath: 'life_stage_icons/subadult.png'},
        {id: 4, name: 'Adulto', iconPath: 'life_stage_icons/adult.png'}
      ]);
    });
};


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('LifeStage').del()
    .then(function () {
      // Inserts seed entries
      return knex('LifeStage').insert([
        {id: 1, name: 'Cría', iconPath: 'life_stage_icons/brood.png'},
        {id: 2, name: 'Juvenil', iconPath: 'life_stage_icons/young.png'},
        {id: 3, name: 'Subadulto', iconPath: 'life_stage_icons/subadult.png'},
        {id: 4, name: 'Adulto', iconPath: 'life_stage_icons/adult.png'},
        {id: 5, name: 'Indeterminado', iconPath: 'general_icons/question.png'}
      ]);
    });
};

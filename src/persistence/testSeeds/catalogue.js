exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Catalogue').del()
    .then(function () {
      // Inserts seed entries
      return knex('Catalogue').insert([
        {code: 'REP', name: 'Reptiles', description: 'Catálogo que contiene una clase de animales vertebrados amniotas provistos de escamas epidérmicas de queratina. Fueron muy abundantes en el Mesozoico, época en la que surgieron los dinosaurios, pterosaurios, ictiosaurios, plesiosaurios y mosasaurios.', collectionId: 1},
        {code: 'MAM', name: 'Mamíferos', description: 'Catálogo que contiene a clase de vertebrados amniotas homeotermos (de «sangre caliente») que poseen glándulas mamarias productoras de leche con las que alimentan a las crías.', collectionId: 1},
        {code: 'ANF', name: 'Anfibios', description: 'Del latín amphibĭus, el término anfibio permite nombrar al animal que puede vivir tanto en tierra como sumergido en el agua. Los sapos y las ranas, por ejemplo, son animales anfibios ya que, de jóvenes, tienen branquias y viven en el agua; sin embargo, de adultos, desarrollan pulmones y pasan a vivir en la tierra.',collectionId: 1},
        {code: 'AVE', name: 'Aves', description: 'Las aves son animales vertebrados, de sangre caliente, que andan o se mantienen sólo sobre las extremidades posteriores, mientras que las extremidades anteriores están modificadas como alas que, al igual que muchas otras características anatómicas únicas, son adaptaciones para volar, aunque no todas vuelan', collectionId: 1}      ]);
    });
};

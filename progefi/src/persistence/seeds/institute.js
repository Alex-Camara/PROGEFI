exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('institute').del()
    .then(function () {
      // Inserts seed entries
      return knex('institute').insert([{
        id: 1,
        name: 'Universidad Veracruzana',
        acronym: 'UV',
        address: 'Lomas del Estadio S/N, Col. Zona Universitaria C.P. 91000,Xalapa, Veracruz, México',
        researchArea: 'Instituto de Investigaciones Biológicas UV',
        imagePath: 'institute_logos/logo.png'
      }]);
    });
};
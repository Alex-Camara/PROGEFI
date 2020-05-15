
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Collection').del()
    .then(function () {
      // Inserts seed entries
      // return knex('Collection').insert([
      //   {
      //     id: 1,
      //     name: "Colección Fotográfica de Vertebrados Terrestres 'Alvar González Cristen'",
      //     code: "IIBUV-",
      //     instituteName: 'Universidad Veracruzana',
      //     instituteAcronym: 'UV',
      //     researchAreaAcronym: 'IIB-UV',
      //     researchArea: 'Instituto de Investigaciones Biológicas UV',
      //     instituteLogoPath: 'C:\\Users\\arcam\\Documents\\Github\\PROGEFI\\progefi\\src\\persistence\\resources\\institute_logos\\logo.png'
      //   }
      // ]);
    });
};

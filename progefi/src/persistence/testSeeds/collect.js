
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Collect').del()
    // .then(function () {
    //   // Inserts seed entries
    //   return knex('Collect').insert([
    //     {
    //       id: 1, longitude: 91, latitude: 101, altitude: 2000, country: 'México',
    //       countryState: 'Veracruz', municipality: "Xalapa", Locality: "Xalapa",
    //       modelId: 1, projectId: 1, collectorId: 1, climateTypeId: 1, vegetationTypeId: 1,
    //       specimenId: 1
    //     }
    //   ]);
    // });
};

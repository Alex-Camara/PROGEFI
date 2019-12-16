
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tag').del()
    .then(function () {
      // Inserts seed entries
      return knex('tag').insert([
        { tag: "altitude", tagValue: "altitude", tagBefore: null, tagAfter: 'msnm', valueName: 'value', templateId: 1},
                { tag: "device", tagValue: "device", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 1 },
                { tag: "longitude", tagValue: "longitude", tagBefore: null, tagAfter: null, valueName: 'value', templateId: 1 },
                { tag: "latitude", tagValue: "latitude", tagBefore: null, tagAfter: null, valueName: 'value', templateId: 1 },
                { tag: "vegetationType", tagValue: "vegetationType", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 1 },
                { tag: "climateType", tagValue: "climateType", tagBefore: null, tagAfter: null, valueName: 'code', templateId: 1 },
                { tag: "collection", tagValue: "collection", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 1 },
                { tag: "institute", tagValue: "institute", tagBefore: null, tagAfter: null, valueName: 'researchArea', templateId: 1 },
                { tag: "catalogue", tagValue: "catalogue", tagBefore: 'Catálogo:', tagAfter: null, valueName: 'name', templateId: 1 },
                { tag: "collector", tagValue: "collector", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 1 },
                { tag: "model", tagValue: "model", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 1 },
                { tag: "collectDate", tagValue: "collectDate", tagBefore: null, tagAfter: null, valueName: 'formattedDate' , templateId: 1},
                { tag: "collectHour", tagValue: "collectDate", tagBefore: null, tagAfter: null, valueName: 'formattedHour', templateId: 1 },
                { tag: "scientificName", tagValue: "scientificName", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 1 },
                { tag: "sex", tagValue: "sex", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 1 },
                { tag: "lifeStage", tagValue: "lifeStage", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 1 },
                { tag: "country", tagValue: "country", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 1 },
                { tag: "countryState", tagValue: "countryState", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 1 },
                { tag: "municipality", tagValue: "municipality", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 1 },
                { tag: "locality", tagValue: "locality", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 1 },
                { tag: "curator", tagValue: "selectedCuratorsName", tagBefore: 'Curador:', tagAfter: null, valueName: null, templateId: 1 },
                { tag: "altitude", tagValue: "altitude", tagBefore: null, tagAfter: 'msnm', valueName: 'value', templateId: 2},
                { tag: "device", tagValue: "device", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 2 },
                { tag: "longitude", tagValue: "longitude", tagBefore: null, tagAfter: null, valueName: 'value', templateId: 2 },
                { tag: "latitude", tagValue: "latitude", tagBefore: null, tagAfter: null, valueName: 'value', templateId: 2 },
                { tag: "vegetationType", tagValue: "vegetationType", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 2 },
                { tag: "climateType", tagValue: "climateType", tagBefore: null, tagAfter: null, valueName: 'code', templateId: 2 },
                { tag: "collection", tagValue: "collection", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 2 },
                { tag: "institute", tagValue: "institute", tagBefore: null, tagAfter: null, valueName: 'researchArea', templateId: 2 },
                { tag: "catalogue", tagValue: "catalogue", tagBefore: 'Catálogo:', tagAfter: null, valueName: 'name', templateId: 2 },
                { tag: "collector", tagValue: "collector", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 2 },
                { tag: "model", tagValue: "model", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 2 },
                { tag: "collectDate", tagValue: "collectDate", tagBefore: null, tagAfter: null, valueName: 'formattedDate' , templateId: 2},
                { tag: "collectHour", tagValue: "collectDate", tagBefore: null, tagAfter: null, valueName: 'formattedHour', templateId: 2 },
                { tag: "scientificName", tagValue: "scientificName", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 2 },
                { tag: "sex", tagValue: "sex", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 2 },
                { tag: "lifeStage", tagValue: "lifeStage", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 2 },
                { tag: "country", tagValue: "country", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 2 },
                { tag: "countryState", tagValue: "countryState", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 2 },
                { tag: "municipality", tagValue: "municipality", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 2 },
                { tag: "locality", tagValue: "locality", tagBefore: null, tagAfter: null, valueName: 'name', templateId: 2 },
                { tag: "curator", tagValue: "selectedCuratorsName", tagBefore: 'Curador:', tagAfter: null, valueName: null, templateId: 2 }
      ]);
    });
};

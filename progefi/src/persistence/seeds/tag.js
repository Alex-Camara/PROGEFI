
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tag').del()
    .then(function () {
      // Inserts seed entries
      return knex('tag').insert([
        { tag: "altitude", tagBefore: null, tagAfter: 'msnm', model: 'datacard', retrieveMethod: 'getAltitude', templateId: 1},
                { tag: "device", tagBefore: null, tagAfter: null, model: 'device', retrieveMethod: 'getName', templateId: 1 },
                { tag: "longitude", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getLongitude', templateId: 1 },
                { tag: "latitude", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getLatitude', templateId: 1 },
                { tag: "vegetationType", tagBefore: null, tagAfter: null, model: 'vegetationType', retrieveMethod: 'getName', templateId: 1 },
                { tag: "climateType", tagBefore: null, tagAfter: null, model: 'climateType', retrieveMethod: 'getCode', templateId: 1 },
                { tag: "collection", tagBefore: null, tagAfter: null, model: 'collection', retrieveMethod: 'getName', templateId: 1 },
                { tag: "institute", tagBefore: null, tagAfter: null, model: 'collection', retrieveMethod: 'getResearchArea', templateId: 1 },
                { tag: "catalogue", tagBefore: 'Catálogo:', tagAfter: null, model: 'catalogue', retrieveMethod: 'getName', templateId: 1 },
                { tag: "collector", tagBefore: null, tagAfter: null,model: 'collector', retrieveMethod: 'getName', templateId: 1 },
                { tag: "model", tagBefore: null, tagAfter: null, model: 'model', retrieveMethod: 'getName', templateId: 1 },
                { tag: "collectDate", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getFormattedDate' , templateId: 1},
                { tag: "collectHour", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getFormattedHour', templateId: 1 },
                { tag: "scientificName", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getScientificName', templateId: 1 },
                { tag: "sex", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getSexName', templateId: 1 },
                { tag: "lifeStage", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getLifeStageName', templateId: 1 },
                { tag: "country", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getCountry', templateId: 1 },
                { tag: "countryState", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getCountryState', templateId: 1 },
                { tag: "municipality", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getMunicipality', templateId: 1 },
                { tag: "locality", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getLocality', templateId: 1 },
                { tag: "curator", tagBefore: 'Curador:', tagAfter: null, model: 'curator', retrieveMethod: 'getName', templateId: 1 },
                { tag: "altitude", tagBefore: null, tagAfter: 'msnm', model: 'datacard', retrieveMethod: 'getAltitude', templateId: 2},
                { tag: "device", tagBefore: null, tagAfter: null, model: 'device', retrieveMethod: 'getName', templateId: 2 },
                { tag: "longitude", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getLongitude', templateId: 2 },
                { tag: "latitude", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getLatitude', templateId: 2 },
                { tag: "vegetationType", tagBefore: null, tagAfter: null, model: 'vegetationType', retrieveMethod: 'getName', templateId: 2 },
                { tag: "climateType", tagBefore: null, tagAfter: null, model: 'climateType', retrieveMethod: 'getCode', templateId: 2 },
                { tag: "collection", tagBefore: null, tagAfter: null, model: 'collection', retrieveMethod: 'getName', templateId: 2 },
                { tag: "institute", tagBefore: null, tagAfter: null, model: 'collection', retrieveMethod: 'getResearchArea', templateId: 2 },
                { tag: "catalogue", tagBefore: 'Catálogo:', tagAfter: null, model: 'catalogue', retrieveMethod: 'getName', templateId: 2 },
                { tag: "collector", tagBefore: null, tagAfter: null,model: 'collector', retrieveMethod: 'getName', templateId: 2 },
                { tag: "model", tagBefore: null, tagAfter: null, model: 'model', retrieveMethod: 'getName', templateId: 2 },
                { tag: "collectDate", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getFormattedDate' , templateId: 2},
                { tag: "collectHour", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getFormattedHour', templateId: 2 },
                { tag: "scientificName", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getScientificName', templateId: 2 },
                { tag: "sex", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getSexName', templateId: 2 },
                { tag: "lifeStage", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getLifeStageName', templateId: 2 },
                { tag: "country", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getCountry', templateId: 2 },
                { tag: "countryState", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getCountryState', templateId: 2 },
                { tag: "municipality", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getMunicipality', templateId: 2 },
                { tag: "locality", tagBefore: null, tagAfter: null, model: 'datacard', retrieveMethod: 'getLocality', templateId: 2 },
                { tag: "curator", tagBefore: 'Curador:', tagAfter: null, model: 'curator', retrieveMethod: 'getName', templateId: 2 },
      ]);
    });
};


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Tag').del()
    .then(function () {
      // Inserts seed entries
      return knex('Tag').insert([
        { tag: "altitude", tagBefore: null, tagAfter: 'msnm', model: 'collect', modelAttribute: 'altitude', style: '{ "background-color": "rgb(30, 136, 229,0.8)", "font-size": "20px" }', templateId: 1 },
        { tag: "instituteLogo", tagBefore: null, tagAfter: null, model: null, modelAttribute: null,style: '{ "background-color": "rgb(255, 183, 77,0.8)" , "font-size": "20px" }', templateId: 1 },
        { tag: "photocollect", tagBefore: null, tagAfter: null, model: null, modelAttribute: null, style: '{ "background-color": "rgb(255, 183, 77,0.8)", "font-size": "20px" }',templateId: 1 },
        { tag: "device", tagBefore: null, tagAfter: null, model: 'collect', modelAttribute: 'model.device.name', style: '{ "background-color": "rgb(230, 81, 0,0.8)", "font-size": "20px" }' , templateId: 1 },
        { tag: "longitude", tagBefore: null, tagAfter: null, model: 'collect', modelAttribute: 'longitude',style: '{ "background-color": "rgb(100, 181, 246,0.8)", "font-size": "20px" }',  templateId: 1 },
        { tag: "latitude", tagBefore: null, tagAfter: null, model: 'collect', modelAttribute: 'latitude',style: '{ "background-color": "rgb(66, 165, 245, 0.8)", "font-size": "20px" }', templateId: 1 },
        { tag: "vegetationType", tagBefore: null, tagAfter: null, model: 'collect', modelAttribute: 'vegetationType.name',style: '{ "background-color": "rgb(21, 101, 192, 0.8)", "font-size": "20px" }', templateId: 1 },
        { tag: "climateType", tagBefore: null, tagAfter: null, model: 'collect', modelAttribute: 'climateType.code',style: '{ "background-color": "rgb(21, 101, 192, 0.8)", "font-size": "20px" }', templateId: 1 },
        { tag: "collection", tagBefore: null, tagAfter: null, model: 'datacard', modelAttribute: 'catalogue.collection.name', templateId: 1, style: '{ "background-color": "rgb(0, 172, 193, 0.8)", "font-size": "24px", "text-align": "center" }' },
        { tag: "researchArea", tagBefore: null, tagAfter: null, model: 'datacard', modelAttribute: 'catalogue.collection.researchArea',style: '{ "background-color": "rgb(0, 151, 167,0.8)", "text-align": "center", "font-weight": "bold", "font-size": "20px" }', templateId: 1 },
        { tag: "catalogue", tagBefore: 'Catálogo:', tagAfter: null, model: 'datacard', modelAttribute: 'catalogue.name',style: '{ "background-color": "rgb(230, 81, 0, 0.8)", "font-size": "20px" }' , templateId: 1 },
        { tag: "collector", tagBefore: null, tagAfter: null, model: 'collect', modelAttribute: 'collector.name',style: '{ "background-color": "rgb(255, 145, 0,0.8)", "font-size": "20px" }' ,  templateId: 1 },
        { tag: "model", tagBefore: null, tagAfter: null, model: 'collect', modelAttribute: 'model.name', style: '{ "background-color": "rgb(255, 167, 38, 0.8)", "font-size": "20px" }' , templateId: 1 },
        { tag: "collectDate", tagBefore: null, tagAfter: null, model: 'collect', modelAttribute: 'formattedCollectDate',style: '{ "background-color": "rgb(251, 140, 0, 0.8)", "font-size": "20px" }', templateId: 1 },
        { tag: "collectHour", tagBefore: null, tagAfter: null, model: 'collect', modelAttribute: 'formattedCollectHour',style: '{ "background-color": "rgb(255, 167, 38,0.8)", "font-size": "20px" }', templateId: 1 },
        { tag: "scientificName", tagBefore: null, tagAfter: null, model: 'species', modelAttribute: 'scientificName',style: '{ "background-color": "rgb(104, 159, 56, 0.8)", "font-style": "italic", "font-size": "20px" }' , templateId: 1 },
        { tag: "sex", tagBefore: null, tagAfter: null, model: 'specimen', modelAttribute: 'sex.name',style: '{ "background-color": "rgb(124, 179, 66,0.8)", "font-size": "20px" }',  templateId: 1 },
        { tag: "lifeStage", tagBefore: null, tagAfter: null, model: 'specimen', modelAttribute: 'lifeStage.name',style: '{ "background-color": "rgb(156, 204, 101, 0.8)", "font-size": "20px" }', templateId: 1 },
        { tag: "country", tagBefore: null, tagAfter: null, model: 'collect', modelAttribute: 'country',style: '{ "background-color": "rgb(33, 150, 243,0.8)", "font-size": "20px" }', templateId: 1 },
        { tag: "countryState", tagBefore: null, tagAfter: null, model: 'collect', modelAttribute: 'countryState',style: '{ "background-color": "rgb(13, 71, 161, 0.8)", "font-size": "20px" }', templateId: 1 },
        { tag: "municipality", tagBefore: null, tagAfter: null, model: 'collect', modelAttribute: 'municipality',style: '{ "background-color": "rgb(41, 121, 255,0.8)", "font-size": "20px" }' , templateId: 1 },
        { tag: "locality", tagBefore: null, tagAfter: null, model: 'collect', modelAttribute: 'locality',style: '{ "background-color": "rgb(25, 118, 210, 0.8)", "font-size": "20px" }', templateId: 1 },
        { tag: "curator", tagBefore: 'Curador:', tagAfter: null, model: 'datacard', modelAttribute: 'curador.name',style: '{ "background-color": "rgb(230, 81, 0, 0.8)", "font-size": "20px" }' , templateId: 1 }
      ]);
    });
};


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Layout').del()
    .then(function () {
      // Inserts seed entries
      return knex('Layout').insert([
        { x: 25, y: 0, w: 90, h: 40, i: "collection", value: '' , templateId: 1},
                { x: 8, y: 70, w: 14, h: 176, i: "instituteLogo", value: '' , templateId: 1},
                { x: 30, y: 70, w: 60, h: 671, i: "photocollect", value: '' , templateId: 1},
                { x: 0, y: 225, w: 30, h: 32, i: "researchArea", value: '' , templateId: 1},
                // { x: 0, y: 260, w: 30, h: 20, i: "space1", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 282, w: 10, h: 26, i: "lifeStage", value: '' , templateId: 1},
                { x: 10, y: 282, w: 10, h: 26, i: "sex", value: '' , templateId: 1},
                { x: 0, y: 312, w: 26, h: 29, i: "longitude", value: '' , templateId: 1},
                { x: 0, y: 343, w: 25, h: 27, i: "latitude", value: '' , templateId: 1},
                // { x: 0, y: 373, w: 30, h: 21, i: "space2", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 394, w: 12, h: 30, i: "altitude", value: '' , templateId: 1},
                { x: 12, y: 394, w: 10, h: 30, i: "climateType", value: '' , templateId: 1},
                { x: 0, y: 425, w: 30, h: 27, i: "vegetationType", value: '' , templateId: 1},
                // { x: 0, y: 455, w: 30, h: 23, i: "space3", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 478, w: 15, h: 30, i: "locality", value: '' , templateId: 1},
                { x: 15, y: 478, w: 15, h: 31, i: "municipality", value: '', templateId: 1},
                { x: 0, y: 510, w: 15, h: 26, i: "countryState", value: '' , templateId: 1},
                { x: 15, y: 510, w: 15, h: 25, i: "country", value: '' , templateId: 1},
                // { x: 0, y: 537, w: 30, h: 26, i: "space4", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 563, w: 10, h: 29, i: "collectDate", value: '' , templateId: 1},
                { x: 10, y: 563, w: 10, h: 29, i: "collectHour", value: '' , templateId: 1},
                // { x: 0, y: 592, w: 30, h: 18, i: "space5", value: '', style: '{ "background-color": "rgb(77, 208, 225, 0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 610, w: 10, h: 31, i: "device", value: '', templateId: 1},
                { x: 10, y: 610, w: 15, h: 31, i: "model", value: '', templateId: 1},
                { x: 0, y: 641, w: 30, h: 33, i: "collector", value: '', templateId: 1},
                { x: 0, y: 675, w: 30, h: 35, i: "curator", value: '',  templateId: 1},
                { x: 70, y: 748, w: 20, h: 27, i: "catalogue", value: '',  templateId: 1},
                { x: 30, y: 748, w: 20, h: 24, i: "scientificName", value: '',  templateId: 1}
      ]);
    });
};

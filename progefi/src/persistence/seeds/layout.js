
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('layout').del()
    .then(function () {
      // Inserts seed entries
      return knex('layout').insert([
        { x: 25, y: 0, w: 90, h: 10, i: "collection", value: '', style: '{ "background-color": "rgb(0, 172, 193, 0.8)", "font-size": "20px", "text-align": "center" }' , templateId: 1},
                { x: 9, y: 10, w: 12, h: 40, i: "instituteLogo", value: '', style: '{ "background-color": "rgb(255, 183, 77,0.8)" }' , templateId: 1},
                { x: 30, y: 4, w: 60, h: 200, i: "photocollect", value: '', style: '{ "background-color": "rgb(255, 183, 77,0.8)" }' , templateId: 1},
                { x: 0, y: 50, w: 30, h: 10, i: "institute", value: '', style: '{ "background-color": "rgb(0, 151, 167,0.8)", "text-align": "center", "font-weight": "bold" }' , templateId: 1},
                { x: 0, y: 60, w: 30, h: 5, i: "space1", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)" }' , templateId: 1},
                { x: 0, y: 65, w: 10, h: 10, i: "lifeStage", value: '', style: '{ "background-color": "rgb(156, 204, 101, 0.8)" }' , templateId: 1},
                { x: 10, y: 65, w: 10, h: 10, i: "sex", value: '', style: '{ "background-color": "rgb(124, 179, 66,0.8)" }' , templateId: 1},
                { x: 0, y: 75, w: 25, h: 10, i: "longitude", value: '', style: '{ "background-color": "rgb(100, 181, 246,0.8)" }' , templateId: 1},
                { x: 0, y: 85, w: 25, h: 10, i: "latitude", value: '', style: '{ "background-color": "rgb(66, 165, 245, 0.8)" }' , templateId: 1},
                { x: 0, y: 95, w: 30, h: 5, i: "space2", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)" }' , templateId: 1},
                { x: 0, y: 100, w: 12, h: 10, i: "altitude", value: '', style: '{ "background-color": "rgb(30, 136, 229,0.8)" }' , templateId: 1},
                { x: 12, y: 100, w: 10, h: 10, i: "climateType", value: '', style: '{ "background-color": "rgb(21, 101, 192, 0.8)" }' , templateId: 1},
                { x: 0, y: 110, w: 30, h: 10, i: "vegetationType", value: '', style: '{ "background-color": "rgb(21, 101, 192, 0.8)" }' , templateId: 1},
                { x: 0, y: 120, w: 30, h: 5, i: "space3", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)" }' , templateId: 1},
                { x: 0, y: 125, w: 15, h: 10, i: "locality", value: '', style: '{ "background-color": "rgb(25, 118, 210, 0.8)" }' , templateId: 1},
                { x: 15, y: 125, w: 15, h: 10, i: "municipality", value: '', style: '{ "background-color": "rgb(41, 121, 255,0.8)" }' , templateId: 1},
                { x: 0, y: 135, w: 15, h: 10, i: "countryState", value: '', style: '{ "background-color": "rgb(13, 71, 161, 0.8)" }' , templateId: 1},
                { x: 15, y: 135, w: 15, h: 10, i: "country", value: '', style: '{ "background-color": "rgb(33, 150, 243,0.8)" }' , templateId: 1},
                { x: 0, y: 145, w: 30, h: 5, i: "space4", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)" }' , templateId: 1},
                { x: 0, y: 150, w: 10, h: 10, i: "collectDate", value: '', style: '{ "background-color": "rgb(251, 140, 0, 0.8)" }' , templateId: 1},
                { x: 10, y: 150, w: 10, h: 10, i: "collectHour", value: '', style: '{ "background-color": "rgb(255, 167, 38,0.8)" }' , templateId: 1},
                { x: 0, y: 160, w: 30, h: 5, i: "space5", value: '', style: '{ "background-color": "rgb(77, 208, 225, 0.8)" }' , templateId: 1},
                { x: 0, y: 165, w: 10, h: 10, i: "device", value: '', style: '{ "background-color": "rgb(230, 81, 0,0.8)" }' , templateId: 1},
                { x: 10, y: 165, w: 15, h: 10, i: "model", value: '', style: '{ "background-color": "rgb(255, 167, 38, 0.8)" }' , templateId: 1},
                { x: 0, y: 175, w: 30, h: 10, i: "collector", value: '', style: '{ "background-color": "rgb(255, 145, 0,0.8)" }' , templateId: 1},
                { x: 0, y: 185, w: 30, h: 10, i: "curator", value: '', style: '{ "background-color": "rgb(230, 81, 0, 0.8)" }' , templateId: 1},
                { x: 70, y: 190, w: 20, h: 10, i: "catalogue", value: '', style: '{ "background-color": "rgb(230, 81, 0, 0.8)" }' , templateId: 1},
                { x: 30, y: 190, w: 20, h: 10, i: "scientificName", value: '', style: '{ "background-color": "rgb(104, 159, 56, 0.8)", "font-style": "italic" }' , templateId: 1}
      ]);
    });
};

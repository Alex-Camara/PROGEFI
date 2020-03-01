
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('layout').del()
    .then(function () {
      // Inserts seed entries
      return knex('layout').insert([
        { x: 25, y: 0, w: 90, h: 40, i: "collection", value: '', style: '{ "background-color": "rgb(0, 172, 193, 0.8)", "font-size": "24px", "text-align": "center" }' , templateId: 1},
                { x: 8, y: 70, w: 14, h: 176, i: "instituteLogo", value: '', style: '{ "background-color": "rgb(255, 183, 77,0.8)" , "font-size": "20px" }' , templateId: 1},
                { x: 30, y: 70, w: 60, h: 671, i: "photocollect", value: '', style: '{ "background-color": "rgb(255, 183, 77,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 225, w: 30, h: 32, i: "institute", value: '', style: '{ "background-color": "rgb(0, 151, 167,0.8)", "text-align": "center", "font-weight": "bold", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 260, w: 30, h: 20, i: "space1", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 282, w: 10, h: 26, i: "lifeStage", value: '', style: '{ "background-color": "rgb(156, 204, 101, 0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 10, y: 282, w: 10, h: 26, i: "sex", value: '', style: '{ "background-color": "rgb(124, 179, 66,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 312, w: 26, h: 29, i: "longitude", value: '', style: '{ "background-color": "rgb(100, 181, 246,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 343, w: 25, h: 27, i: "latitude", value: '', style: '{ "background-color": "rgb(66, 165, 245, 0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 373, w: 30, h: 21, i: "space2", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 394, w: 12, h: 30, i: "altitude", value: '', style: '{ "background-color": "rgb(30, 136, 229,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 12, y: 394, w: 10, h: 30, i: "climateType", value: '', style: '{ "background-color": "rgb(21, 101, 192, 0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 425, w: 30, h: 27, i: "vegetationType", value: '', style: '{ "background-color": "rgb(21, 101, 192, 0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 455, w: 30, h: 23, i: "space3", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 478, w: 15, h: 30, i: "locality", value: '', style: '{ "background-color": "rgb(25, 118, 210, 0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 15, y: 478, w: 15, h: 31, i: "municipality", value: '', style: '{ "background-color": "rgb(41, 121, 255,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 510, w: 15, h: 26, i: "countryState", value: '', style: '{ "background-color": "rgb(13, 71, 161, 0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 15, y: 510, w: 15, h: 25, i: "country", value: '', style: '{ "background-color": "rgb(33, 150, 243,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 537, w: 30, h: 26, i: "space4", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 563, w: 10, h: 29, i: "collectDate", value: '', style: '{ "background-color": "rgb(251, 140, 0, 0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 10, y: 563, w: 10, h: 29, i: "collectHour", value: '', style: '{ "background-color": "rgb(255, 167, 38,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 592, w: 30, h: 18, i: "space5", value: '', style: '{ "background-color": "rgb(77, 208, 225, 0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 610, w: 10, h: 31, i: "device", value: '', style: '{ "background-color": "rgb(230, 81, 0,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 10, y: 610, w: 15, h: 31, i: "model", value: '', style: '{ "background-color": "rgb(255, 167, 38, 0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 641, w: 30, h: 33, i: "collector", value: '', style: '{ "background-color": "rgb(255, 145, 0,0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 0, y: 675, w: 30, h: 35, i: "curator", value: '', style: '{ "background-color": "rgb(230, 81, 0, 0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 70, y: 748, w: 20, h: 27, i: "catalogue", value: '', style: '{ "background-color": "rgb(230, 81, 0, 0.8)", "font-size": "20px" }' , templateId: 1},
                { x: 30, y: 748, w: 20, h: 24, i: "scientificName", value: '', style: '{ "background-color": "rgb(104, 159, 56, 0.8)", "font-style": "italic", "font-size": "20px" }' , templateId: 1},
                { x: 25, y: 0, w: 90, h: 40, i: "collection", value: '', style: '{ "background-color": "rgb(0, 172, 193, 0.8)", "font-size": "24px", "text-align": "center" }' , templateId: 2},
                { x: 8, y: 70, w: 14, h: 176, i: "instituteLogo", value: '', style: '{ "background-color": "rgb(255, 183, 77,0.8)" , "font-size": "20px" }' , templateId: 2},
                { x: 30, y: 70, w: 60, h: 671, i: "photocollect", value: '', style: '{ "background-color": "rgb(255, 183, 77,0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 225, w: 30, h: 32, i: "institute", value: '', style: '{ "background-color": "rgb(0, 151, 167,0.8)", "text-align": "center", "font-weight": "bold", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 260, w: 30, h: 20, i: "space1", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 282, w: 10, h: 26, i: "lifeStage", value: '', style: '{ "background-color": "rgb(156, 204, 101, 0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 10, y: 282, w: 10, h: 26, i: "sex", value: '', style: '{ "background-color": "rgb(124, 179, 66,0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 312, w: 26, h: 29, i: "longitude", value: '', style: '{ "background-color": "rgb(100, 181, 246,0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 343, w: 25, h: 27, i: "latitude", value: '', style: '{ "background-color": "rgb(66, 165, 245, 0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 373, w: 30, h: 21, i: "space2", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 394, w: 12, h: 30, i: "altitude", value: '', style: '{ "background-color": "rgb(30, 136, 229,0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 12, y: 394, w: 10, h: 30, i: "climateType", value: '', style: '{ "background-color": "rgb(21, 101, 192, 0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 425, w: 30, h: 27, i: "vegetationType", value: '', style: '{ "background-color": "rgb(21, 101, 192, 0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 455, w: 30, h: 23, i: "space3", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 478, w: 15, h: 30, i: "locality", value: '', style: '{ "background-color": "rgb(25, 118, 210, 0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 15, y: 478, w: 15, h: 31, i: "municipality", value: '', style: '{ "background-color": "rgb(41, 121, 255,0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 510, w: 15, h: 26, i: "countryState", value: '', style: '{ "background-color": "rgb(13, 71, 161, 0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 15, y: 510, w: 15, h: 25, i: "country", value: '', style: '{ "background-color": "rgb(33, 150, 243,0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 537, w: 30, h: 26, i: "space4", value: '', style: '{ "background-color": "rgb(77, 208, 225,0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 563, w: 10, h: 29, i: "collectDate", value: '', style: '{ "background-color": "rgb(251, 140, 0, 0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 10, y: 563, w: 10, h: 29, i: "collectHour", value: '', style: '{ "background-color": "rgb(255, 167, 38,0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 592, w: 30, h: 18, i: "space5", value: '', style: '{ "background-color": "rgb(77, 208, 225, 0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 610, w: 10, h: 31, i: "device", value: '', style: '{ "background-color": "rgb(230, 81, 0,0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 10, y: 610, w: 15, h: 31, i: "model", value: '', style: '{ "background-color": "rgb(255, 167, 38, 0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 641, w: 30, h: 33, i: "collector", value: '', style: '{ "background-color": "rgb(255, 145, 0,0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 0, y: 675, w: 30, h: 35, i: "curator", value: '', style: '{ "background-color": "rgb(230, 81, 0, 0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 70, y: 748, w: 20, h: 27, i: "catalogue", value: '', style: '{ "background-color": "rgb(230, 81, 0, 0.8)", "font-size": "20px" }' , templateId: 2},
                { x: 30, y: 748, w: 20, h: 24, i: "scientificName", value: '', style: '{ "background-color": "rgb(104, 159, 56, 0.8)", "font-style": "italic", "font-size": "20px" }' , templateId: 2}
      ]);
    });
};
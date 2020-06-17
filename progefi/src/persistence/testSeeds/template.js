exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Template')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Template').insert(
          [
            {
              "id": 1,
              "name": "Básica",
              "height": "800",
              "width": "1250",
              "marginX": "25",
              "marginY": "25",
              "fontFamily": "Arial",
              "fontSize": null,
              "backgroundColor": "#000000",
              "fontColor": "#FFFFFF",
              "samplePath": "template1587675757490.png",
                "active": true
            },
              {
                  "id": 2,
                  "name": "Básica claro",
                  "height": "800",
                  "width": "1250",
                  "marginX": "25",
                  "marginY": "25",
                  "fontFamily": "Arial",
                  "fontSize": null,
                  "backgroundColor": "#FFFFFF",
                  "fontColor": "#000000",
                  "samplePath": "template1587681806828.png",
                  "active": true
              }
          ]
      )
    })
}

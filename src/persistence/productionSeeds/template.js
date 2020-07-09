exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Template")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("Template").insert([
        {
          id: 2,
          name: "Plantilla de prueba",
          height: "800",
          width: "1250",
          marginX: "19",
          marginY: "19",
          fontFamily: "Arial",
          fontSize: null,
          backgroundColor: "#000000",
          fontColor: "#FFFFFF",
          samplePath: "template1593000992418.png",
          active: 1
        }
      ]);
    });
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Tag")
    .del()
    .then(function() {
      // Inserts seed entries
      // return knex("Tag").insert([
      //   {
      //     id: 21,
      //     tagName: "photocollect",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "",
      //     modelAttribute: "",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "#BDBDBD",
      //     exampleValue: "834.9 x 664.7",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 28,
      //     y: 46,
      //     w: 62,
      //     h: 658,
      //     i: "photocollect",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 22,
      //     tagName: "collection",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "datacard",
      //     modelAttribute: "catalogue.collection.name",
      //     fontSize: "22",
      //     fontWeight: "bold",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "center",
      //     backgroundColor: "rgba(255, 23, 68, 0.8)",
      //     exampleValue: "Colección fotográfica de vertebrados",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 0,
      //     w: 90,
      //     h: 44,
      //     i: "collection",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 23,
      //     tagName: "instituteLogo",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "",
      //     modelAttribute: "",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "#BDBDBD",
      //     exampleValue: "107.7 x 99.0",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 10,
      //     y: 46,
      //     w: 8,
      //     h: 98,
      //     i: "instituteLogo",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 24,
      //     tagName: "instituteName",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "datacard",
      //     modelAttribute: "catalogue.collection.instituteName",
      //     fontSize: "18",
      //     fontWeight: "bold",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "center",
      //     backgroundColor: "rgba(28, 233, 181, 0.8)",
      //     exampleValue: "Instituto de Investigaciones Biológicas",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 146,
      //     w: 28,
      //     h: 51,
      //     i: "instituteName",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 25,
      //     tagName: "code",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "datacard",
      //     modelAttribute: "code",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(255, 153, 0, 0.8)",
      //     exampleValue: "IIBUV-MAM 00001f",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 77,
      //     y: 732.2352941176471,
      //     w: 13,
      //     h: 30,
      //     i: "code",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 26,
      //     tagName: "catalogue",
      //     tagBefore: "Catálogo: ",
      //     tagAfter: "",
      //     model: "datacard",
      //     modelAttribute: "catalogue.name",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "right",
      //     backgroundColor: "rgba(28, 233, 181, 0.8)",
      //     exampleValue: "Mamíferos",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 57,
      //     y: 732.2352941176471,
      //     w: 19,
      //     h: 30,
      //     i: "catalogue",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 27,
      //     tagName: "scientificName",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "species",
      //     modelAttribute: "scientificName",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "italic",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(255, 153, 0, 0.8)",
      //     exampleValue: "Felis catus",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 28,
      //     y: 732.2352941176471,
      //     w: 11,
      //     h: 30,
      //     i: "scientificName",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 28,
      //     tagName: "lifeStage",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "specimen",
      //     modelAttribute: "lifeStage.name",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(255, 153, 0, 0.8)",
      //     exampleValue: "Juvenil",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 210,
      //     w: 7,
      //     h: 29,
      //     i: "lifeStage",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 29,
      //     tagName: "sexName",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "specimen",
      //     modelAttribute: "sex.name",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(28, 233, 181, 0.8)",
      //     exampleValue: "Hembra",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 8,
      //     y: 210,
      //     w: 10,
      //     h: 30,
      //     i: "sexName",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 30,
      //     tagName: "latitude",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "collect",
      //     modelAttribute: "latitude",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(233, 32, 99, 0.8)",
      //     exampleValue: "98.236",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 241,
      //     w: 27,
      //     h: 31,
      //     i: "latitude",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 31,
      //     tagName: "longitude",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "collect",
      //     modelAttribute: "longitude",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(32, 148, 243, 0.8)",
      //     exampleValue: "19.236",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 274,
      //     w: 27,
      //     h: 26,
      //     i: "longitude",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 32,
      //     tagName: "altitude",
      //     tagBefore: "",
      //     tagAfter: " msnm",
      //     model: "collect",
      //     modelAttribute: "altitude",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(233, 32, 99, 0.8)",
      //     exampleValue: "2000",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 320,
      //     w: 14,
      //     h: 28,
      //     i: "altitude",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 33,
      //     tagName: "climateType",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "collect",
      //     modelAttribute: "climateType.code",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(255, 23, 68, 0.8)",
      //     exampleValue: "A('w)",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 15,
      //     y: 320,
      //     w: 6,
      //     h: 29,
      //     i: "climateType",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 34,
      //     tagName: "vegetationType",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "collect",
      //     modelAttribute: "vegetationType.name",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(0, 176, 255, 0.8)",
      //     exampleValue: "Bosque mesófilo",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 349,
      //     w: 28,
      //     h: 30,
      //     i: "vegetationType",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 35,
      //     tagName: "locality",
      //     tagBefore: "",
      //     tagAfter: ",",
      //     model: "collect",
      //     modelAttribute: "locality",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(32, 148, 243, 0.8)",
      //     exampleValue: "Coatepec",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 399,
      //     w: 13,
      //     h: 30,
      //     i: "locality",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 36,
      //     tagName: "municipality",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "collect",
      //     modelAttribute: "municipality",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(28, 233, 181, 0.8)",
      //     exampleValue: "Xalapa",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 13,
      //     y: 399,
      //     w: 15,
      //     h: 30,
      //     i: "municipality",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 37,
      //     tagName: "countryState",
      //     tagBefore: "",
      //     tagAfter: ",",
      //     model: "collect",
      //     modelAttribute: "countryState",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(0, 229, 255, 0.8)",
      //     exampleValue: "Veracruz",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 431,
      //     w: 13,
      //     h: 26,
      //     i: "countryState",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 38,
      //     tagName: "country",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "collect",
      //     modelAttribute: "country",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(255, 153, 0, 0.8)",
      //     exampleValue: "México",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 13,
      //     y: 433,
      //     w: 15,
      //     h: 28,
      //     i: "country",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 39,
      //     tagName: "collectDate",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "collect",
      //     modelAttribute: "formattedCollectDate",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(0, 229, 255, 0.8)",
      //     exampleValue: "14/02/2019",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 476,
      //     w: 15,
      //     h: 29,
      //     i: "collectDate",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 40,
      //     tagName: "collectHour",
      //     tagBefore: "",
      //     tagAfter: " h",
      //     model: "collect",
      //     modelAttribute: "formattedCollectHour",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(255, 153, 0, 0.8)",
      //     exampleValue: "10:34",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 508,
      //     w: 12,
      //     h: 26,
      //     i: "collectHour",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 41,
      //     tagName: "device",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "collect",
      //     modelAttribute: "model.device.name",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(32, 148, 243, 0.8)",
      //     exampleValue: "motorola",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 551,
      //     w: 14,
      //     h: 28,
      //     i: "device",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 42,
      //     tagName: "collector",
      //     tagBefore: "Foto: ",
      //     tagAfter: "",
      //     model: "collect",
      //     modelAttribute: "collector.name",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(255, 153, 0, 0.8)",
      //     exampleValue: "Alan Yoset Garcia Cruz",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 583,
      //     w: 28,
      //     h: 31,
      //     i: "collector",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 43,
      //     tagName: "collectorCode",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "datacard",
      //     modelAttribute: "collectorCode",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(230, 81, 0, 0.8)",
      //     exampleValue: "CADA 00001",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 618,
      //     w: 18,
      //     h: 30,
      //     i: "collectorCode",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 44,
      //     tagName: "creator",
      //     tagBefore: "Ficha: ",
      //     tagAfter: "",
      //     model: "user",
      //     modelAttribute: "fullName",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(255, 23, 68, 0.8)",
      //     exampleValue: "María Julíeta Carmen Quiroz",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 653,
      //     w: 28,
      //     h: 55,
      //     i: "creator",
      //     style: null,
      //     templateId: 2
      //   },
      //   {
      //     id: 45,
      //     tagName: "instituteAcronym",
      //     tagBefore: "",
      //     tagAfter: "",
      //     model: "datacard",
      //     modelAttribute: "catalogue.collection.instituteAcronym",
      //     fontSize: "18",
      //     fontWeight: "normal",
      //     fontStyle: "normal",
      //     fontColor: null,
      //     textAlignment: "left",
      //     backgroundColor: "rgba(28, 233, 181, 0.8)",
      //     exampleValue: "IIBUV",
      //     draggable: 1,
      //     resizable: 1,
      //     isStatic: 0,
      //     x: 0,
      //     y: 725.2352941176471,
      //     w: 6.444444444444445,
      //     h: 37,
      //     i: "instituteAcronym",
      //     style: null,
      //     templateId: 2
      //   }
      // ]);
    });
};

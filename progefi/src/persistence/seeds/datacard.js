exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('Datacard').del()
        // .then(function () {
        //     // Inserts seed entries
        //     return knex('Datacard').insert([
        //         { code: "IIBUV-MAM 000001f", validated: false, datacardPath: "C:\\Users\\arcam\\Documents\\Github\\PROGEFI\\progefi\\src\\persistence\\resources\\datacards\\datacard_1582948055594",
        //     collectorCode: "GCV01", catalogueId: 1, templateId: 1, collectId: 1 }
        //     ]);
        // });
};

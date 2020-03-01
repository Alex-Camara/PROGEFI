
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('vegetationType').del()
    .then(function () {
      // Inserts seed entries
      return knex('vegetationType').insert([
        {id: 1, name: 'Bosque mesófilo de montaña', vegetalFormationId: 1},
        {id: 2, name: 'Bosque de ayarín', vegetalFormationId: 2},
        {id: 3, name: 'Bosque de cedro', vegetalFormationId: 2},
        {id: 4, name: 'Bosque de encino', vegetalFormationId: 2},
        {id: 5, name: 'Bosque de encino-pino', vegetalFormationId: 2},
        {id: 6, name: 'Bosque de oyamel', vegetalFormationId: 2},
        {id: 7, name: 'Bosque de pino', vegetalFormationId: 2},
        {id: 8, name: 'Bosque de pino-encino', vegetalFormationId: 2},
        {id: 9, name: 'Bosque de táscate', vegetalFormationId: 2},
        {id: 10, name: 'Matorral de coníferas', vegetalFormationId: 2},
        {id: 11, name: 'Selva alta perennifolia', vegetalFormationId: 3},
        {id: 12, name: 'Selva alta subperennifolia', vegetalFormationId:3},
        {id: 13, name: 'Selva baja perennifolia', vegetalFormationId: 3},
        {id: 14, name: 'Selva mediana subperennifolia', vegetalFormationId: 3},
        {id: 15, name: 'Selva mediana perennifolia', vegetalFormationId: 3},
        {id: 16, name: 'Matorral subtropical', vegetalFormationId: 4},
        {id: 17, name: 'Selva baja caducifolia', vegetalFormationId: 4},
        {id: 18, name: 'Selva baja subcaducifolia', vegetalFormationId: 4},
        {id: 19, name: 'Selva mediana caducifolia', vegetalFormationId: 4},
        {id: 20, name: 'Selva mediana subcaducifolia', vegetalFormationId: 4},
        {id: 21, name: 'Selva baja espinosa caducifolia', vegetalFormationId: 4},
        {id: 22, name: 'Selva baja espinosa subperennifolia', vegetalFormationId: 4},
        {id: 23, name: 'Manglar', vegetalFormationId: 5},
        {id: 24, name: 'Matorral crasicaule', vegetalFormationId: 6},
        {id: 25, name: 'Matorral desértico micrófilo', vegetalFormationId: 6},
        {id: 26, name: 'Matorral desértico rosetófilo', vegetalFormationId:6},
        {id: 27, name: 'Matorral espinoso tamaulipeco', vegetalFormationId: 6},
        {id: 28, name: 'Matorral rosetófilo costero', vegetalFormationId: 6},
        {id: 29, name: 'Matorral sarcocaule', vegetalFormationId: 6},
        {id: 30, name: 'Matorral sarcocrasicaule', vegetalFormationId: 6},
        {id: 31, name: 'Matorral sarcocrasicaule de neblina', vegetalFormationId: 6},
        {id: 32, name: 'Matorral submontano', vegetalFormationId: 6},
        {id: 33, name: 'Vegetación de desiertos arenosos', vegetalFormationId: 6},
        {id: 34, name: 'Vegetación de galería', vegetalFormationId: 7},
        {id: 35, name: 'Popal', vegetalFormationId: 7},
        {id: 36, name: 'Tular', vegetalFormationId: 7},
        {id: 37, name: 'Bosque de galería', vegetalFormationId: 7},
        {id: 38, name: 'Selva de galería', vegetalFormationId: 7},
        {id: 39, name: 'Petén', vegetalFormationId: 7},
        {id: 40, name: 'Vegetación halófila hidrófila', vegetalFormationId: 7},
        {id: 41, name: 'Pastizal', vegetalFormationId: 8},
        {id: 42, name: 'Pradera de alta montaña', vegetalFormationId: 8},
        {id: 43, name: 'Pastizal gipsófilo', vegetalFormationId: 9},
        {id: 44, name: 'Pastizal halófilo', vegetalFormationId: 9},
        {id: 45, name: 'Vegetación gipsófila', vegetalFormationId: 9},
        {id: 46, name: 'Vegetación halófila', vegetalFormationId: 9},
        {id: 47, name: 'Chaparral', vegetalFormationId: 10},
        {id: 48, name: 'Mezquital', vegetalFormationId: 10},
        {id: 49, name: 'Bosque de mezquite', vegetalFormationId: 10},
        {id: 50, name: 'Mezquital tropical', vegetalFormationId: 10},
        {id: 51, name: 'Palmar natural', vegetalFormationId: 10},
        {id: 52, name: 'Sabana', vegetalFormationId: 10},
        {id: 53, name: 'Vegetación de dunas costeras', vegetalFormationId: 10},
        {id: 54, name: 'Palmar inducido', vegetalFormationId: 10},
        {id: 55, name: 'Pastizal cultivado', vegetalFormationId: 11},
        {id: 56, name: 'Pastizal inducido', vegetalFormationId: 11},
        {id: 57, name: 'Sabanoide', vegetalFormationId: 11},
        {id: 58, name: 'Bosque cultivado', vegetalFormationId: 12},
        {id: 59, name: 'Bosque inducido', vegetalFormationId: 12}
      ]);
    });
};
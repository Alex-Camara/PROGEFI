
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Collector').del()
    .then(function () {
      // Inserts seed entries
      return knex('Collector').insert([
        {id: 1, name: 'Gerardo Contreras Vega', code: 'GCV'},
        {id: 2, name: 'Fernando Humberto Cámara Árciga', code: 'FHCA'},
        {id: 3, name: 'Esmeralda Yamileth Hernández González', code: 'EYHG'},
        {id: 4, name: 'Jesus Eduardo Hernández González', code: 'JEHG'},
        {id: 5, name: 'Mariana Cadena Romero', code: 'MCR'},
        {id: 6, name: 'Alan Yoset Garcia Cruz', code: 'AYGC'},
        {id: 7, name: 'Zaret Sahar Jahzeel', code: 'ZSJ'}
      ]);
    });
};

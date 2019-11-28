
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('collector').del()
    .then(function () {
      // Inserts seed entries
      return knex('collector').insert([
        {id: 1, name: 'Gerardo Contreras Vega'},
        {id: 2, name: 'Fernando Humberto Cámara Árciga'},
        {id: 3, name: 'Esmeralda Yamileth Hernández González'},
        {id: 4, name: 'Jesus Eduardo Hernández González'},
        {id: 5, name: 'Mariana Cadena Romero'},
        {id: 6, name: 'Alan Yoset Garcia Cruz'},
        {id: 7, name: 'Zaret Sahar Jahzeel'}
      ]);
    });
};

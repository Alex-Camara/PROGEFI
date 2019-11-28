
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('curator').del()
    .then(function () {
      // Inserts seed entries
      return knex('curator').insert([
        {id: 1, name: 'Ximena Del Campo Gómez'},
        {id: 2, name: 'Romeo Cámara Olivares'},
        {id: 3, name: 'Guillermo Missael Toral Hernández'},
        {id: 4, name: 'Julio Pérez González'},
        {id: 5, name: 'Francisco Domingo Vázquez Dominguez'},
        {id: 6, name: 'Luis David Galicia García'},
        {id: 7, name: 'Juan Carlos Pérez Arriaga'}
      ]);
    });
};


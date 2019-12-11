exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('template')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('template').insert([
        {
          id: 1,
          name: 'Básica',
          height: 800,
          width: 1250,
          backgroundColor: '#000000',
          fontColor: '#FFFFFF',
          samplePath: 'template_samples/sample1.png'
        }
      ])
    })
}

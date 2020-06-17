exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ClimateType').del()
    .then(function () {
      // Inserts seed entries
      return knex('ClimateType').insert([
        {
          code: 'Indeterminado',
          colorCode: 'indeterminate.png',
          description: 'Indeterminado'
        },
        {
          code: '(A)C(fm) ',
          colorCode: 'ECF1CF',
          description: "Semicálido húmedo del grupo C, temperatura media anual mayor de 18ºC, temperatura del mes más frío menor de 18ºC, temperatura del mes más caliente mayor de 22ºC. Precipitación del mes más seco mayor de 40 mm;lluvias entre verano e invierno y porcentaje de lluvia invernal menor al 18% del total anual."
        },
        {
          code: '(A)C(m)',
          colorCode: 'C0D34C',
          description: "Semicálido húmedo del grupo C, temperatura media anual mayor de 18ºC, temperatura del mes más frío menor de 18ºC, temperatura del mes más caliente mayor de 22ºC. Lluvias de verano, precipitación del mes más seco mayor de 40 mm; porcentaje de lluvia invernal del 5% al 10.2% del total anual."
        },
        {
          code: '(A)C(m)(f)',
          colorCode: 'A0CB7E',
          description: "Semicálido húmedo del grupo C, temperatura media anual mayor de 18ºC, temperatura del mes más frío menor de 18ºC, temperatura del mes más caliente mayor a 22ºC. Precipitación anual mayor a 500 mm y precipitación del mes más seco mayor de 40 mm; lluvias de verano y porcentaje de lluvia invernal mayor al 10.2% del total anual."
        },
        {
          code: '(A)C(w1)',
          colorCode: '8CC8A2',
          description: 'Semicálido subhúmedo del grupo C, temperatura media anual mayor de 18ºC, temperatura del mes más frío menor de 18ºC, temperatura del mes más caliente mayor de 22ºC. Precipitación del mes más seco menor de 40 mm; lluvias de verano con índice P/T entre 43.2 y 55 y porcentaje de lluvia invernal del 5% al 10.2% anual.'
        },
        {
          code: '(A)C(w2)',
          colorCode: '9FC516',
          description: "Semicálido subhúmedo del grupo C, temperatura media anual mayor de 18ºC, temperatura del mes más frío menor de 18ºC, temperatura del mes más caliente mayor de 22ºC. Precipitación del mes más seco menor de 40 mm; lluvias de verano con índice P/T mayor a 55 y porcentaje de lluvia invernal del 5% al 10.2% del total anual."
        },
        {
          code: '(A)C(wo)',
          colorCode: 'B5CD13',
          description: "Semicálido subhúmedo del grupo C, temperatura media anual mayor de 18ºC, temperatura del mes más frío menor de 18ºC, temperatura del mes más caliente mayor de 22ºC. Precipitación del mes más seco menor de 40 mm; lluvias de verano con índice P/T menor a 43.2 y porcentaje de lluvia invernal del 5% al 10.2% del total anual."
        },
        {
          code: 'A(f)',
          colorCode: '53AF31',
          description: "Cálido húmedo, temperatura media anual mayor de 22ºC y temperatura del mes más frío mayor de 18ºC. Precipitación del mes más seco mayor de 40 mm; lluvias entre verano e invierno mayores al 18% anual."
        },
        {
          code: 'Am',
          colorCode: '6EB967',
          description: "Cálido húmedo, temperatura media anual mayor de 22ºC y temperatura del mes más frío mayor de 18ºC.Precipitación del mes más seco menor de 60 mm; lluvias de verano y porcentaje de precipitación invernal del 5% al 10.2% del total anual."
        },
        {
          code: 'Am(f)',
          colorCode: '54B466',
          description: "Cálido húmedo, temperatura media anual mayor de 22ºC y temperatura del mes más frío mayor de 18ºC. Precipitación del mes más seco menor de 60 mm; lluvias de verano y porcentaje de lluvia invernal mayor al 10.2% del total anual."
        },
        {
          code: 'Aw1',
          colorCode: '81BB26',
          description: "Cálido subhúmedo, temperatura media anual mayor de 22ºC y temperatura del mes más frío mayor de 18ºC. Precipitación del mes más seco menor de 60 mm; lluvias de verano con índice P/T entre 43.2 y 55.3 y porcentaje de luvia invernal del 5% al 10.2% del total anual."
        },
        {
          code: 'Aw2',
          colorCode: '2AA957',
          description: "Cálido subhúmedo, temperatura media anual mayor de 22ºC y temperatura del mes más frío mayor de 18ºC. Precipitación del mes más seco entre 0 y 60 mm; lluvias de verano con índice P/T mayor de 55.3 y porcentaje de lluvia invernal del 5% al 10.2% del total anual."
        },
        {
          code: "Aw2(x')",
          colorCode: 'B0AF14',
          description: "Cálido subhúmedo, temperatura media anual mayor de 22ºC y temperatura del mes más frío mayor de 18ºC. Precipitación del mes más seco entre 0 y 60 mm; lluvias de verano y porcentaje de lluvia invernal mayor al 10.2% del total anual."
        },
        {
          code: 'Awo',
          colorCode: '5DA031',
          description: "Calido subhumedo, temperatura media anual mayor de 22ºC y temperatura del mes mas frio mayor de 18ºC. Precipitacion del mes más seco entre 0 y 60 mm; lluvias de verano con indice P/T menor de 43.2 y porcentaje de lluvia invernal del 5% al 10.2% del total anual."
        },
        {
          code: "BS1(h')w",
          colorCode: 'FEF3CF',
          description: "Semiárido cálido, temperatura media anual mayor de 22ºC, temperatura del mes más frío mayor de 18ºC. Lluvias de verano y porcentaje de lluvia invernal del 5% al 10.2% del total anual."
        },
        {
          code: 'BS1hw',
          colorCode: 'FCDBD0',
          description: "Semiárido, semicálido, temperatura media anual mayor de 18ºC, temperatura del mes más frío menor de 18ºC, temperatura del mes más caliente mayor de 22ºC. Lluvias de verano y porcentaje de lluvia invernal del 5% al 10.2% del total anual."
        },
        {
          code: 'BS1kw',
          colorCode: 'FEEBAF',
          description: "Semiárido, templado, temperatura media anual entre 12ºC y 18ºC, temperatura del mes más frío entre -3ºC y 18ºC, temperatura del mes más caliente menor de 22ºC. Lluvias de verano y porcentaje de lluvia invernal del 5% al 10.2% del total anual."
        },
        {
          code: 'BSo(h’)w ',
          colorCode: 'FCD0A0',
          description: "Ojo Árido, cálido, temperatura media anual mayor de 22ºC, temperatura del mes más frío mayor de 18ºC. Lluvias de verano y porecentaje de lluvia invernal del 5% al 10.2% del total anual."
        },
        {
          code: 'BSohw',
          colorCode: 'F49D81',
          description: "Árido, semicálido, temperatura entre 18ºC y 22ºC, temperatura del mes más frío menor de 18ºC, temperatura del mes más caliente mayor de 22ºC. Lluvias de verano y porcentaje de lluvia invernal del 5% al 10.2% del total anual."
        },
        {
          code: 'C(f)',
          colorCode: 'F9D0E3',
          description: "Templado, húmedo, temperatura media anual entre 12ºC y 18ºC, temperatura del mes más frío entre -3ºC y 18ºC y temperatura del mes más caliente bajo 22ºC. Precipitación en el mes más seco mayor de 40 mm; lluvias todo el año y porcentaje de lluvia invernal mayor al 18% del total anual."
        },
        {
          code: 'C(m)',
          colorCode: 'EFD1E6',
          description: "Templado, húmedo, temperatura media anual entre 12ºC y 18ºC, temperatura del mes más frío entre -3ºC y 18ºC y temperatura del mes más caliente bajo 22ºC. Precipitación en el mes más seco menor de 40 mm; lluvias de verano y porcentaje de lluvia invernal del 5% al 10.2% del total anual."
        },
        {
          code: 'C(m)(f) ',
          colorCode: 'E1CEE6',
          description: "Templado, húmedo, temperatura media anual entre 12ºC y 18ºC, temperatura del mes más frío entre -3ºC y 18ºC y temperatura del mes más caliente bajo 22ºC. Precipitación en el mes más seco menor de 40 mm; lluvias de verano y porcentaje de lluvia invernal mayor al 10.2% del total anual."
        },
        {
          code: 'C(w1)',
          colorCode: 'D0CEE8',
          description: "Templado, subhúmedo, temperatura media anual entre 12ºC y 18ºC, temperatura del mes más frío entre -3ºC y 18ºC y temperatura del mes más caliente bajo 22ºC. Precipitación en el mes más seco menor de 40 mm; lluvias de verano con índice P/T entre 43.2 y 55 y porcentaje de lluvia invernal del 5% al 10.2% del total anual."
        },
        {
          code: 'C(w2)',
          colorCode: 'C1D2EE',
          description: "Templado, subhúmedo, temperatura media anual entre 12ºC y 18ºC, temperatura del mes más frío entre -3ºC y 18ºC y temperatura del mes más caliente bajo 22ºC. Precipitación en el mes más seco menor de 40 mm; lluvias de verano con índice P/T mayor de 55 y porcentaje de lluvia invernal del 5 al 10.2% del total anual."
        },
        {
          code: 'C(wo)',
          colorCode: 'AA90C3',
          description: "Templado, subhúmedo, temperatura media anual entre 12ºC y 18ºC, temperatura del mes más frío entre -3ºC y 18ºC y temperatura del mes más caliente bajo 22ºC. Precipitación en el mes más seco menor de 40 mm; lluvias de verano con índice P/T menor de 43.2 y porcentaje de precipitación invernal del 5% al 10.2% del total anual."
        },
        {
          code: "Cb’(m)",
          colorCode: 'F090BC',
          description: "Semifrío, húmedo con verano fresco largo, temperatura media anual entre 5ºC y 12ºC, temperatura del mes más frío entre -3ºC y 18ºC; temperatura del mes más caliente bajo 22ºC. Precipitación en el mes más seco menor de 40 mm; lluvias de verano y porcentaje de lluvia invernal entre 5 y 10.2% del total anual."
        },
        {
          code: "Cb'(m)(f)",
          colorCode: 'EB65A2',
          description: "Semifrío, húmedo con verano fresco largo, temperatura media anual entre 5ºC y 12ºC, temperatura del mes más frío entre -3ºC y 18ºC, temperatura del mes más caliente bajo 22°C. Precipitación en el mes más seco menor de 40 mm; lluvias de verano y porcentaje de lluvia invernal mayor al 10.2% del total anual."
        },
        {
          code: "Cb'(w2)",
          colorCode: '587FBF',
          description: "Semifrío, subhúmedo con verano fresco largo, temperatura media anual entre 5ºC y 12ºC, temperatura del mes más frío entre -3ºC y 18ºC, temperatura del mes más caliente bajo 22°C. Precipitación en el mes más seco menor de 40 mm; lluvias de verano y porcentaje de lluvia invernal del 5 al 10.2% del total anual."
        }
      ]);
    });
};
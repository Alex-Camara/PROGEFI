import ClimateType from "@/presentation/models/climateType.js";

const testClimateType1 = new ClimateType();
testClimateType1.setClimateType({
  id: 1,
  code: "A(f)",
  colorCode: "ECF1CF",
  description:
    "Semicálido húmedo del grupo C, temperatura media anual mayor de 18ºC, temperatura del mes más frío menor de 18ºC, temperatura del mes más caliente mayor de 22ºC. Precipitación del mes más seco mayor de 40 mm;lluvias entre verano e invierno y porcentaje de lluvia invernal menor al 18% del total anual."
});

const testClimateType2 = new ClimateType();
testClimateType2.setClimateType({
  id: 2,
  code: "A(f)m(w2)",
  colorCode: "81BB26",
  description:
    "Cálido subhúmedo, temperatura media anual mayor de 22ºC y temperatura del mes más frío mayor de 18ºC. Precipitación del mes más seco menor de 60 mm; lluvias de verano con índice P/T entre 43.2 y 55.3 y porcentaje de luvia invernal del 5% al 10.2% del total anual."
});

const mockGetAll = jest.fn();
mockGetAll.mockReturnValue([testClimateType1, testClimateType2]);
ClimateType.getAll = mockGetAll;

export { testClimateType1, testClimateType2, ClimateType };

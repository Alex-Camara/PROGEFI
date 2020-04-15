import Collection from "@/presentation/models/collection.js";

const testCollection1 = new Collection();
testCollection1.setCollection({
  id: 1,
  name: "Colección Alvar Cristen",
  institudeName: "Universidad Veracruzana",
  acronym: "UV",
  researchArea: "Intituto de Investigaciones Biológicas"
});

const mockGetAll = jest.fn();
mockGetAll.mockReturnValue(testCollection1);
Collection.getAll = mockGetAll;

export { testCollection1, Collection };

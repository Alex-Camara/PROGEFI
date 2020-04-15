import Catalogue from "@/presentation/models/catalogue.js";

const testCatalogue1 = new Catalogue();
testCatalogue1.setCatalogue({
  id: 1,
  datacardCount: 101,
  name: "Catalogue one",
  code: "CATA",
  collectionId: 1
});

const testCatalogue2 = new Catalogue();
testCatalogue2.setCatalogue({
  id: 2,
  datacardCount: 5,
  name: "Catalogue two",
  code: "CATB",
  collectionId: 1
});

// const mockGetDatacardCount = jest.fn();
// mockGetDatacardCount.mockReturnValue(10);
// testCatalogue1.getDatacardCount = mockGetDatacardCount;

const mockGetAll = jest.fn();
mockGetAll.mockReturnValue([testCatalogue1, testCatalogue2]);
Catalogue.getAll = mockGetAll;

export {testCatalogue1, testCatalogue2, Catalogue}
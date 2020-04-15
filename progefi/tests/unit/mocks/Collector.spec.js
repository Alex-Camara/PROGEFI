import Collector from "@/presentation/models/collector.js";

const testCollector1 = new Collector();
testCollector1.setCollector({
  id: 1,
  name: "Roberto Ruíz Esparza",
  code: "RRE"
});
const testCollector2 = new Collector();
testCollector2.setCollector({
  id: 2,
  name: "Karla Jiménez Dorado",
  code: "KJD",
  createdDatacards: 0
});

const mockGetAll = jest.fn();
mockGetAll.mockReturnValue([testCollector1, testCollector2]);
Collector.getAll = mockGetAll;

// const mockVerifyDuplicateCode = jest.fn();
// mockVerifyDuplicateCode.mockReturnValue("RRE");
// testCollector1.verifyDuplicateCode = mockVerifyDuplicateCode;
// Collector.verifyDuplicateCode = mockVerifyDuplicateCode;

// const mockGetName = jest.fn();
// mockGetName.mockReturnValue("Alejandro");
// testCollector1.getName = mockGetName;
// // testCollector2.getName = mockGetName;


export { testCollector1, testCollector2, Collector };

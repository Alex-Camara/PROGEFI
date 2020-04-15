import VegetationType from "@/presentation/models/vegetationType.js";
import VegetalFormation from "@/presentation/models/vegetalFormation.js";

const testVegetationType1 = new VegetationType();
testVegetationType1.setVegetationType({
  id: 1,
  name: "Bosque mesófilo de montaña",
  vegetalFormationId: 1
});

const testVegetationType2 = new VegetationType();
testVegetationType2.setVegetationType({
  id: 2,
  name: "Bosque de ayarín",
  vegetalFormationId: 2
});

const testVegetationType3 = new VegetationType();
testVegetationType3.setVegetationType({
  id: 3,
  name: "Bosque de cedro",
  vegetalFormationId: 2
});

const testVegetationType4 = new VegetationType();
testVegetationType4.setVegetationType({
  id: 4,
  name: "Bosque de encino",
  vegetalFormationId: 2
});

let testVegetalFormation1 = new VegetalFormation();
testVegetalFormation1.setVegetalFormation({
  id: 1,
  name: "Bosque mesófilo de montaña",
  vegetationTypes: [testVegetationType1]
});

const testVegetalFormation2 = new VegetalFormation();
testVegetalFormation2.setVegetalFormation({
  id: 2,
  name: "Bosque templado",
  vegetationTypes: [
    testVegetationType2,
    testVegetationType3,
    testVegetationType4
  ]
});

const mockGetAll = jest.fn();
mockGetAll.mockReturnValue([testVegetalFormation1, testVegetalFormation2]);
VegetalFormation.getAll = mockGetAll;

const mockGetVegetationTypes = jest.fn();
mockGetVegetationTypes.mockReturnValue([testVegetationType1]);
testVegetalFormation1.getVegetationTypes = mockGetVegetationTypes;

const mockGetName = jest.fn();
mockGetName.mockReturnValue("Bosque mesófilo de montaña");
testVegetalFormation1.getName = mockGetName;

export {
  testVegetalFormation1,
  testVegetalFormation2,
  testVegetationType1,
  testVegetationType2,
  testVegetationType3,
  testVegetationType4,
  VegetalFormation
};

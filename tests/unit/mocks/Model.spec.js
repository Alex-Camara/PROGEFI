import Model from "@/presentation/models/model.js";
import {testDevice1, testDevice2} from "./Device.spec"
const testModel1 = new Model();
const testModel2 = new Model();
const testModel3 = new Model();
const testModel4 = new Model();

async function loadModelValues() {
  await testModel1.setModel({
    id: 1,
    name: "moto g3",
    deviceId: 1,
    device: testDevice1
  });

  await testModel2.setModel({
    id: 2,
    name: "moto g4",
    deviceId: 1,
    device: testDevice1
  });

  await testModel3.setModel({
    id: 3,
    name: "iPhone 2",
    deviceId: 2
  });

  await testModel4.setModel({
    id: 4,
    name: "iPhone 3",
    deviceId: 2
  });
}
const mockGetAll = jest.fn();
mockGetAll.mockReturnValue([testModel1, testModel2]);
Model.getAll = mockGetAll;

const mockGetExisting = jest.fn();
mockGetExisting.mockReturnValue(false);
Model.getExisting = mockGetExisting;

export { loadModelValues, Model, testModel1, testModel2, testModel3, testModel4 };

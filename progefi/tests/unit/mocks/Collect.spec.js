import Collect from "@/presentation/models/collect";
import { testModel1, loadModelValues } from "../mocks/Model.spec";
import { testClimateType1 } from "../mocks/ClimateType.spec";
import { testVegetationType1 } from "../mocks/VegetalFormation.spec";
import { testCollector1 } from "../mocks/Collector.spec";
import { testProject1 } from "../mocks/Project.spec";
import { testSpecimen } from "../mocks/Specimen.spec";

let testCollect = new Collect();

async function loadCollectValues() {
  await loadModelValues();
  await testCollect.setCollect({
    id: 1,
    latitude: 31.7202396,
    longitude: -106.4608383,
    altitude: "2000",
    country: "México",
    countryState: "Chihuahua",
    municipality: "Juarez",
    locality: "Ciudad Juarez",
    model: testModel1,
    climateType: testClimateType1,
    vegetationType: testVegetationType1,
    collector: testCollector1,
    project: testProject1,
    specimen: testSpecimen
  });
  Promise.resolve(testCollect);
}
export { testCollect, loadCollectValues };

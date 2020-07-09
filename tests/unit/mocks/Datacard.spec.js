import Datacard from "@/presentation/models/datacard.js";
import Species from "@/presentation/models/species.js";
import {testCatalogue1} from "../mocks/Catalogue.spec"
import {testTemplate1} from "../mocks/Template.spec"
import {testCollect, loadCollectValues} from "../mocks/Collect.spec"
import {testCurator1, testCurator2} from "../mocks/Curator.spec"

const testDatacard1 = new Datacard();

async function loadDatacardValues() {
    await loadCollectValues();

    await testDatacard1.setDatacard({
        id: 1,
        code: "IIBUV-MAM",
        creationDate: new Date(),
        validated: false,
        catalogue: testCatalogue1,
        template: testTemplate1,
        collect: testCollect,
        curators: [testCurator1, testCurator2]
    });
}

let newSpecies = new Species();
newSpecies.setScientificName("felis catus");
testDatacard1.getCollect().getSpecimen().setSpecies(newSpecies);

const mockGetAll = jest.fn();
mockGetAll.mockReturnValue([testDatacard1]);
Datacard.getAll = mockGetAll;

const mockGetSorted = jest.fn();
mockGetSorted.mockReturnValue(Promise.resolve([testDatacard1]));
// Datacard.getSorted = mockGetSorted;

export {testDatacard1, Datacard, mockGetSorted, mockGetAll, loadDatacardValues}

import Specimen from "@/presentation/models/specimen";
import {testSpecies} from "./Species.spec.js"

let testSpecimen = new Specimen();

testSpecimen.setSpecimen({
    id: 1,
    observations: "",
    sex: "male",
    lifeStage: "juvenil",
    species: testSpecies
});
export {testSpecimen}
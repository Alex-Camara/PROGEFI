import { shallowMount, createLocalVue } from "@vue/test-utils";
import taxonomicalDataForm from "@/presentation/components/taxonomicalDataForm.vue";
import Datacard from "@/presentation/models/datacard.js";
import Buefy from "buefy";
import { Store } from "vuex-mock-store";
import axios from "axios";
import {loadDatacardValues, testDatacard1} from "./mocks/Datacard.spec";
const flushPromises = require("flush-promises");

jest.mock("axios");

const store = new Store({
  state: {
    datacard: {
      namespaced: true,
      datacard: new Datacard()
    }
  }
});

const mocks = {
  $store: store
};

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(axios);

describe("selectLocation component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(taxonomicalDataForm, {
      localVue,
      mocks
    });
  });

  it("writes not allowed character in scientific name input", async () => {
    wrapper.vm.scientificName = "Felis c";
    await wrapper.vm.$nextTick();
    wrapper.vm.scientificName = "Felis c@";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.scientificName).toStrictEqual("Felis c");
  });

  it("writes numbers in scientific name input", async () => {
    wrapper.vm.scientificName = "Felis c";
    await wrapper.vm.$nextTick();
    wrapper.vm.scientificName = "Felis c1";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.scientificName).toStrictEqual("Felis c");
  });

  it("writes minimal numbers of characters in scientific", async () => {
    wrapper.vm.scientificName = "Fel";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(
      wrapper.vm.datacard
        .getCollect()
        .getSpecimen()
        .getSpecies()
        .getScientificNameValid()
    ).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("writes maximal numbers of characters in scientific name", async () => {
    wrapper.vm.scientificName =
      "Parastratiosphecomyia stratiosphecomyioidesijijijk";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.scientificName =
      "Parastratiosphecomyia stratiosphecomyioidesijijijka";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.scientificName).toStrictEqual(
      "Parastratiosphecomyia stratiosphecomyioidesijijijk"
    );
  });
  it("calls to the catalogue of life api and loads taxonomical values", async () => {
    let getMock = jest.fn();
    getMock.mockReturnValue(
      Promise.resolve({
        data: {
          results: [
            {
              id: "f2f6a853436bfab907efa771b6ae38f1",
              name: "Felis catus",
              classification: [
                { rank: "Kingdom", name: "Animalia" },
                { rank: "Phylum", name: "Chordata" },
                { rank: "Class", name: "Mammalia" },
                { rank: "Order", name: "Carnivora" },
                { rank: "Family", name: "Felidae" },
                { rank: "Genus", name: "Felis" }
              ]
            }
          ]
        }
      })
    );

    axios.get = getMock;
    await wrapper.vm.$nextTick();
    let scientificName = "Felis catus";
    await wrapper.vm.getSpeciesByScientificName(scientificName);
    await wrapper.vm.$nextTick();
    expect(axios.get).toHaveBeenCalledWith(
      "http://webservice.catalogueoflife.org/col/webservice?format=json&response=full&rank=species&name=Felis+catus"
    );
  });

  it("loads taxonomical values when user selects a species", async () => {
    let species = {
      id: "f2f6a853436bfab907efa771b6ae38f1",
      name: "Felis catus",
      classification: [
        { rank: "Kingdom", name: "Animalia" },
        { rank: "Phylum", name: "Chordata" },
        { rank: "Class", name: "Mammalia" },
        { rank: "Order", name: "Carnivora" },
        { rank: "Family", name: "Felidae" },
        { rank: "Genus", name: "Felis" }
      ]
    };
    await wrapper.vm.setFields(species);

    expect(wrapper.vm.kingdom).toStrictEqual("Animalia");
    expect(wrapper.vm.phylum).toStrictEqual("Chordata");
    expect(wrapper.vm.speciesClass).toStrictEqual("Mammalia");
    expect(wrapper.vm.order).toStrictEqual("Carnivora");
    expect(wrapper.vm.family).toStrictEqual("Felidae");
    expect(wrapper.vm.genus).toStrictEqual("Felis");
  });

  it("sets taxonomical fields to null when recovered scientific name form API is changed", async () => {
    let species = {
      id: "f2f6a853436bfab907efa771b6ae38f1",
      name: "Felis catus",
      classification: [
        { rank: "Kingdom", name: "Animalia" },
        { rank: "Phylum", name: "Chordata" },
        { rank: "Class", name: "Mammalia" },
        { rank: "Order", name: "Carnivora" },
        { rank: "Family", name: "Felidae" },
        { rank: "Genus", name: "Felis" }
      ]
    };
    await wrapper.vm.setFields(species);

    wrapper.vm.scientificName = "Felis catu";
    await flushPromises();
    expect(wrapper.vm.kingdom).toStrictEqual("");
    expect(wrapper.vm.phylum).toStrictEqual("");
    expect(wrapper.vm.speciesClass).toStrictEqual("");
    expect(wrapper.vm.order).toStrictEqual("");
    expect(wrapper.vm.family).toStrictEqual("");
    expect(wrapper.vm.genus).toStrictEqual("");
  })

  it("sets values according to dacatacard draft", async () => {
    await loadDatacardValues();

    store.state.datacard.datacard = testDatacard1;
    wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.scientificName).toEqual(testDatacard1.collect.specimen.species.scientificName);
  });

});

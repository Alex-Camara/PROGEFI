import { shallowMount, createLocalVue } from "@vue/test-utils";
import createCollection from "@/presentation/components/createCollection.vue";
import Buefy from "buefy";
import { Collection, testCollection1 } from "./mocks/Collection.spec";
const flushPromises = require("flush-promises");

const localVue = createLocalVue();
localVue.use(Buefy);

describe("ui showCollection view", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(createCollection, {
      localVue,
      propsData: { collection: testCollection1 }
    });
  });

  it("sets correct collection's name", async () => {
    wrapper.vm.name = "Colección biologica";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.collection.getNameValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal number of characters in collection's name", async () => {
    wrapper.vm.name = "Co";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.getName()).toStrictEqual("Co");
    expect(wrapper.vm.collection.getNameValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets numbers in collection name", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.name = "Colección";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.name = "Colección 2";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.name).toStrictEqual("Colección");
  });

  it("sets not allowed characters in collection's name", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.name = "Colección";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.name = "Colección@";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.name).toStrictEqual("Colección");
  });

  it("sets correct code to collection", async () => {
    wrapper.vm.name = "IIBUV-";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.collection.getCodeValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal number of characters in code's name", async () => {
    wrapper.vm.code = "C";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.getCode()).toStrictEqual("C");
    expect(wrapper.vm.collection.getCodeValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets not allowed characters in collection's code", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.code = "IIB";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.code = "IIB@";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.code).toStrictEqual("IIB");
  });

  it("sets correct collection's institute name", async () => {
    wrapper.vm.name = "Colección biologica de animlaes vertebrados terrestres";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.collection.getInstituteNameValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal number of characters in collection's institute name", async () => {
    wrapper.vm.instituteName = "Uni";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.getInstituteName()).toStrictEqual("Uni");
    expect(wrapper.vm.collection.getInstituteNameValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets numbers in collection's institute name", async () => {
    wrapper.vm.instituteName = "Universidad";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.instituteName = "Universidad 2";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.instituteName).toStrictEqual("Universidad");
  });

  it("sets not allowed characters in collection's institute name", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.instituteName = "Universidad";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.instituteName = "Universidad@";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.instituteName).toStrictEqual("Universidad");
  });

  it("sets correct collection's institute name acronym", async () => {
    wrapper.vm.instituteAcronym = "UV";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.collection.getInstituteAcronymValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal number of characters in collection's institute name acronym", async () => {
    wrapper.vm.instituteAcronym = "U";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.getInstituteAcronym()).toStrictEqual("U");
    expect(wrapper.vm.collection.getInstituteAcronymValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets numbers in collection's institute name acronym", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.instituteAcronym = "UV";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.instituteAcronym = "UV2";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.instituteAcronym).toStrictEqual("UV");
  });

  it("sets not allowed characters in collection's institute name acronym", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.instituteAcronym = "UV";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.instituteAcronym = "UV@";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.instituteAcronym).toStrictEqual("UV");
  });

  it("sets correct collection's research area", async () => {
    wrapper.vm.researchArea = "Instituto de investigaciones biológicas";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.collection.getResearchAreaValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal number of characters in collection's research area", async () => {
    wrapper.vm.researchArea = "I";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.getResearchArea()).toStrictEqual("I");
    expect(wrapper.vm.collection.getResearchAreaValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets not allowed characters in collection's research area", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.researchArea = "Instituto";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.researchArea = "Instituto@";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.researchArea).toStrictEqual("Instituto");
  });

    it("sets correct collection's research area acronym", async () => {
        wrapper.vm.researchAreaAcronym = "IIBUV";
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.collection.getResearchAreaAcronymValid()).toStrictEqual({
            isValid: true,
            message: null
        });
    });

    it("sets minimal number of characters in collection's research area acronym", async () => {
        wrapper.vm.researchAreaAcronym = "I";
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        await flushPromises();
        expect(wrapper.vm.collection.getResearchAreaAcronym()).toStrictEqual("I");
        expect(wrapper.vm.collection.getResearchAreaAcronymValid()).toStrictEqual({
            isValid: false,
            message: "Longitud mínima inválida"
        });
    });

    it("sets not allowed characters in collection's research area acronym", async () => {
        wrapper.vm.$forceUpdate();
        wrapper.vm.researchAreaAcronym = "IIB";
        await wrapper.vm.$nextTick();
        await flushPromises();
        wrapper.vm.researchAreaAcronym = "IIB@";
        await wrapper.vm.$nextTick();
        await flushPromises();
        expect(wrapper.vm.collection.researchAreaAcronym).toStrictEqual("IIB");
    });
});
